#!/usr/bin/env node

const fs = require('fs-extra');
const program = require('commander');
const download = require('download-git-repo');
//const handlebars = require('handlebars');
const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');
const log = require('tracer').colorConsole()

program.version('1.0.0', '-v, --version')
	.command('new <name>')
    .alias('n')
    .description('Creates a new project')
    .action((name) => {
        if(!fs.existsSync(name)){
            inquirer.prompt([
				{
					name: 'description',
					message: '请输入项目描述'
				},
				{
					name: 'author',
					message: '请输入作者名称'
				}
            ]).then((answers) => {
                const spinner = ora('正在下载模板...');
                spinner.start();
				download('gooqi/g_tornado', name, {clone: true}, (err) => {
                    if(err){
                        spinner.fail();
                        log.error(err);
                    }else{
                        spinner.succeed();
                        let pwd = shell.pwd()
                       /* const fileName = `${name}/package.json`;
                        const meta = {
                            name,
                            description: answers.description,
                            author: answers.author
                        }
                        if(fs.existsSync(fileName)){
                            const content = fs.readFileSync(fileName).toString();
                            const result = handlebars.compile(content)(meta);
                            fs.writeFileSync(fileName, result);
                        }*/
                         shell.rm('-rf', pwd + `/${name}/.git`)
                        log.info('项目初始化完成');
                    }
                })
            })
        }else{
            // 错误提示项目已存在，避免覆盖原有项目
            log.error('项目已存在');
        }
    })
program.parse(process.argv);

const cmd = process.argv[2];
if (!['new', 'n'].includes(cmd)) {
  program.help();
}
