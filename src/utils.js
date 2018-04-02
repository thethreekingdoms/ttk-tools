'use strict'

import vfs from 'vinyl-fs'
import { exec } from 'child_process'
import spawn from 'cross-spawn'
import chalk from 'chalk'
import fs from 'fs'
import through from 'through2'
import readline from 'readline'

export function CMD (cmdStr, option){
    return new Promise(function(resolve, reject){
        console.log('ttk: 操作路径=====>'+ option.cwd)
        let build 
        build = exec(cmdStr,option,(err, stdout, stderr) => {
            if(err) {
                console.log(chalk.redBright(err))
                reject(err)
            }
            console.log('ttk: ' + stdout)
            console.log('ttk: ' + stderr)
            resolve()
        })
        build.stdout.on('data', (data) => {
            console.log(`ttk: ${data}`)
        })
    })
}

export function copyFile(projectName, path){
    return new Promise(function(resolve, reject){
        vfs.src(path)
            .pipe(through.obj(function(file, enc, cb){
                this.push(file)
                cb()
            }))
            .pipe(vfs.dest(`./${projectName}`))
            .on('end', function (err) {
                resolve()
            })
            .resume()
    })
}


export function mkdir (name) {
    return new Promise(function(resolve, reject){
        fs.mkdir(name, (err) => {
            if(err){
                console.log(chalk.redBright(err))
                resolve(err)
            }else{
                resolve()
            }
        })
    })
}

export function rename (oldName, newName){
    return new Promise(function(resolve, reject){
        console.log('重命名')
        fs.rename(oldName, newName, (err) => {
            console.log(err,'>>>>>>>>>>')
            if(err){
                console.log(chalk.redBright(err))
                resolve(err)
            }else{
                resolve()
            }
        })
    })
}

export function deleteFile (path){
    return new Promise(function(resolve, reject){
        console.log('正在删除文件。。。。。')
        fs.unlink(path, (err) => {
            if(err){
                console.log(err)
                resolve(err)
            }else{
                console.log('删除完成')
                resolve()
            }
        })
    })
}

export function haveFile (path) {
    return new Promise(function(resolve, reject) {
        fs.stat(`./${path}`, (err, stats)=>{
            if( stats ){
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}

export function prompt (question) {
    return new Promise(function (resolve, reject) {
        const res = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
        res.question(question, (ans) => {
            resolve(ans)
            res.close()
        })
    })
}

export async function getInput(warn){
    while (true){
        console.log(chalk.yellowBright('你的输入为空!'))
        const res  = await prompt(warn)
        if( res ){
            return res
        }
    }
}

export function readDir (path) {
    return new Promise(function(resolve, reject) {
        fs.readdir(path, (err, data) => {
            if( err ){
                console.log(err)
                resolve([])
            }else{
                console.log(data)
                resolve(data)
            }
        })
    })
}