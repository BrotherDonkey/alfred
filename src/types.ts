import { CommanderStatic } from "commander";
import { DotenvConfigOutput } from "dotenv/types";

export interface IProgram extends CommanderStatic {
	xtremely: boolean;
	withFlags: string;
}

export interface IDotConfig extends DotenvConfigOutput {
	DEFAULT_AZURE_DEVOPS_REPO: string;
	DEFAULT_AZURE_DEVOPS_ORGANIZATION: string;
	DEFAULT_AZURE_DEVOPS_PROJECT: string;
	DEFAULT_AZURE_DEVOPS_TARGET: string;
	COMMENT: string;
}