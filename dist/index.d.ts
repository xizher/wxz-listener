/**
 * 对象接口
 */
export interface IObject {
    [key: string]: IObject;
}
/**
 * 基础监听回调接口
 */
export interface IListenerCallback {
    /**
     * 监听名
     */
    name: string;
}
/**
 * 监听类型接口
 */
/**
 * 监听处理接口
 */
export interface IListenHandler {
    /**
     * 移除监听函数
     */
    remove(): void;
}
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
export declare class Listener<T> {
    /**
     * 事件池
     * @private
     */
    private _eventPool;
    /**
     * 绑定监听
     * @param name 监听名
     * @param fn 监听处理函数
     */
    on<K extends keyof T>(name: K, fn: {
        (e: IListenerCallback & T[K]): void;
    }): IListenHandler;
    /**
     * 接触监听
     * @param name 监听名
     * @param fn 监听处理函数
     */
    off<K extends keyof T>(name: K, fn?: {
        (e: IListenerCallback & T[K]): void;
    }): void;
    fire<K extends keyof T>(name: K, data?: T[K]): void;
}
export default Listener;
