"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTemplates = processTemplates;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const util_1 = require("./util");
async function processTemplates(answers, outputDir) {
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
    await promises_1.default.mkdir(outputDir, { recursive: true });
    for (const { name, values } of templates) {
        const template = await (0, util_1.loadTemplate)(name);
        const renderedYaml = await (0, util_1.renderTemplate)(template, values);
        const outputPath = path_1.default.join(outputDir, `${name}.yaml`);
        await promises_1.default.writeFile(outputPath, renderedYaml, 'utf8');
    }
}
