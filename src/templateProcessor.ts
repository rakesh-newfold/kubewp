import fs from 'fs/promises';
import path from 'path';
import { loadTemplate, renderTemplate } from './util';
import { ConfigAnswers } from './types';

export async function processTemplates(
  answers: ConfigAnswers,
  outputDir: string,
) {
  const templates = [
    { name: 'namespace', values: { namespace: answers.namespace } },
    {
      name: 'secret',
      values: {
        namespace: answers.namespace,
        dbPassword: Buffer.from(answers.dbPassword).toString('base64'),
      },
    },
    { name: 'pvc', values: { namespace: answers.namespace } },
    {
      name: 'service',
      values: {
        namespace: answers.namespace,
        serviceName: answers.serviceName,
        servicePort: answers.servicePort,
      },
    },
    {
      name: 'deployment',
      values: {
        namespace: answers.namespace,
        deploymentName: answers.deploymentName,
        wordpressImage: answers.wordpressImage,
        dbHost: answers.dbHost,
        dbUser: answers.dbUser,
        dbName: answers.dbName,
      },
    },
    {
      name: 'hpa',
      values: {
        namespace: answers.namespace,
        deploymentName: answers.deploymentName,
        minReplicas: answers.minReplicas,
        maxReplicas: answers.maxReplicas,
      },
    },
    {
      name: 'cronjob',
      values: {
        namespace: answers.namespace,
        cronjobName: answers.cronjobName,
        schedule: answers.schedule,
        cronjobImage: answers.cronjobImage,
        command: Array.isArray(answers.command)
          ? answers.command
          : answers.command.split(',').map((cmd) => cmd.trim()),
      },
    },
    {
      name: 'ingress',
      values: {
        namespace: answers.namespace,
        ingressName: answers.ingressName,
        host: answers.host,
        serviceName: answers.serviceName,
        servicePort: answers.servicePort,
      },
    },
  ];

  await fs.mkdir(outputDir, { recursive: true });

  for (const { name, values } of templates) {
    const template = await loadTemplate(name);
    const renderedYaml = await renderTemplate(template, values);
    const outputPath = path.join(outputDir, `${name}.yaml`);
    await fs.writeFile(outputPath, renderedYaml, 'utf8');
  }
}
