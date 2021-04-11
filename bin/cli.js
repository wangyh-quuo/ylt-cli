#!/usr/bin/env node

const { program } = require('commander');

const package = require('../package.json')

const { create } = require("../lib/index");

program.version(`${package.name} ${package.version}`)

program.command('create <app-name>')
  .description('创建一个项目')
  .option('-d, --default', '默认创建')
  .action((name, options) => {
    create(name, options)
  })

program.parse()



