"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templateProcessor_1 = require("./templateProcessor");
const config_1 = require("./config");
async function main() {
    try {
        const outputDir = await (0, config_1.promptOutputDir)();
        const answers = await (0, config_1.promptConfig)();
        await (0, templateProcessor_1.processTemplates)(answers, outputDir);
    }
    catch (error) {
        if (error instanceof Error && error.name === 'ExitPromptError') {
            console.log('Prompt exit detected, proceeding without further actions.');
            return;
        }
        console.error('An unexpected error occurred:', error);
    }
}
main();
