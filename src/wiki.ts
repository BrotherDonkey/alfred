#!/usr/bin/env node

import * as shell from 'shelljs';
import { createNextWeeksWikiName, getFiscalPointer } from "./time";
import { IDotConfig, IProgram, ListWikiPagesResponse, TTopLevelCommand } from './types';
import chalk = require('chalk');
import figlet from 'figlet';

/**
 * Load enviroment from .env
 */

export function wiki(program: IProgram, env: IDotConfig) {
    program
        .version('0.0.1')
        .command('wiki <action>')
        .description('create or manage a devops wiki')
        .action(async (arg, opt, cmdLine) => {
            const command: TTopLevelCommand = 'wiki';
            const subcommand = arg || 'list' || 'show-last' || 'next-week';

            console.log('Getting a list of wikis');
            switch (arg) {
                case 'list':
                    shell.exec([`az devops wiki list`,
                        `--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
                        `--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
                    ].join(' '), (code: number, output: string) => {
                        const response: ListWikiPagesResponse = JSON.parse(output);
                        const responseNames = response.map(wiki => wiki.name);
                        jarvisSays();
                        console.log(chalk.blueBright(responseNames.join('\n')));
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
function jarvisSays() {
    console.log(chalk.redBright(figlet.textSync('Jarvis says', 'Cybermedium')));
}

