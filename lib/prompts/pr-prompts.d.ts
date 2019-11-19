import { IDotConfig } from "../types";
export declare function createPullRequestQuestions(env: IDotConfig): ({
    name: string;
    message: string;
    default?: undefined;
} | {
    name: string;
    message: string;
    default: string;
})[];
