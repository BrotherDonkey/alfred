import { CommanderStatic } from "commander";

export interface IProgram extends CommanderStatic {
	xtremely: boolean;
	withFlags: string;
}