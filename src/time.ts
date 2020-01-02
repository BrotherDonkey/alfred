export const getCurrentFiscalYear = (now: Date): string => {
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();

	if (currentMonth > 3) {
		const nextYear = (currentYear + 1).toString();
		return `FY${nextYear.charAt(2)}${nextYear.charAt(3)}`
	}

	return `FY${currentYear.toString().charAt(2)}${currentYear.toString().charAt(3)}`
}

export const getCurrentFiscalQuarter = (now: Date): string => {
	const calendarQuarter = Math.floor(now.getMonth() / 3) + 3;
	const fiscalQuarter = (calendarQuarter > 4 ? calendarQuarter - 4 : calendarQuarter).toString();
	return `Q${fiscalQuarter}`;
}

export const getFiscalPointer = (now: Date): string => {
	return `${getCurrentFiscalYear(now)}${getCurrentFiscalQuarter(now)}`;
};

export const getNextMonday = (now: Date) => {
	const currentDay = now.getDay();
	const difference = Math.abs(currentDay) - 2;
	const nextMonday = now.setDate(now.getDate() + difference);
	const nMD = new Date(nextMonday);
	return nMD;
}

export const getPreviousMonday = (now: Date) => {
	const currentDay = now.getDay();
	const difference = Math.abs(currentDay) - 1;
	const previousMonday = now.setDate(now.getDate() - difference);
	const nMD = new Date(previousMonday);
	return nMD;
}

interface WikiName {
	parentPage: string;
	wikiName: string;
}

export const createNextWeeksWikiName = (): WikiName => {
	const now = new Date();
	const nextMonday = getNextMonday(now);
	// 🦊 // FY20Q2 // MM-DD-YYYY
	const month = nextMonday.getMonth().toString().length === 1 ? `0${nextMonday.getMonth() + 1}` : nextMonday.getMonth() + 1;
	const day = (nextMonday.getDate().toString().length === 1 ? `0${nextMonday.getDate()}` : nextMonday.getDate());
	const year = nextMonday.getFullYear();
	return {
		parentPage: getFiscalPointer(nextMonday),
		wikiName: `${month}-${day}-${year}`
	}
};