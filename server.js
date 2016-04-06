/*
* @Author: pengyanxin
* @Date:   2016-04-05 23:04:38
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-04-06 21:45:30
*/

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');

const pagePath = './page';
const jsPath = './stylesheets/javascript';
const route = require('./route');

let code = {};

http.createServer((req, res) => {
    route(req, res);
}).listen(8080);

// babel 转码过程放在启动服务器的时候，而不放在发起请求的时候

fs.readdir(`${pagePath}`, (err, folders) => {
    folders.forEach((folder) => {
        if (!path.extname(folder)) {
            fs.readdir(`${pagePath}/${folder}`, (error, files) => {
                files.forEach((file) => {
                    if (file.includes('.js')) {
                        if (!fs.existsSync(`${jsPath}/${folder}`)) {
                            fs.mkdirSync(`${jsPath}/${folder}`);
                        }
                        if (!fs.existsSync(`${jsPath}/${folder}/${file}`)) {
                            babelTransform(`${pagePath}/${folder}/${file}`);
                        } else {
                            let fileStats = fs.statSync(`${pagePath}/${folder}/${file}`);
                            if (!code[`${jsPath}/${folder}/${file}`] || Date.parse(fileStats.mtime) > code[`${jsPath}/${folder}/${file}`]) {
                                babelTransform(`${pagePath}/${folder}/${file}`);
                            }
                        }
                        fs.watch(`${pagePath}/${folder}/${file}`, (event, changeFile) => {
                            if (event === 'change') {
                                babelTransform(`${pagePath}/${folder}/${changeFile}`);
                            }
                        })
                    }
                })
            })
        }
    })
})

function babelTransform(filePath) {
    console.log(` === start to babel the ${filePath}`);
    let babelResult = babel.transformFileSync(filePath);
    let writePath = jsPath + filePath.substr(pagePath.length);
    fs.writeFileSync(`${writePath}`, babelResult.code);
    console.log(` === finish to babel the ${filePath}`);
    code[`${writePath}`] = Date.now();
}