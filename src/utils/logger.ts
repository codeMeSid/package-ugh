import Chalk from "chalk";

const log = console.log;

export const infolog = (message: any) => log(Chalk.bgBlue.bold(message));
export const errorlog = (message: any) => log(Chalk.white.bgRed.bold(message));
export const warnlog = (message: any) => log(Chalk.bgYellow.bold(message));
export const successlog = (message: any) => log(Chalk.bgGreen.bold(message));
