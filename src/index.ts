#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import commander from 'commander';
import { config } from 'dotenv';
import figlet from 'figlet';
import * as inquirer from 'inquirer';
import * as shell from 'shelljs';
import { createPullRequestQuestions } from "./prompts/pr-prompts";
import { IDotConfig, IProgram, TTopLevelCommand } from "./types";
import { noInput } from "./utils";
import { wiki } from "./wiki";
import { pullRequest } from './pull-request';

/**
 * Load enviroment from .env
 */
config();

/**
 * Declarations
 */
export const program = commander as IProgram;
const argv = process.argv;
const env = <IDotConfig><unknown>process.env;

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
wiki(program, env);

/**
 * Create a pull request
 */
pullRequest(program, env);

// Normal input

if (program.xtremely) {
	console.log('Extremely');
}

if (program.withFlags) {
	console.log('Flag', program.withFlags);
}

/**
 * Parse program
 */
program.parse(argv);
if (noInput(argv)) {
	clear();
	console.log(chalk.magentaBright(figlet.textSync('Jarvis', {
		horizontalLayout: 'full',
		font: 'ANSI Shadow' // Calvin S, ANSI Shadow
	})));
	program.outputHelp();
}