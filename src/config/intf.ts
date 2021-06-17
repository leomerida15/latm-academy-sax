// lang
export interface lang {
	es: {
		name: string;
		description: string;
	};
	en: {
		name: string;
		description: string;
	};
}
export interface AcSelect extends lang {
	_id: string;
}

export interface Academy extends lang {
	_id: string;
	style: any;
}
