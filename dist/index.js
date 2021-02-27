/**
 * 事件监听类
 * @example
 *
 * class TestClass extends Listener {
 *
 *   constructor () {
 *     super()
 *     this.val = 0
 *   }
 *
 *   inc () {
 *     this.val++
 *     this.fire('inc', { value: this.val })
 *   }
 *
 *   dec () {
 *     this.val--
 *     this.fire('dec', { val: this.val })
 *   }
 *
 * }
 *
 * // in d.ts
 * export default class extends Listener<{
 *   'inc': { value: number },
 *   'dec': { val: number },
 * }> {
 *   inc () : void
 *   dec () : void
 * }
 *
 * // in test
 * const testObj = new TestClass()
 * let count = 0
 * const h = testObj.on('inc', e => {
 *   count++
 * })
 * testObj.on('dec', e => {
 *   count++
 * })
 * testObj.inc()
 * testObj.inc()
 * h.remove()
 * testObj.inc()
 * testObj.dec()
 * expect(count).toBe(3)
 *
 */
export class Listener {
    constructor() {
        /**
         * 事件池
         * @private
         */
        this._eventPool = new Map();
    }
    /**
     * 绑定监听
     * @param name 监听名
     * @param fn 监听处理函数
     */
    on(name, fn) {
        const _name = name.toLowerCase();
        const eventPool = this._eventPool;
        if (!eventPool.has(_name)) {
            eventPool.set(_name, []);
        }
        eventPool.get(_name).push([fn]);
        const remove = () => {
            this.off(name, fn);
        };
        return {
            remove
        };
    }
    /**
     * 接触监听
     * @param name 监听名
     * @param fn 监听处理函数
     */
    off(name, fn) {
        const _name = name.toLowerCase();
        const eventArr = this._eventPool.get(_name);
        if (!eventArr || eventArr.length === 0) {
            return;
        }
        if (fn) {
            for (let i = 0; i < eventArr.length; i++) {
                if (fn === eventArr[i][0]) {
                    eventArr.splice(i, 1);
                    i--; // 可能存在一个事件一个函数绑定多次的情况
                }
            }
        }
        else {
            eventArr.splice(0, eventArr.length);
        }
    }
    fire(name, data) {
        const _name = name.toLowerCase();
        const eventArr = this._eventPool.get(_name);
        if (eventArr) {
            const event = Object.assign({
                name,
                _origin: this, // 绑定的源
            }, data || {});
            let len = eventArr.length;
            for (let i = 0; i < eventArr.length; i++) {
                const item = eventArr[i];
                let fn = item[0];
                fn(event);
                if (eventArr.length < len) {
                    i--;
                    len = eventArr.length;
                }
            }
        }
    }
}
export default Listener;
