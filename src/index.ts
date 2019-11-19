#!/usr/bin/env node

import { noInput } from "./utils";
import chalk from 'chalk';
import figlet from 'figlet';
import path from 'path';
import commander, { CommanderStatic } from 'commander';
import clear from 'clear';
import { config } from 'dotenv';
import { IProgram, IDotConfig } from "./types";
import { fonts } from "./fonts";
import * as inquirer from 'inquirer';
import { createPullRequestQuestions } from "./prompts/pr-prompts";
import * as shell from 'shelljs';

/**
 * Load enviroment from .env
 */
config();

/**
 * Declarations
 */
const program = commander as IProgram;
let command: 'comm' | 'pull-request';
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
 * Second command
 */
program
	.version('0.0.1')
	.command('pr')
	.description('a second command')
	.action(async (arg, opt, cmdLine) => {
		const prPrompt = inquirer.createPromptModule();
		command = 'pull-request'
		const answers = await prPrompt(createPullRequestQuestions(env));

		console.log(answers);
		console.log('Creating your pull request');
		shell.exec([`az repos pr create`,
		`--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
		`--project="${env.DEFAULT_AZURE_DEVOPS_PROJECT}"`,
		`--repository="${env.DEFAULT_AZURE_DEVOPS_REPO}"`,
		`--title="${answers.prName}"`,
		`--description="${answers.prDescription}"`,
		`--draft="true"`,
		`--target-branch="${answers.target || env.DEFAULT_AZURE_DEVOPS_PROJECT}"`,
		`--source-branch="${answers.sourceBranch}"`,
		`--open`].join(' '),
		(code: number, output: string) => {
				console.log('Code', code);
				console.log('Output', output);
			})
	});

/**
 * Parse program
 */
program.parse(argv);

if (noInput(argv)) {
	clear();
	console.log(
		chalk.magentaBright(
			figlet.textSync('Jarvis', {
				horizontalLayout: 'full',
				font: 'ANSI Shadow' // Calvin S, ANSI Shadow
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
