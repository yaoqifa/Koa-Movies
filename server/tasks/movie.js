const cp = require('child_process')
const { resolve } = require('path')

;(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list')
  const child = cp.fork(script, [])
  let invoked = false //标识脚本有没有运行过

  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = false
    let err = code === 0 ? null :new Error('exit code ' + code)
    console.log(err)
  })

  child.on('message', data => {
    let res = data.result
    console.log(res)
  })
})()
