import { input, password } from '@inquirer/prompts';
import { ConfigAnswers } from './types';
import { createDirectoryIfNotExists } from './util';
import path from 'node:path';

export async function promptConfig(): Promise<ConfigAnswers> {
  const namespace = await input({
    message: 'Namespace:',
    default: 'wordpress',
  });

  const deploymentName = await input({
    message: 'Deployment Name:',
    default: 'wordpress',
  });

  const wordpressImage = await input({
    message: 'WordPress Image:',
    default: 'wordpress:latest',
  });

  const dbHost = await input({
    message: 'Database Host:',
    default: 'mysql',
  });

  const dbUser = await input({
    message: 'Database User:',
    default: 'wordpress',
  });

  const dbPassword = await password({
    message: 'Database Password:',
    mask: '*',
  });

  const dbName = await input({
    message: 'Database Name:',
    default: 'wordpress',
  });

  const minReplicas = await input({
    message: 'Minimum Replicas for Autoscaler:',
    default: '1',
    validate: (value) => !isNaN(Number(value)) || 'Please enter a number',
  });

  const maxReplicas = await input({
    message: 'Maximum Replicas for Autoscaler:',
    default: '5',
    validate: (value) => !isNaN(Number(value)) || 'Please enter a number',
  });

  const cronjobName = await input({
    message: 'CronJob Name:',
    default: 'wordpress-cronjob',
  });

  const schedule = await input({
    message: 'CronJob Schedule (e.g., "*/5 * * * *"):',
    default: '*/5 * * * *',
  });

  const cronjobImage = await input({
    message: 'CronJob Image:',
    default: 'busybox',
  });

  const commandInput = await input({
    message: 'CronJob Command (comma-separated):',
    default: '["/bin/sh", "-c", "date; echo Hello World"]',
  });

  const command = (() => {
    try {
      return JSON.parse(commandInput);
    } catch {
      return commandInput.split(',').map((cmd) => cmd.trim());
    }
  })();

  const ingressName = await input({
    message: 'Ingress Name:',
    default: 'wordpress-ingress',
  });

  const host = await input({
    message: 'Ingress Host (e.g., example.com):',
    default: 'wordpress.local',
  });

  const serviceName = await input({
    message: 'Service Name:',
    default: 'wordpress',
  });

  const servicePort = await input({
    message: 'Service Port:',
    default: '80',
    validate: (value) => !isNaN(Number(value)) || 'Please enter a number',
  });

  return {
    namespace,
    deploymentName,
    wordpressImage,
    dbHost,
    dbUser,
    dbPassword,
    dbName,
    minReplicas: Number(minReplicas),
    maxReplicas: Number(maxReplicas),
    cronjobName,
    schedule,
    cronjobImage,
    command,
    ingressName,
    host,
    serviceName,
    servicePort: Number(servicePort),
  };
}

export async function promptOutputDir(): Promise<string> {
  // Default the output directory to 'kubewp' inside the current working directory
  const defaultDir = path.join(process.cwd(), 'kubewp');

  // Ask the user for the output directory, defaulting to 'kubewp' inside the current folder
  const outputDir = await input({
    message:
      'Enter output directory (default is "kubewp" inside current folder):',
    default: defaultDir,
  });

  // Ensure the directory exists
  await createDirectoryIfNotExists(outputDir);

  return outputDir;
}
