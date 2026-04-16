#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skills = ["ingfe-plan", "ingfe-execute"];
const args = process.argv.slice(2);
const validTargets = ["codex", "claude", "gemini"];
const firstPositional = args.find((arg) => !arg.startsWith("-"));
let command = firstPositional || "install";
const legacyTarget = validTargets.includes(command) ? command : null;
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");
const home = os.homedir();

const targets = new Set(
  args
    .filter((arg) => arg.startsWith("--target="))
    .flatMap((arg) => arg.slice("--target=".length).split(","))
    .map((target) => target.trim())
    .filter(Boolean),
);

if (legacyTarget && !targets.size) {
  targets.add(legacyTarget);
  command = "install";
}

if (!targets.size) {
  targets.add("codex");
  targets.add("claude");
  targets.add("gemini");
}

if (command === "help" || args.includes("--help") || args.includes("-h")) {
  printHelp();
  process.exit(0);
}

if (command !== "install") {
  fail(`Unknown command: ${command}`);
}

const unknownTargets = [...targets].filter((target) => !validTargets.includes(target));
if (unknownTargets.length) {
  fail(`Unknown target(s): ${unknownTargets.join(", ")}`);
}

const installed = [];

for (const target of targets) {
  if (target === "codex") installCodex();
  if (target === "claude") installClaude();
  if (target === "gemini") installGemini();
}

if (dryRun) {
  console.log("Dry run complete. No files were changed.");
} else {
  console.log("INGFE skills installed.");
  console.log("Restart Codex, Claude Code, and Gemini CLI sessions so they reload commands and skills.");
}

for (const line of installed) {
  console.log(`- ${line}`);
}

function installCodex() {
  const codexSkillsDir = process.env.CODEX_SKILLS_DIR || path.join(home, ".codex", "skills");
  copySkillsTo(codexSkillsDir, "Codex skills");

  const agentsSkillsDir = process.env.AGENTS_SKILLS_DIR || path.join(home, ".agents", "skills");
  copySkillsTo(agentsSkillsDir, "Codex compatible skills");
}

function installClaude() {
  const claudeSkillsDir = process.env.CLAUDE_SKILLS_DIR || path.join(home, ".claude", "skills");
  copySkillsTo(claudeSkillsDir, "Claude Code skills");

  const claudeCommandsDir = process.env.CLAUDE_COMMANDS_DIR || path.join(home, ".claude", "commands");
  copyNamedFiles(path.join(packageRoot, "commands"), claudeCommandsDir, "Claude Code slash command");
}

function installGemini() {
  const geminiExtensionDir =
    process.env.GEMINI_EXTENSION_DIR || path.join(home, ".gemini", "extensions", "ingfe-skills");
  copyFilesToExtension(geminiExtensionDir);

  const geminiCommandsDir = process.env.GEMINI_COMMANDS_DIR || path.join(home, ".gemini", "commands", "ingfe");
  copyNamedFiles(path.join(packageRoot, "gemini-commands"), geminiCommandsDir, "Gemini CLI slash command");
}

function copySkillsTo(destination, label) {
  ensureDir(destination);

  for (const skill of skills) {
    copyDirectory(path.join(packageRoot, "skills", skill), path.join(destination, skill), `${label}: ${skill}`);
  }
}

function copyFilesToExtension(destination) {
  ensureCleanDestination(destination, "Gemini CLI extension");
  ensureDir(destination);

  copyItem(path.join(packageRoot, "gemini-extension.json"), path.join(destination, "gemini-extension.json"));
  copyItem(path.join(packageRoot, "GEMINI.md"), path.join(destination, "GEMINI.md"));
  copyItem(path.join(packageRoot, "skills"), path.join(destination, "skills"));
  writeMarker(destination);

  installed.push(`Gemini CLI extension -> ${destination}`);
}

function copyDirectory(source, destination, label) {
  ensureCleanDestination(destination, label);
  ensureDir(path.dirname(destination));
  copyItem(source, destination);
  writeMarker(destination);
  installed.push(`${label} -> ${destination}`);
}

function copyNamedFiles(sourceDir, destinationDir, label) {
  ensureDir(destinationDir);

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;

    const source = path.join(sourceDir, entry.name);
    const destination = path.join(destinationDir, entry.name);
    ensureCleanFileDestination(destination, `${label}: ${entry.name}`);
    copyItem(source, destination);
    installed.push(`${label}: ${entry.name} -> ${destination}`);
  }
}

function copyItem(source, destination) {
  if (dryRun) return;
  fs.cpSync(source, destination, { recursive: true, dereference: true });
}

function ensureDir(destination) {
  if (dryRun) return;
  fs.mkdirSync(destination, { recursive: true });
}

function ensureCleanDestination(destination, label) {
  if (!fs.existsSync(destination)) return;

  if (!force && !isManagedDestination(destination)) {
    fail(
      `${label} already exists at ${destination} and does not look like an INGFE installer-managed path. ` +
        "Re-run with --force to overwrite it.",
    );
  }

  if (!dryRun) fs.rmSync(destination, { recursive: true, force: true });
}

function ensureCleanFileDestination(destination, label) {
  if (!fs.existsSync(destination)) return;

  if (!force && !isManagedFile(destination)) {
    fail(
      `${label} already exists at ${destination} and does not look like an INGFE installer-managed file. ` +
        "Re-run with --force to overwrite it.",
    );
  }

  if (!dryRun) fs.rmSync(destination, { force: true });
}

function isManagedDestination(destination) {
  if (!fs.statSync(destination).isDirectory()) return false;

  if (fs.existsSync(path.join(destination, ".ingfe-installed"))) return true;

  const skillFile = path.join(destination, "SKILL.md");
  if (fs.existsSync(skillFile)) {
    const text = fs.readFileSync(skillFile, "utf8");
    return skills.some((skill) => text.includes(`name: ${skill}`));
  }

  const extensionFile = path.join(destination, "gemini-extension.json");
  if (fs.existsSync(extensionFile)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(extensionFile, "utf8"));
      return parsed.name === "ingfe-skills";
    } catch {
      return false;
    }
  }

  const commandFiles = fs
    .readdirSync(destination, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(destination, entry.name));

  return commandFiles.some((file) => fs.readFileSync(file, "utf8").includes("INGFE installer-managed"));
}

function isManagedFile(file) {
  return fs.readFileSync(file, "utf8").includes("INGFE installer-managed");
}

function writeMarker(destination) {
  if (dryRun) return;
  fs.writeFileSync(
    path.join(destination, ".ingfe-installed"),
    "This directory is managed by the ingfe-skills npm installer.\n",
  );
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function printHelp() {
  console.log(`INGFE skills installer

Usage:
  npx ingfe-skills
  npx ingfe-skills install
  npx ingfe-skills install --target=codex,claude,gemini

Options:
  --target=<list>  Comma-separated targets: codex, claude, gemini. Defaults to all three.
  --force          Overwrite existing target paths that are not marked as INGFE-managed.
  --dry-run        Print intended installs without writing files.
  --help           Show this help.

Environment overrides:
  CODEX_SKILLS_DIR, AGENTS_SKILLS_DIR, CLAUDE_SKILLS_DIR, CLAUDE_COMMANDS_DIR,
  GEMINI_EXTENSION_DIR, GEMINI_COMMANDS_DIR
`);
}
