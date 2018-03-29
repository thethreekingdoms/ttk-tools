#!/usr/bin/env node
'use strict'
const func = require('../lib/index')

var program = require('commander');
program
  .version(require('../package').version );

// 定义使用方法
program
  .usage('<command>')

program
  .command('new')
  .description('create website project')
  .alias('n')
  .action(function(params){
    func.website(params)
  })

program
  .command('app')
  .description('create app files')
  .alias('a')
  .action(function(){
    // require('../command/model')()
  })

program
  .command('sever')
  .description('create Sever files')
  .alias('se')
  .action(function(){
    // require('../command/component')()
  })

program
  .command('service')
  .description('create Service files')
  .alias('sc')
  .action(function(){
    // require('../command/stateless')()
  })
program
  .command('clone')
  .description('clone app files')
  .alias('c')
  .action(function(a, b, c){
    func.clone(a, b)
  })
program
  .command('compile')
  .description('compile the project')
  .alias('cp')
  .action(function(){
    func.compile()
  })
program.parse(process.argv)

if(!program.args.length){
  program.help()
}
