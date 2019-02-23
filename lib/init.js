
const fs = require('fs-extra');
const path = require('path');
const download = require('download-git-repo');
const shell = require('shelljs');
const ora = require('ora');
const chalk = require('chalk');
const handlebars = require('handlebars');
const tplPath = path.resolve(__dirname, '../sivconfig.json');
const tplJson = require(tplPath);

function init({name,tpl}){
    if(!tplJson[tpl]){
        console.log(chalk.red('没有该项目信息'));
            return;
    }
    if(!fs.existsSync(name)){
        const spinner = ora('正在下载模板...');
        spinner.start();
        download(tplJson[tpl].config.url, name, {clone: true}, (err) => {
            if(err){
                spinner.fail();
                console.log(chalk.red(err));
            }else{
                spinner.succeed();
                let pwd = shell.pwd()
                 const fileName = `${name}/.siv`;
                 const meta = {
                            name,
                            project:tplJson[tpl].name,
                            language:tplJson[tpl].language

                        }
                        if(fs.existsSync(fileName)){
                            const content = fs.readFileSync(fileName).toString();
                            const result = handlebars.compile(content)(meta);
                            fs.writeFileSync(fileName, result);
                        } 
                shell.rm('-rf', pwd + `/${name}/.git`)
                console.log(chalk.green('项目初始化完成'));
            }
        })
    }else{
        // 错误提示项目已存在，避免覆盖原有项目
        console.log(chalk.red('项目已存在'));
    }


}
module.exports = init;
