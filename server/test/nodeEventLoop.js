const { readFile } = require('fs')
const { resolve } = require('path')
const EventEmitter = require('events')

class EE extends EventEmitter {}

const instance = new EE()

instance.on('jhs', () => {
  console.log('jhs事件回调调用')
})

setTimeout(() => {
  console.log('0 ms 后到期执行的定时器回调')
}, 0)

setTimeout(() => {
  console.log('100 ms 后到期执行的定时器回调')
}, 100)

setTimeout(() => {
  console.log('200 ms 后到期执行的定时器回调')
}, 200)

readFile(resolve(__dirname, '../package.json'), 'utf-8', () => {
  console.log('第1次读取文件操作回调')
})

readFile(resolve(__dirname, '../README.md'), 'utf-8', () => {
  console.log('第2次读取文件操作回调')
})

setImmediate(() => {
  console.log('immediate 立即回调')
})

process.nextTick(() => {
  console.log('process.nextTick 的第 1 次回调')
})

Promise.resolve().then(() => {
  instance.emit('jhs')
  process.nextTick(() => {
    console.log('process.nextTick 的第 2 次回调')
  })
  console.log('promise的第 1 次回调')
}).then(() => {
  console.log('promise的第 2 次回调')
})

/** 
 * 执行结果
 *  process.nextTick 的第 1 次回调
    jhs事件回调调用
    promise的第 1 次回调
    promise的第 2 次回调
    process.nextTick 的第 2 次回调
    0 ms 后到期执行的定时器回调
    immediate 立即回调
    第1次读取文件操作回调
    第2次读取文件操作回调
    100 ms 后到期执行的定时器回调
    200 ms 后到期执行的定时器回调
*/

/** 
 * 执行解释
 *  首先，当前是本轮循环。在第一个阶段之前，已经有了line 37 process.nextTick回调注册，所以第一个打印是 process.nextTick 的第 1 次回调 。执行完后执行Promise.resolve，它是
 * 仅次于process.nextTick的优先级。在line 41 Promise.then里第一个执行的是instance.emit('jhs')，触发了事件回调，于是立刻执行line 9 的instance.on('jhs'注册的回调函数，
 * 打印 jhs事件回调调用 ,执行完毕后会回到line 43，又遇到 process.nextTick， 下面打印 promise的第 1 次回调。继续往下走会打印 promise的第 2 次回调。在line 48 执行完后，
 * 因为刚才又新加了一个process.nextTick，所以当前事件循环体里还有一个nextTick未执行，优先执行它，所以打印 process.nextTick 的第 2 次回调 。打印完后，当前事件循环体
 * 里没有了nextTick，也没有了promise等microtask。进入下轮循环，首先进入到times阶段。所以time阶段第一个执行的是line 14 这个0ms的定时器，打印 0 ms 后到期执行的定时器回调 ，这个执行
 * 完后，当前的100ms和200ms可能还没到期，就会进到下个阶段。发现poll阶段里面有两个回调函数还没执行，都是读文件操作，首先dayin 第1次读取文件操作回调，然后 打印 第2次读取文件操作回调.
 * 等到这个poll队列被执行清空以后。进入ckeck阶段 发现又注册了setImmediate回调，打印 immediate 立即回调 。最后再次前往timer阶段，打印 100 ms 后到期执行的定时器回调和 200 ms 后到期执行的定时器回调
*/

// 墙裂推荐阮老师的博客 http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html