import { EventDataType } from './consts/event-data-type';
import { IDataItem } from './models/data-interfaces';
import { DataItem } from './helpers/data-factories';

let intervalId: number | null = null;
let interval: number;
let dataSize: number;

export const defaultInterval: number = 1000;
export const defaultDataSize: number = 1000;

addEventListener('message', (event: MessageEvent) => {
	if (!event.data.type) return;
	switch (event.data.type) {
		case EventDataType.Start:
			interval = defaultInterval;
			dataSize = defaultDataSize;
			startPseudoSocket();
			break;
		case EventDataType.Stop:
			stopPseudoSocket();
			break;
		case EventDataType.UpdateInterval:
			interval = event.data.interval;
			restartPseudoSocket();
			break;
		case EventDataType.UpdateDataSize:
			dataSize = event.data.dataSize;
			restartPseudoSocket();
			break;
		default:
			console.warn(`Unhandled event type: ${event.data.type}`);
	}
});

function startPseudoSocket() {
	if (intervalId === null) {
		intervalId = setInterval(() => {
			const data = generateData(dataSize);
			postMessage({ type: 'data', data });
		}, interval);
	}
}

function stopPseudoSocket() {
	if (intervalId !== null) {
		clearInterval(intervalId);
		intervalId = null;
	}
}

function restartPseudoSocket() {
	stopPseudoSocket();
	startPseudoSocket();
}

function generateData(size: number): Array<IDataItem> {
	return Array.from({ length: size }, (_, index) =>
		DataItem.generate(size, index)
	);
}
