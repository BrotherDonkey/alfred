import { IDotConfig } from "../types";

export function createPullRequestQuestions(env: IDotConfig) {
    return [
        {
            name: 'sourceBranch',
            message: `What's the name of your source branch? [The branch with your changes]`,
        },
        {
            name: 'targetBranch',
            message: `What's the name of your target branch? [The branch your want to push your changes to]`,
            default: env.DEFAULT_AZURE_DEVOPS_TARGET
        },
        {
            name: 'draft',
            message: 'Would you like to create this pull request as a draft?',
            default: false
        },
        {
            message: `What's the name of your Pull Request?`,
            name: 'prName'
        },
        {
            default: env.DEFAULT_AZURE_DEVOPS_REPO,
            message: `Describe your pull request.`,
            name: 'prDescription'
        },
    ];
}

export function createWikiPromptEntris(env: IDotConfig) {
    return [
        {
            name: 'sourceBranch',
            message: `What's the name of your source branch? [The branch with your changes]`,
        },
        {
            name: 'targetBranch',
            message: `What's the name of your target branch? [The branch your want to push your changes to]`,
            default: env.DEFAULT_AZURE_DEVOPS_TARGET
        },
        {
            name: 'draft',
            message: 'Would you like to create this pull request as a draft?',
            default: false
        },
        {
            message: `What's the name of your Pull Request?`,
            name: 'prName'
        },
        {
            default: env.DEFAULT_AZURE_DEVOPS_REPO,
            message: `Describe your pull request.`,
            name: 'prDescription'
        },
    ];
}