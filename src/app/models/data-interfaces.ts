export interface IChildData {
	id: string;
	color: string;
}

export interface IDataItem {
	id: string;
	int: number;
	float: number;
	color: string;
	child: IChildData;
}
