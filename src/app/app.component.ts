import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { IDataItem } from './models/data-interfaces';
import { WorkerService } from './services/worker.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'pseudo-socket';

	public displayedData: Array<IDataItem> = [];
	public additionalIds: Array<string> = [];

	constructor(
		private workerService: WorkerService,
		private cdr: ChangeDetectorRef
	) {}

	public ngOnInit(): void {
		this.workerService.dataSubject.subscribe(data => {
			this.processIncomingData(data);
			this.cdr.detectChanges();
		});
		this.workerService.startWorker();
	}

	public ngOnDestroy(): void {
		this.workerService.stopWorker();
	}

	public onUpdateInterval(interval: number): void {
		this.workerService.updateInterval(interval);
	}

	public onUpdateDataSize(dataSize: number): void {
		this.workerService.updateDataSize(dataSize);
	}

	public onUpdateAdditionalIds(additionalIdsInput: string): void {
		this.additionalIds = additionalIdsInput.split(',').map(id => id.trim());
	}

	processIncomingData(data: Array<IDataItem>) {
		const additionalItems = data.filter(item =>
			this.additionalIds.some(id => item.id === id)
		);

		this.displayedData = [
			...additionalItems,
			...data.slice(-10 + additionalItems.length),
		];
	}
}
