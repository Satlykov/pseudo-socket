import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildTableComponent } from '../child-table/child-table.component';
import { IDataItem } from '../../models/data-interfaces';

@Component({
	selector: 'app-main-table',
	standalone: true,
	imports: [CommonModule, ChildTableComponent],
	templateUrl: './main-table.component.html',
	styleUrls: ['./main-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTableComponent {
	@Input() public displayedData!: Array<IDataItem>;

	public trackBy(index: number, item: IDataItem) {
		return item ? item.id : index;
	}
}
