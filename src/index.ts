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

const { argv } = process;

program
	.version('0.0.1')
	.description('A starting command line program written in TypeScript')
	.option('-x, --xtremely', 'Extremely cool command')
	.option('-w, --with-flag <type>', 'With flags')
	.parse(process.argv);

console.log(program.args)
console.log(program);
console.log(program.xtremely);
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