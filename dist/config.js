"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptConfig = promptConfig;
exports.promptOutputDir = promptOutputDir;
const prompts_1 = require("@inquirer/prompts");
const util_1 = require("./util");
const node_path_1 = __importDefault(require("node:path"));
async function promptConfig() {
    const namespace = await (0, prompts_1.input)({
        message: 'Namespace:',
        default: 'wordpress',
    });
    const deploymentName = await (0, prompts_1.input)({
        message: 'Deployment Name:',
        default: 'wordpress',
    });
    const wordpressImage = await (0, prompts_1.input)({
        message: 'WordPress Image:',
        default: 'wordpress:latest',
    });
    const dbHost = await (0, prompts_1.input)({
        message: 'Database Host:',
        default: 'mysql',
    });
    const dbUser = await (0, prompts_1.input)({
        message: 'Database User:',
        default: 'wordpress',
    });
    const dbPassword = await (0, prompts_1.password)({
        message: 'Database Password:',
        mask: '*',
    });
    const dbName = await (0, prompts_1.input)({
        message: 'Database Name:',
        default: 'wordpress',
    });
    const minReplicas = await (0, prompts_1.input)({
        message: 'Minimum Replicas for Autoscaler:',
        default: '1',
        validate: (value) => !isNaN(Number(value)) || 'Please enter a number',
    });
    const maxReplicas = await (0, prompts_1.input)({
        message: 'Maximum Replicas for Autoscaler:',
        default: '5',
        validate: (value) => !isNaN(Number(value)) || 'Please enter a number',
    });
    const cronjobName = await (0, prompts_1.input)({
        message: 'CronJob Name:',
        default: 'wordpress-cronjob',
    });
    const schedule = await (0, prompts_1.input)({
        message: 'CronJob Schedule (e.g., "*/5 * * * *"):',
        default: '*/5 * * * *',
    });
    const cronjobImage = await (0, prompts_1.input)({
        message: 'CronJob Image:',
        default: 'busybox',
    });
    const commandInput = await (0, prompts_1.input)({
        message: 'CronJob Command (comma-separated):',
        default: '["/bin/sh", "-c", "date; echo Hello World"]',
    });
    const command = (() => {
        try {
            return JSON.parse(commandInput);
        }
        catch {
            return commandInput.split(',').map((cmd) => cmd.trim());
        }
    })();
    const ingressName = await (0, prompts_1.input)({
        message: 'Ingress Name:',
        default: 'wordpress-ingress',
    });
    const host = await (0, prompts_1.input)({
        message: 'Ingress Host (e.g., example.com):',
        default: 'wordpress.local',
    });
    const serviceName = await (0, prompts_1.input)({
        message: 'Service Name:',
        default: 'wordpress',
    });
    const servicePort = await (0, prompts_1.input)({
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
async function promptOutputDir() {
    // Default the output directory to 'kubewp' inside the current working directory
    const defaultDir = node_path_1.default.join(process.cwd(), 'kubewp');
    // Ask the user for the output directory, defaulting to 'kubewp' inside the current folder
    const outputDir = await (0, prompts_1.input)({
        message: 'Enter output directory (default is "kubewp" inside current folder):',
        default: defaultDir,
    });
    // Ensure the directory exists
    await (0, util_1.createDirectoryIfNotExists)(outputDir);
    return outputDir;
}
