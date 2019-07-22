// 节流函数
/* 
func:需要节流的函数
wait:指定时间内函数只执行一次
函数返回节流函数的函数版本
*/

export const throttle = (func, wait) => {
    let context, args, prevArgs, argsChanged, result;
    let previous = 0;
    return function () {
        let now, remaining;
        if (wait) {
            now = Date.now();
            remaining = wait - (now - previous)
        }
        context = this;
        args = arguments;
        argsChanged = JSON.stringify(args) != JSON.stringify(prevArgs)
        prevArgs = [...args];
        if (argsChanged || wait && (remaining <= 0 || remaining > wait)) {
            if (wait) {
                previous = now;
            }
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    }
}