#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var commander_1 = __importDefault(require("commander"));
var clear_1 = __importDefault(require("clear"));
var dotenv_1 = require("dotenv");
var inquirer = __importStar(require("inquirer"));
var pr_prompts_1 = require("./prompts/pr-prompts");
var shell = __importStar(require("shelljs"));
var time_1 = require("./time");
/**
 * Load enviroment from .env
 */
dotenv_1.config();
/**
 * Declarations
 */
var program = commander_1.default;
var command;
var subcommand;
var argv = process.argv;
var env = process.env;
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
    .action(function (arg, opt, cmdLine) { return __awaiter(void 0, void 0, void 0, function () {
    var nw;
    return __generator(this, function (_a) {
        command = 'wiki';
        subcommand = arg || 'list' || 'show-last' || 'next-week';
        // const answers = await prPrompt(createPullRequestQuestions(env));
        // console.log(answers);
        console.log('Getting a list of wikis');
        switch (arg) {
            case 'list':
                shell.exec(["az devops wiki list",
                    "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
                    "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
                ].join(' '), function (code, output) {
                    console.log('Code', code);
                    console.log('Output', output);
                });
                return [2 /*return*/];
                break;
            case undefined:
                program.outputHelp();
            case 'show-last':
                shell.exec(["az devops wiki page show",
                    "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
                    "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
                    "--path=\"" + env.AZURE_DEVOPS_WIKI_TEAM_PAGE + "/" + time_1.getFiscalPointer(new Date()) + "\"",
                    "--wiki=\"" + env.AZURE_DEVOPS_WIKI + "\""
                ].join(' '), function (code, output) {
                    console.log('Code', code);
                    console.log('Output', output);
                });
                return [2 /*return*/];
            case 'next-week':
                nw = time_1.createNextWeeksWikiName();
                shell.exec(["az devops wiki page create",
                    "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
                    "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
                    "--path=\"" + env.AZURE_DEVOPS_WIKI_TEAM_PAGE + "/" + nw.parentPage + "/" + nw.wikiName + "\"",
                    "--wiki=\"" + env.AZURE_DEVOPS_WIKI + "\"",
                    "--content=\"content\""
                ].join(' '), function (code, output) {
                    console.log('Code', code);
                    console.log('Output', output);
                });
                break;
            default:
                break;
        }
        return [2 /*return*/];
    });
}); });
/**
 * Create a pull request
 */
program
    .version('0.0.1')
    .command('pr')
    .description('create a new pull request')
    .action(function (arg, opt, cmdLine) { return __awaiter(void 0, void 0, void 0, function () {
    var prPrompt, answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prPrompt = inquirer.createPromptModule();
                command = 'pull-request';
                return [4 /*yield*/, prPrompt(pr_prompts_1.createPullRequestQuestions(env))];
            case 1:
                answers = _a.sent();
                console.log('Creating your pull request');
                shell.exec(["az repos pr create",
                    "--organization=\"" + env.DEFAULT_AZURE_DEVOPS_ORGANIZATION + "\"",
                    "--project=\"" + env.AZURE_DEVOPS_ENGINEERING_PROJECT_ID + "\"",
                    "--repository=\"" + env.DEFAULT_AZURE_DEVOPS_REPO + "\"",
                    "--title=\"" + answers.prName + "\"",
                    "--description=\"" + answers.prDescription + "\"",
                    "--draft=\"true\"",
                    "--target-branch \"" + (answers.targetBranch || env.DEFAULT_AZURE_DEVOPS_PROJECT) + "\"",
                    "--source-branch=\"" + answers.sourceBranch + "\"",
                    "--open"].join(' '), function (code, output) {
                    console.log('Code', code);
                    console.log('Output', output);
                });
                return [2 /*return*/];
        }
    });
}); });
/**
 * Parse program
 */
program.parse(argv);
if (utils_1.noInput(argv)) {
    clear_1.default();
    console.log(chalk_1.default.magentaBright(figlet_1.default.textSync('Jarvis', {
        horizontalLayout: 'full',
        font: 'ANSI Shadow' // Calvin S, ANSI Shadow
    })));
    program.outputHelp();
}
// Normal input
if (program.xtremely) {
    console.log('Extremely');
}
if (program.withFlags) {
    console.log('Flag', program.withFlags);
}
exports.getNextMonday = function (now) {
    return now.setDate(now.getDate() + 1);
};
