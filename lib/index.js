#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var commander_1 = __importDefault(require("commander"));
var clear_1 = __importDefault(require("clear"));
var program = commander_1.default;
var argv = process.argv;
program
    .version('0.0.1')
    .description('A starting command line program written in TypeScript')
    .option('-x, --xtremely', 'Extremely cool command')
    .option('-w, --with-flag <type>', 'With flags')
    .parse(process.argv);
console.log(program.args);
console.log(program);
console.log(program.xtremely);
// No args
if (utils_1.noInput(argv)) {
    clear_1.default();
    console.log(chalk_1.default.red(figlet_1.default.textSync('Hello world', {
        horizontalLayout: 'full',
        font: 'Tsalagi'
    })));
    program.outputHelp();
}
// Normal input
if (program.xtremely) {
    console.log('Extremely');
}
if (program.withFlags) {
    console.log('Flag', program.withFlags);
}
