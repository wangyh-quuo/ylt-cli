const fs = require('fs')
const path = require('path')

/**
 * 复制文件
 */
function copyFile(source, dest, callback) {

  if (!fs.existsSync(dest)) {
    fs.mkdir(dest, err => err ? console.log(err) : null)
  }

  fs.readdir(source, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      fs.stat(path.join(source, file), (err, stats) => {
        if (err) throw err
        // 如果是文件直接拷贝，文件夹再递归子文件
        if (stats.isFile()) {
          fs.writeFileSync(path.join(dest, file), fs.readFileSync(path.join(source, file)))
        } else {
          copyFile(path.join(source, file), path.join(dest, file))
        }
      })
    })
    if (callback && typeof callback === 'function') {
      callback()
    }
  })
}

module.exports = {
  copyFile
}