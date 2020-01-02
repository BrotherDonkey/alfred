#!/usr/bin/env node

import * as inquirer from 'inquirer';
import * as shell from 'shelljs';
import { createPullRequestQuestions } from "./prompts/pr-prompts";
import { IDotConfig, IProgram, TTopLevelCommand } from "./types";


export function pullRequest(program: IProgram, env: IDotConfig) {
    program
        .version('0.0.1')
        .command('pr')
        .description('create a new pull request')
        .action(async (arg, opt, cmdLine) => {
            const prPrompt = inquirer.createPromptModule();
            let command: TTopLevelCommand = 'pull-request';
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
                `--open`].join(' '), (code: number, output: string) => {
                    console.log('Code', code);
                    console.log('Output', output);
                });
        });
}
