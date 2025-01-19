"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTemplate = loadTemplate;
exports.renderTemplate = renderTemplate;
exports.createDirectoryIfNotExists = createDirectoryIfNotExists;
const promises_1 = __importDefault(require("fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const handlebars_1 = __importDefault(require("handlebars"));
async function loadTemplate(templateName) {
    const templatePath = node_path_1.default.resolve('stubs', `${templateName}.yaml`);
    return promises_1.default.readFile(templatePath, 'utf8');
}
async function renderTemplate(template, values) {
    const compiled = handlebars_1.default.compile(template);
    return compiled(values);
}
async function createDirectoryIfNotExists(dir) {
    try {
        await promises_1.default.mkdir(dir, { recursive: true });
    }
    catch (error) {
        console.error('Error creating directory:', error);
    }
}
