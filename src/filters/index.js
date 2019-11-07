
/*
    时间戳转换
    format:Y年M月D日 h:m:s  Y-M-D h:m:s
*/
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n;
}
export function formartTime(number, format) {
    let time = new Date(number)
    let newArr = []
    let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
    newArr.push(time.getFullYear())
    newArr.push(formatNumber(time.getMonth() + 1))
    newArr.push(formatNumber(time.getDate()))

    newArr.push(formatNumber(time.getHours()))
    newArr.push(formatNumber(time.getMinutes()))
    newArr.push(formatNumber(time.getSeconds()))

    for (let i in newArr) {
        format = format.replace(formatArr[i], newArr[i])
    }
    return format;
}

/**
 * 状态转换
 */
export function changeStatus(val) {
    switch (val) {
        case 0:
            return "成功";
        case 3:
            return "失败";
        default:
            return val;
    }
}