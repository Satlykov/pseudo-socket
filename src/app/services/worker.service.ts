import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EventDataType } from '../consts/event-data-type';
import { IDataItem } from '../models/data-interfaces';

@Injectable({
	providedIn: 'root',
})
export class WorkerService {
	private worker: Worker;
	public dataSubject = new Subject<Array<IDataItem>>();

	constructor() {
		this.worker = new Worker(
			new URL('../pseudo-socket.worker', import.meta.url),
			{
				type: 'module',
			}
		);
		this.worker.onerror = error => {
			console.error('Worker error:', error);
		};
		this.worker.onmessage = ({ data }) => {
			if (data.type === 'data') {
				this.dataSubject.next(data.data);
			}
		};
	}

	public startWorker() {
		this.worker.postMessage({ type: EventDataType.Start });
	}

	public stopWorker() {
		this.worker.postMessage({ type: EventDataType.Stop });
	}

	public updateInterval(interval: number) {
		this.worker.postMessage({ type: EventDataType.UpdateInterval, interval });
	}

	public updateDataSize(dataSize: number) {
		this.worker.postMessage({ type: EventDataType.UpdateDataSize, dataSize });
	}
}
