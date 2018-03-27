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
  .command('website')
  .description('create website project')
  .alias('w')
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
  .action(function(){
    // require('../command/stateless')()
  })
program.parse(process.argv)

if(!program.args.length){
  program.help()
}
