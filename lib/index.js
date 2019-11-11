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
var dotenv_1 = require("dotenv");
/**
 * Load enviroment from .env
 */
dotenv_1.config();
/**
 * Declarations
 */
var program = commander_1.default;
var command;
var argv = process.argv, env = process.env;
/**
 * Comm command
 */
program
    .version('0.0.1')
    .command('comm <arg> [opt]')
    .description('a command')
    .option('-x, --xtremely', 'Be extreme')
    .action(function (arg, opt, cmdLine) {
    command = 'comm';
    console.log(command);
    console.log(cmdLine.xtremely, { arg: arg }, { opt: opt }, { cmdLine: cmdLine });
    console.log(env.COMMENT);
});
/**
 * Second command
 */
program
    .version('0.0.1')
    .command('sec <arg> [opt]')
    .description('a second command')
    .option('-x, --xtremely', 'Be extreme')
    .action(function (arg, opt, cmdLine) {
    command = 'sec';
    console.log(command);
    console.log(cmdLine.xtremely, { arg: arg }, { opt: opt }, { cmdLine: cmdLine });
});
/**
 * Parse program
 */
program.parse(argv);
if (utils_1.noInput(argv)) {
    clear_1.default();
    console.log(chalk_1.default.magentaBright(figlet_1.default.textSync('Jarvis', {
        horizontalLayout: 'full',
        font: 'ANSI Shadow' // Calvin S, ANSI Shadow
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
