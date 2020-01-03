#!/usr/bin/env node

import * as shell from 'shelljs';
import { createNextWeeksWikiName, getFiscalPointer, WikiName } from "./time";
import { IDotConfig, IProgram, ListWikiPagesResponse, TTopLevelCommand, WikiPageCreateResponse, ShowPageResponse, WikiPageInfo } from './types';
import chalk = require('chalk');
import figlet from 'figlet';
import { jarvisSays, jarvisLogs } from './jarvis-says';
import { writeFile, writeFileSync } from 'fs';

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
                    const existingFYPageContent = (content?: string) => content ? content : '';
                    // todo: append content
                    const templateFilePath = './FYTemplate.md';
                    shell.exec([`az devops wiki page show`,
                        `--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
                        `--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
                        `--path="${env.AZURE_DEVOPS_WIKI_TEAM_PAGE}/${nw.parentPage}"`,
                        `--wiki="${env.AZURE_DEVOPS_WIKI}"`,
                        `--include-content`
                    ].join(' '), (code: number, output: string) => {
                        let response: ShowPageResponse | null = null;
                        try {
                            response = JSON.parse(output);
                        } catch {
                            jarvisLogs('No Fiscal Year page, creating one');
                        }
                        if (!response) {
                            const newContent = `${existingFYPageContent()}\n- [${nw.wikiName}](https://dev.azure.com/ceapex/Engineering/_wiki/wikis/Engineering.wiki/${nw.parentPage}${nw.wikiName})`;
                            writeFileSync(templateFilePath, newContent);
                            response = createNewFiscalYearPage(env, nw, templateFilePath, response, () => createNewWeekPage(env, nw));
                        } else {
                            const { eTag, page: { content } } = response;
                            const updatedContent = `${existingFYPageContent(content)}\n- [${nw.wikiName}](https://dev.azure.com/ceapex/Engineering/_wiki/wikis/Engineering.wiki/${nw.parentPage}/${nw.wikiName})`;
                            writeFileSync(templateFilePath, updatedContent);
                            updateFiscalYearPage(env, nw, eTag, templateFilePath, () => createNewWeekPage(env, nw));
                        }
                    })
                    break;
                default:
                    break;
            }
        });
}

function updateFiscalYearPage(env: IDotConfig, nw: WikiName, eTag: string, templateFilePath: string, cb: Function = () => { }) {
    shell.exec([`az devops wiki page update`,
        `--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
        `--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
        `--path="${env.AZURE_DEVOPS_WIKI_TEAM_PAGE}/${nw.parentPage}"`,
        `--wiki="${env.AZURE_DEVOPS_WIKI}"`,
        `--version="${eTag}"`,
        `--file-path="${templateFilePath}"`,
    ].join(' '), (code: number, output: string) => {
        jarvisLogs(chalk.white('Updated wiki page with new link'));
        cb();
    });
}

function createNewFiscalYearPage(env: IDotConfig, nw: WikiName, templateFilePath: string, response: ShowPageResponse | null, cb: Function = () => { }) {
    shell.exec([`az devops wiki page create`,
        `--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
        `--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
        `--path="${env.AZURE_DEVOPS_WIKI_TEAM_PAGE}/${nw.parentPage}"`,
        `--wiki="${env.AZURE_DEVOPS_WIKI}"`,
        `--file-path="${templateFilePath}"`,
    ].join(' '), (code: number, output: string) => {
        response = JSON.parse(output);
        jarvisLogs([
            'Created Fiscal Year page',
            chalk.greenBright((response as ShowPageResponse).page.remoteUrl),
            `${env.AZURE_DEVOPS_WIKI_TEAM_PAGE}/${nw.parentPage}`
        ]);
        cb();
    });
    return response;
}

function createNewWeekPage(env: IDotConfig, nw: WikiName, cb = () => { }) {
    shell.exec([`az devops wiki page create`,
        `--organization="${env.DEFAULT_AZURE_DEVOPS_ORGANIZATION}"`,
        `--project="${env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID}"`,
        `--path="${env.AZURE_DEVOPS_WIKI_TEAM_PAGE}/${nw.parentPage}/${nw.wikiName}"`,
        `--wiki="${env.AZURE_DEVOPS_WIKI}"`,
        `--content="content"`
    ].join(' '), (code: number, output: string) => {
        let response: WikiPageCreateResponse | null = null;
        try {
            response = JSON.parse(output)
        } catch {
            jarvisSays();
            jarvisLogs([
                'Error Page already exists.',
            ]);
            return;
        }
        const { page } = response as WikiPageCreateResponse;
        jarvisSays();
        jarvisLogs([
            'Page created: ',
            chalk.greenBright(page.remoteUrl),
            `${env.AZURE_DEVOPS_WIKI_TEAM_PAGE}/${nw.parentPage}/${nw.wikiName}`
        ]);
        cb();
    });
}

