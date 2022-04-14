#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const download_1 = require("./download");
const modify_1 = require("./modify");
const InitPrompts = [
    {
        name: 'description',
        message: 'please input description',
        default: '',
    },
    {
        name: 'author',
        message: 'please input author',
        default: '',
    }
];
const templateGitUrl = 'https://github.com/luciozhang/koa-ts-template.git';
let downloadPath = null;
const program = new commander_1.Command();
program
    .name('koa-generator-cli')
    .description('"Koa2+TypeScript application generator')
    .version('0.0.1');
program
    .command('init <name>')
    .description('init a koa project')
    .action((name) => __awaiter(void 0, void 0, void 0, function* () {
    downloadPath = `./${name}`;
    const initOptions = yield inquirer_1.default.prompt(InitPrompts);
    try {
        yield (0, download_1.downloadTemplate)(name, templateGitUrl, downloadPath);
        yield (0, modify_1.modifyPackageJson)(downloadPath, Object.assign({ name }, initOptions));
    }
    catch (error) {
        console.error(error);
    }
}));
program.parse();
//# sourceMappingURL=index.js.map