#!/usr/bin/env node

import { config, DotenvConfigOptions } from 'dotenv';
import * as shell from 'shelljs';
import { createNextWeeksWikiName, getFiscalPointer } from "./time";
import commander, { CommanderStatic } from 'commander';
import { IProgram, IDotConfig, TTopLevelCommand, ListWikiPagesResponse } from './types';

/**
 * Load enviroment from .env
 */

export function wiki(program: IProgram, env: IDotConfig) {
    program
        .version('0.0.1')
        .command('wiki <action>')
        .description('create or manage a devops wiki')
        .action(async (arg, opt, cmdLine) => {
            let command: TTopLevelCommand = 'wiki';
            let subcommand = arg || 'list' || 'show-last' || 'next-week';
            // const answers = await prPrompt(createPullRequestQuestions(env));
            // console.log(answers);
            console.log('Getting a list of wikis');
            switch (arg) {
                case 'list':
                    shell.exec([`az devops wiki list`,
                        `--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
                        `--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
                    ].join(' '), (code: number, output: string) => {
                        const response: ListWikiPagesResponse = JSON.parse(output);
                        const responseNames = response.map(wiki => wiki.name);
                        console.log(responseNames);
                    });
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
                    ].join(' '), (code: number, output: string) => {
                        console.log('Code', code);
                        console.log('Output', output);
                    });
                    return;
                case 'next-week':
                    const nw = createNextWeeksWikiName();
                    shell.exec([`az devops wiki page create`,
                        `--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
                        `--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
                        `--path="${env.AZURE_DEVOPS_WIKI_TEAM_PAGE}/${nw.parentPage}/${nw.wikiName}"`,
                        `--wiki="${env.AZURE_DEVOPS_WIKI}"`,
                        `--content="content"`
                    ].join(' '), (code: number, output: string) => {
                        console.log('Code', code);
                        console.log('Output', output);
                    });
                    break;
                default:
                    break;
            }
        });
}
