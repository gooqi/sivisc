#!/usr/bin/env node

const fs = require('fs-extra');
const program = require('commander');
const download = require('download-git-repo');
//const handlebars = require('handlebars');
const inquirer = require('inquirer');
const shell = require('shelljs');
const chalk = require('chalk');
const init = require('../lib/init');

program.version('1.0.0', '-v, --version')
	.command('new <tpl> [name]')
    .alias('n')
    .description('Creates a new project')
    .action((name,tpl) => {
        if(!tpl || !name){
            console.log()
            console.log('  Examples:')
            console.log(chalk.yellow('    # 使用siv项目创建'))
            console.log('    $ siv new project-name my-project')
            console.log('    $ struct n project-name  my-project')
            console.log()
            return;
        }
                init({name,tpl});
    
    })
program.parse(process.argv);

const cmd = process.argv[2];
if (!['new', 'n'].includes(cmd)) {
  program.help();
}
