"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var figlet_1 = __importDefault(require("figlet"));
function jarvisSays() {
    console.log(chalk.redBright(figlet_1.default.textSync('Jarvis says', 'Cybermedium')));
}
exports.jarvisSays = jarvisSays;
function jarvisLogs() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log(chalk.blueBright(args));
}
exports.jarvisLogs = jarvisLogs;
