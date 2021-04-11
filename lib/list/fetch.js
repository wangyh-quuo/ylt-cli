const ora = require('ora')
const fetch = require('node-fetch')

const base_url = 'https://api.github.com'

module.exports = async function (reposName) {
 const data = await fetch(`${base_url}/repos/wangyh-quuo/${reposName}/branches`).then(
    res => res.json()
  ).catch(err => {
    console.log(err)
  })
  return data.map(item => item.name)
}