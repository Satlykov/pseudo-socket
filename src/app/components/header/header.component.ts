import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { defaultDataSize, defaultInterval } from '../../pseudo-socket.worker';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	public interval: number = defaultInterval;
	public dataSize: number = defaultDataSize;

	@Output() public updateInterval = new EventEmitter<number>();
	@Output() public updateDataSize = new EventEmitter<number>();
	@Output() public updateAdditionalIds = new EventEmitter<string>();

	public onUpdateInterval({ target }: Event) {
		const value: number = Number((target as HTMLInputElement).value);
		this.updateInterval.emit(value);
	}

	public onUpdateDataSize({ target }: Event) {
		const value: number = Number((target as HTMLInputElement).value);
		this.updateDataSize.emit(value);
	}

	public onUpdateAdditionalIds({ target }: Event) {
		const value: string = (target as HTMLInputElement).value;
		this.updateAdditionalIds.emit(value);
	}
}
