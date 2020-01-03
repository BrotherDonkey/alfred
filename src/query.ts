import * as shell from 'shelljs';
import { createPullRequestQuestions } from "./prompts/pr-prompts";
import { IDotConfig, IProgram, TTopLevelCommand } from "./types";
import inquirer = require("inquirer");
import { jarvisSays } from './jarvis-says';


export function query(program: IProgram, env: IDotConfig) {
    const wiflQ = `SELECT [System.Id], [System.WorkItemType], [System.Title], [System.AssignedTo], [System.State], [System.Tags] FROM workitems WHERE [System.TeamProject] = @project AND [System.WorkItemType] <> '' AND [System.Tags] CONTAINS '1216' AND [System.AreaPath] = 'Engineering\\Teams\\UXE\\Fox 🦊' ORDER BY [System.AssignedTo]`;
    program
        .version('0.0.1')
        .command('query')
        .description('get a query')
        .action(async (arg, opt, cmdLine) => {
            const prPrompt = inquirer.createPromptModule();
            let command: string = 'query';
            console.log('Getting a query');

            shell.exec([`az boards query`,
                `--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
                `--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
                `--wiql="${wiflQ}"
                `,
                // `--id="${'cd05c07d-89f7-4027-b9fd-a1c4e637729f'}"`,
            ].join(' '), (code: number, output: string) => {
                console.log('Code', code);
                jarvisSays();
                console.log('Output', output);
            });
        });
}
