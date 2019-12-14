"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentFiscalYear = function (now) {
    var currentMonth = now.getMonth();
    var currentYear = now.getFullYear();
    if (currentMonth > 3) {
        var nextYear = (currentYear + 1).toString();
        return "FY" + nextYear.charAt(2) + nextYear.charAt(3);
    }
    return "FY" + currentYear.toString().charAt(2) + currentYear.toString().charAt(3);
};
exports.getCurrentFiscalQuarter = function (now) {
    var calendarQuarter = Math.floor(now.getMonth() / 3) + 3;
    var fiscalQuarter = (calendarQuarter > 4 ? calendarQuarter - 4 : calendarQuarter).toString();
    return "Q" + fiscalQuarter;
};
exports.getFiscalPointer = function (now) {
    return "" + exports.getCurrentFiscalYear(now) + exports.getCurrentFiscalQuarter(now);
};
exports.getNextMonday = function (now) {
    var currentDay = now.getDay();
    var difference = Math.abs(currentDay) - 2;
    var nextMonday = now.setDate(now.getDate() + difference);
    var nMD = new Date(nextMonday);
    return nMD;
};
exports.getPreviousMonday = function (now) {
    var currentDay = now.getDay();
    var difference = Math.abs(currentDay) - 1;
    var previousMonday = now.setDate(now.getDate() - difference);
    var nMD = new Date(previousMonday);
    return nMD;
};
exports.createNextWeeksWikiName = function () {
    var now = new Date();
    var nextMonday = exports.getNextMonday(now);
    // 🦊 // FY20Q2 // MM-DD-YYYY
    var month = nextMonday.getMonth().toString().length === 1 ? "0" + (nextMonday.getMonth() + 1) : nextMonday.getMonth() + 1;
    var day = (nextMonday.getDate().toString().length === 1 ? "0" + nextMonday.getDate() : nextMonday.getDate());
    var year = nextMonday.getFullYear();
    return {
        parentPage: exports.getFiscalPointer(nextMonday),
        wikiName: month + "-" + day + "-" + year
    };
};
