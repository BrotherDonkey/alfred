import { IDotConfig } from "../types";
export declare function createPullRequestQuestions(env: IDotConfig): ({
    name: string;
    message: string;
    default?: undefined;
} | {
    name: string;
    message: string;
    default: string;
} | {
    name: string;
    message: string;
    default: boolean;
})[];
export declare function createWikiPromptEntris(env: IDotConfig): ({
    name: string;
    message: string;
    default?: undefined;
} | {
    name: string;
    message: string;
    default: string;
} | {
    name: string;
    message: string;
    default: boolean;
})[];
