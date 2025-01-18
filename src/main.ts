import { processTemplates } from './templateProcessor';
import { ConfigAnswers } from './types';
import { promptConfig, promptOutputDir } from './config';

async function main(): Promise<void> {
  try {
    const outputDir: string = await promptOutputDir();
    const answers: ConfigAnswers = await promptConfig();

    await processTemplates(answers, outputDir);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
