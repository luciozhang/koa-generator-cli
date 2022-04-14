#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer'
import { downloadTemplate } from './download'
import { modifyPackageJson } from './modify'

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

const program = new Command();

program
  .name('koa-generator-cli')
  .description('"Koa2+TypeScript application generator')
  .version('0.0.1');

program
  .command('init <name>')
  .description('init a koa project')
  .action(async (name: string) => {
    downloadPath = `./${name}`;
    const initOptions = await inquirer.prompt(InitPrompts);
    try {
      await downloadTemplate(name, templateGitUrl, downloadPath);
      await modifyPackageJson(downloadPath, { name, ...initOptions});
    } catch (error) {
      console.error(error);
    }
  })

program.parse();  