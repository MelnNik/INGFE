import path from "path";
import { fileURLToPath } from "url";

const pluginDir = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(pluginDir, "../../skills");

export const IngfeSkillsPlugin = async () => {
  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];

      if (!config.skills.paths.includes(skillsDir)) {
        config.skills.paths.push(skillsDir);
      }
    },
    "experimental.chat.messages.transform": async (_input, output) => {
      if (!output.messages?.length) return;

      const firstUser = output.messages.find((message) => message.info.role === "user");
      if (!firstUser?.parts?.length) return;

      const alreadyInjected = firstUser.parts.some(
        (part) => part.type === "text" && part.text.includes("INGFE_SKILLS_BOOTSTRAP")
      );
      if (alreadyInjected) return;

      const ref = firstUser.parts[0];
      firstUser.parts.unshift({
        ...ref,
        type: "text",
        text: [
          "INGFE_SKILLS_BOOTSTRAP",
          "You have access to INGFE skills.",
          "Use OpenCode's native skill tool to load ingfe-plan when planning project docs or milestones.",
          "Use OpenCode's native skill tool to load ingfe-execute when implementing the earliest incomplete PLAN.md milestone.",
          "Follow user and repository instructions before skill instructions.",
        ].join("\n"),
      });
    },
  };
};

export default IngfeSkillsPlugin;
