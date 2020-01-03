export declare const getCurrentFiscalYear: (now: Date) => string;
export declare const getCurrentFiscalQuarter: (now: Date) => string;
export declare const getFiscalPointer: (now: Date) => string;
export declare const getNextMonday: (now: Date) => Date;
export declare const getPreviousMonday: (now: Date) => Date;
export interface WikiName {
    parentPage: string;
    wikiName: string;
}
export declare const createNextWeeksWikiName: () => WikiName;
