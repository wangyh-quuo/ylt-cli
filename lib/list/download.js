const donwnload = require('download-git-repo');
const fs = require('fs')
const path = require('path')

// 缓存的根目录
const tempRootDir = `${process.platform === 'win32' ? process.env['USERPROFILE'] : process.env['HOME']}/.tmp`

/**
 * 下载模板
 */
module.exports = function (repo, dest) {

  const cache = `${tempRootDir}/${dest}`

  // 存在缓存路径
  if(fs.existsSync(path.join(cache))) {
    return Promise.resolve(cache)
  } 

  return new Promise((resolve, reject) => {
    donwnload(repo, cache, err => {
      err ? reject(err) : resolve(cache)
    })
  })

}