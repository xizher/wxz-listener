# @wxz/listener::: JavaScript 监听器类

## 安装

```shell
npm install @xizher/listener
```

## 使用

```js
import Listener from "@xizher/listener";
class TestClass extends Listener {

  constructor () {
    super()
    this.val = 0
  }

  inc () {
    this.val++
    this.fire('inc', { value: this.val })
  }

  dec () {
    this.val--
    this.fire('dec', { val: this.val })
  }

}
export default TestClass
```

```js
import TestClass from '../test-class'

const testObj = new TestClass()
let count = 0
const h = testObj.on('inc', e => {
  count++
})
testObj.on('dec', e => {
  count++
})
testObj.inc()
testObj.inc()
h.remove()
testObj.inc()
testObj.dec()

// count -> 3
```

## 类成员信息

| 成员         | 描述                   |
| ------------ | ---------------------- |
| - _eventPool | 事件池：用以存储监听集 |
| + on()       | 绑定监听函数           |
| + off()      | 接触监听函数           |
| + fire()     | 触发监听函数           |

## 另外：npm包发布更新流程

```shell
# 镜像源的切换
npm config set registry http://registry.npmjs.org/
npm config set registry https://registry.npm.taobao.org/

# 登录
npm login

# 更新
npm version 【xxx】
# patch：小变动，比如修复bug等，版本号变动 v1.0.0->v1.0.1
# minor：增加新功能，不影响现有功能,版本号变动 v1.0.0->v1.1.0
# major：破坏模块对向后的兼容性，版本号变动 v1.0.0->v2.0.0

# 发布
npm publish
npm publish --access public
```

