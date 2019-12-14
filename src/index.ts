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
import { getFiscalPointer, createNextWeeksWikiName } from "./time";

/**
 * Load enviroment from .env
 */
config();

/**
 * Declarations
 */
const program = commander as IProgram;
let command: 'wiki' | 'pull-request';
let subcommand: 'create' | 'list';
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
program
	.version('0.0.1')
	.command('wiki <action>')
	.description('create or manage a devops wiki')
	.action(async (arg, opt, cmdLine) => {
		command = 'wiki'
		subcommand = arg || 'list' || 'show-last' || 'next-week';

		// const answers = await prPrompt(createPullRequestQuestions(env));

		// console.log(answers);
		console.log('Getting a list of wikis');
		switch (arg) {
			case 'list':
				shell.exec([`az devops wiki list`,
				`--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
				`--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
			].join(' '),
				(code: number, output: string) => {
						console.log('Code', code);	
						console.log('Output', output);
					})
					return;
				break;
				case undefined:
					program.outputHelp();
			case 'show-last':
					shell.exec([`az devops wiki page show`,
					`--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
					`--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
					`--path="${env.AZURE_DEVOPS_WIKI_TEAM_PAGE}/${getFiscalPointer(new Date())}"`,
					`--wiki="${env.AZURE_DEVOPS_WIKI}"`
				].join(' '),
					(code: number, output: string) => {
							console.log('Code', code);
							console.log('Output', output);
						})
						return;
				case 'next-week':
						const nw = createNextWeeksWikiName()
						shell.exec([`az devops wiki page create`,
						`--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
						`--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
						`--path="${env.AZURE_DEVOPS_WIKI_TEAM_PAGE}/${nw.parentPage}/${nw.wikiName}"`,
						`--wiki="${env.AZURE_DEVOPS_WIKI}"`,
						`--content="content"`
					].join(' '),
						(code: number, output: string) => {
								console.log('Code', code);
								console.log('Output', output);
							})
					break;
			default:
				break;
		}
		
	});

/**
 * Create a pull request
 */
program
	.version('0.0.1')
	.command('pr')
	.description('create a new pull request')
	.action(async (arg, opt, cmdLine) => {
		const prPrompt = inquirer.createPromptModule();
		command = 'pull-request'
		const answers = await prPrompt(createPullRequestQuestions(env));

		console.log('Creating your pull request');
		shell.exec([`az repos pr create`,
		`--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
		`--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
		`--repository="${env.DEFAULT_AZURE_DEVOPS_REPO}"`,
		`--title="${answers.prName}"`,
		`--description="${answers.prDescription}"`,
		`--draft="true"`,
		`--target-branch "${answers.targetBranch || env.DEFAULT_AZURE_DEVOPS_PROJECT}"`,
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

export const getNextMonday = (now: Date) => {
	return now.setDate(now.getDate() + 1);
}