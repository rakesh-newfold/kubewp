import { processTemplates } from './templateProcessor';
import { ConfigAnswers } from './types';
import { promptConfig, promptOutputDir } from './config';

async function main(): Promise<void> {
  try {
    const outputDir: string = await promptOutputDir();
    const answers: ConfigAnswers = await promptConfig();
    await processTemplates(answers, outputDir);
  } catch (error) {
    if (error instanceof Error && error.name === 'ExitPromptError') {
      console.log('Prompt exit detected, proceeding without further actions.');
      return;
    }
    console.error('An unexpected error occurred:', error);
  }
}

main();
