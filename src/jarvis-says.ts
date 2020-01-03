import chalk = require("chalk");
import figlet from "figlet";

export function jarvisSays() {
    console.log(chalk.redBright(figlet.textSync('Jarvis says', 'Cybermedium')));
}

export function jarvisLogs(...args: any | any[]) {
    console.log(chalk.blueBright(args));
}