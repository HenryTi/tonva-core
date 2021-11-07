"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFromHourId = exports.dateFromMinuteId = exports.minute2020_01_01 = exports.toLocaleDateString = void 0;
var _1 = require(".");
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
exports.minute2020_01_01 = 26297280; // 2020-1-1 到 1970-1-1 的毫秒数
function dateFromMinuteId(id, timeZone) {
    var envTimezone = _1.env.timeZone;
    var m = (id / Math.pow(2, 20)) + (-envTimezone + (timeZone !== null && timeZone !== void 0 ? timeZone : envTimezone)) * 60;
    return new Date((m + exports.minute2020_01_01) * 60000);
}
exports.dateFromMinuteId = dateFromMinuteId;
function dateFromHourId(id, timeZone) {
    var envTimezone = _1.env.timeZone;
    var m = id + (-envTimezone + (timeZone !== null && timeZone !== void 0 ? timeZone : envTimezone));
    return new Date((m + exports.minute2020_01_01 / 60) * 60 * 60000);
}
exports.dateFromHourId = dateFromHourId;
//# sourceMappingURL=date.js.map