const fs = require('fs')
const path = require('path')

const ora = require('ora')

const _fetchTemplate = require('./list/fetch')

const download = require('./list/download')
const inquirer = require('inquirer');
const createLoading = require('./util/createLoading')

const { copyFile } = require('./core/file')

const fetchTemplate = createLoading('获取模板', _fetchTemplate)

const downTemplate = createLoading('正在下载模板', download)

async function copyTemplate(source, dest) {
  const snipper = ora('复制到本地目录')
  if (fs.existsSync(path.join(dest))) {
    snipper.fail(`${dest}不是一个空的文件夹`)
    return
  } else {
    copyFile(source, dest, () => snipper.succeed('初始化成功'))
  }
}

module.exports = async function (name, options) {

  const repos = 'ylt-vue-template'

  const templates = await fetchTemplate(repos)

  inquirer.prompt([
    {
      type: 'list',
      name: 'template_branch',
      message: '选择项目模板',
      choices: templates
    }
  ]).then(({ template_branch }) => {
    // 下载对应分支名称下的代码
    const api = `wangyh-quuo/${repos}#${template_branch}`
    return downTemplate(api, `${repos}#${template_branch}`)
  }).then(res => {
    // 拷贝目录至输出目录
    copyTemplate(res, path.join(process.cwd(), name))
  })

}