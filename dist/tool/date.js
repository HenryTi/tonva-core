"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFromMinuteId = exports.miniSecondsOf2020_01_01 = exports.toLocaleDateString = void 0;
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
function toLocaleDateString(date) {
    if (!date)
        return '';
    return date.toLocaleDateString('zh-cn', options);
}
exports.toLocaleDateString = toLocaleDateString;
exports.miniSecondsOf2020_01_01 = 26297280 * 60000; // 2020-1-1 到 1970-1-1 的毫秒数
function dateFromMinuteId(id, timeZone) {
    var m = (id / Math.pow(2, 20));
    if (timeZone !== undefined)
        m += timeZone * 60;
    return new Date(m * 60000 + exports.miniSecondsOf2020_01_01);
}
exports.dateFromMinuteId = dateFromMinuteId;
//# sourceMappingURL=date.js.map