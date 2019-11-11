#!/usr/bin/env node

import { noInput } from "./utils";
import chalk from 'chalk';
import figlet from 'figlet';
import path from 'path';
import commander, { CommanderStatic } from 'commander';
import clear from 'clear';

interface IProgram extends CommanderStatic {
	xtremely: boolean;
	withFlags: string;
}

const program = commander as IProgram;
let command: 'comm';
const { argv } = process;

program
	.version('0.0.1')
	.command('comm <arg> [opt]')
	.description('a command')
	.option('-x, --xtremely', 'Be extreme')
	.action(function (arg, opt, cmdLine) {
		command = 'comm';
		console.log(command);
		console.log(cmdLine.xtremely, { arg }, { opt }, { cmdLine })
	});

program.parse(argv);

// console.log(program.args)
// console.log(program);
// console.log(program.xtremely);
// No args

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