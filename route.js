/*
* @Author: pengyanxin
* @Date:   2016-04-06 12:25:50
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-04-06 21:37:56
*/

'use strict';

const path = require('path');
const url = require('url');
const fs = require('fs');
const babel = require('babel-core');
const _ = require('lodash');

const mimetypes = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.html': 'text/html'
}

const sourcePath = {
    '.css': './stylesheets/css',
    '.js': './stylesheets/javascript'
}

const pagePath = './page'

let cache = {} // 文件缓存

module.exports = route;

function route(request, response) {
    let link = url.parse(decodeURI(request.url));
    let pathname = path.normalize(link.pathname).substring(1);
    let extname = path.extname(pathname);
    if (pathname === 'favicon.ico') {
        response.end();
        return;
    }
    // 如果是js/css文件
    if (sourcePath[extname]) {
        let filePath = sourcePath[extname];
        fs.stat(`${filePath}/${pathname}`, (err, stats) => {
            if (err) {
                response.writeHead(404);
                response.end("don't find the file!");
                return false;
            }
            let isUpdated = !!cache[`${filePath}/${pathname}`] && Date.parse(stats.mtime) < cache[`${filePath}/${pathname}`].mtime;
            if (!cache[`${filePath}/${pathname}`] || isUpdated) {
                fs.readFile(`${filePath}/${pathname}`, (err, data) => {
                    if (err) {
                        response.end('' + err);
                        return false;
                    }
                    response.writeHead(200, {'Content-Type': mimetypes[extname]});
                    response.end(data);
                    cache[`{filePath}/${pathname}`] = {
                        content: data,
                        mtime: Date.parse(stats.mtime)
                    };
                    return false;
                })
                return false;
            }
            response.writeHead(200, {'Content-Type': mimetypes[extname]});
            response.end(cache[`${filePath}/${pathname}`].content);
        })
    }
    // 不是js/css则为html文件 -- 仅仅在这个服务器中
    else {
        let code = {};
        if (!extname) {
            fs.stat(`${pagePath}/${pathname}/index.html`, (err, stats) => {
                if (err) {
                    pathname += '.html';
                } else {
                    pathname += '/index.html';
                }
                let dirPath = pathname.split('/');
                dirPath.pop();
                dirPath = dirPath.join('/');
                fs.readdir(`${pagePath}/${dirPath}`, (err, files) => {
                    if (err) {
                        response.end('' + err);
                        return ;
                    }
                    files.forEach((file) => {
                        if (file.includes('.js')) {
                            let temp = fs.readFileSync(`${pagePath}/${dirPath}/${file}`)
                            code[file.slice(0, -3)] = temp;
                        }
                    });
                    fs.readFile(`${pagePath}/${pathname}`, (err, data) => {
                        response.end(_.template(data)(code));
                    })
                })
            })
        }
    }
} 