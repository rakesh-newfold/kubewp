import fs from 'fs/promises';
import path from 'node:path';
import Handlebars from 'handlebars';

export async function loadTemplate(templateName: string): Promise<string> {
  const currentDir = path.resolve(__dirname);
  const templatePath = path.resolve(
    currentDir,
    'stubs',
    `${templateName}.yaml`,
  );
  return fs.readFile(templatePath, 'utf8');
}

export async function renderTemplate(
  template: string,
  values: Record<string, unknown>,
): Promise<string> {
  const compiled = Handlebars.compile(template);
  return compiled(values);
}

export async function createDirectoryIfNotExists(dir: string): Promise<void> {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }
}
