#!/usr/bin/env node
'use strict'
const func = require('../lib/index')

var program = require('commander');
program
  .version(require('../package').version);

// 定义使用方法
program
  .usage('<command>')

program
  .command('new')
  .description('create website project')
  .alias('n')
  .action(function (params) {
    console.log('params', params)
    func.website(params)
  })

program
  .command('app')
  .description('create app files')
  .alias('a')
  .action(function (a) {
    // require('../command/model')()
    func.createApp(a)
  })

program
  .command('sever')
  .description('create Sever files')
  .alias('se')
  .action(function () {
    // require('../command/component')()
  })

program
  .command('service')
  .description('create Service files')
  .alias('sc')
  .action(function () {
    // require('../command/stateless')()
  })
program
  .command('clone')
  .description('clone app files')
  .alias('c')
  .action(function (a, b, c) {
    func.clone(a, b)
  })
program
  .command('compile')
  .description('compile the project')
  .alias('cp')
  .action(function () {
    func.compile()
  })
program
  .command('update')
  .description('update the app')
  .alias('up')
  .action(function (app, path) {
    func.update(app, path)
  })

program
  .command('apps')
  .description('clone apps')
  .alias('as')
  .action(function (path, ...apps) {
    func.cloneApps(path, apps)
  })

program
  .command('reset')
  .description('reset the project folder')
  .alias('re')
  .action(function () {
    func.reset()
  })

program
  .command('demo')
  .description('install complete apps')
  .alias('de')
  .action(function(path, ...apps){
    func.init()
  })


program
    .command('serverCreateParent')
    .description('创建后端开发父工程（包含一个默认的微服务模板）')
    .alias('scp')
    .action(function (params) {
        console.log('params', params)
        func.serverCreateParent(params)
    })
program
    .command('serverAddMicroservice')
    .description('增加一个微服务,可指定模板名称，无指定则使用默认模板')
    .alias('sam')
    .action(function (businessName,moduleName) {
        console.log('params:'+businessName+','+moduleName);
        func.serverAddMicroservice(businessName,moduleName)
    })


program.parse(process.argv)



if (!program.args.length) {
  program.help()
}
