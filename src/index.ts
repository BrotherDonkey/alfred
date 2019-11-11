#!/usr/bin/env node

import { noInput } from "./utils";
import chalk from 'chalk';
import figlet from 'figlet';
import path from 'path';
import commander, { CommanderStatic } from 'commander';
import clear from 'clear';
import { config } from 'dotenv';
import { IProgram } from "./types";

/**
 * Load enviroment from .env
 */
config();

/**
 * Declarations
 */
const program = commander as IProgram;
let command: 'comm' | 'sec';
const { argv, env } = process;


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
		console.log(cmdLine.xtremely, { arg }, { opt }, { cmdLine })
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
		console.log(cmdLine.xtremely, { arg }, { opt }, { cmdLine })
	});

/**
 * Parse program
 */
program.parse(argv);

if (noInput(argv)) {
	clear();
	console.log(
		chalk.red(
			figlet.textSync('Hello world', {
				horizontalLayout: 'full',
				font: 'Tsalagi'
			})
		)
	);
	program.outputHelp();
}

// Normal input

if (program.xtremely) {
	console.log('Extremely');
}

if (program.withFlags) {
	console.log('Flag', program.withFlags);
}