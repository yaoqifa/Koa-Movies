####used third repository

(koa-views)[https://github.com/queckezz/koa-views]
(puppeteer)[https://github.com/GoogleChrome/puppeteer]
(request)[https://github.com/request/request]
(request-promise-native)[https://github.com/request/request-promise-native]

###同步与异步
1. 调用方需要等待被调用方响应，则是同步。反之，异步。
实现异步可以通过调用方的主动轮询，也可以被调用方的主动通知（执行调用方之前注册好的回调）

同步阻塞（什么事也做不了，需要等待）？同步非阻塞，（通过轮询，可以做其它的事）
异步非阻塞，消息传递的方式通知调用方，避免了轮询

2. 总之，同步异步是过程，在于有无消息传递的机制，调用方是主动等待的，还是被动通知进度。

###阻塞非阻塞
1. 在调用过程中，调用方获得信息的状态，如果要等待，则是阻塞，反之，非阻塞。
2. 阻塞非阻塞是状态
3. 异步非阻塞是节约调用方时间的，正式nodeJs的优点。