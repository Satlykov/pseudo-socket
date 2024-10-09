import { getRandomColorInHex } from './get-color';
import { IChildData, IDataItem } from '../models/data-interfaces';

export class ChildData implements IChildData {
	constructor(
		public id: string,
		public color: string
	) {}

	static generate(size: number, index: number): ChildData {
		const id = (size + index).toString();
		const color = getRandomColorInHex();
		return new ChildData(id, color);
	}
}

export class DataItem implements IDataItem {
	constructor(
		public id: string,
		public int: number,
		public float: number,
		public color: string,
		public child: ChildData
	) {}

	static generate(size: number, index: number): DataItem {
		const id = `${index}`;
		const int = this.getInt();
		const float = this.getFloat();
		const color = getRandomColorInHex();
		const child = ChildData.generate(size, index);
		return new DataItem(id, int, float, color, child);
	}

	private static getInt() {
		return Math.floor(Math.random() * 100000000);
	}

	private static getFloat() {
		return parseFloat((Math.random() * 1000).toFixed(18));
	}
}
