#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var commander_1 = __importDefault(require("commander"));
var dotenv_1 = require("dotenv");
var figlet_1 = __importDefault(require("figlet"));
var pull_request_1 = require("./pull-request");
var utils_1 = require("./utils");
var wiki_1 = require("./wiki");
/**
 * Load enviroment from .env
 */
dotenv_1.config();
/**
 * Declarations
 */
exports.program = commander_1.default;
var argv = process.argv;
var env = process.env;
// /**
//  * Comm command
//  */
// program
// 	.version('0.0.1')
// 	.command('start-pr <arg> [opt]')
// 	.description('a command')
// 	.option('-x, --xtremely', 'Be extreme')
// 	.action(function (arg, opt, cmdLine) {
// 		command = 'comm';
// 		console.log(command);
// 		console.log(cmdLine.xtremely, { arg }, { opt }, { cmdLine })
// 		console.log(env.COMMENT);
// 	});
/**
 * Create or edit a wiki
 */
wiki_1.wiki(exports.program, env);
/**
 * Create a pull request
 */
pull_request_1.pullRequest(exports.program, env);
// Normal input
if (exports.program.xtremely) {
    console.log('Extremely');
}
if (exports.program.withFlags) {
    console.log('Flag', exports.program.withFlags);
}
/**
 * Parse program
 */
exports.program.parse(argv);
if (utils_1.noInput(argv)) {
    clear_1.default();
    console.log(chalk_1.default.magentaBright(figlet_1.default.textSync('Jarvis', {
        horizontalLayout: 'full',
        font: 'ANSI Shadow' // Calvin S, ANSI Shadow
    })));
    exports.program.outputHelp();
}
