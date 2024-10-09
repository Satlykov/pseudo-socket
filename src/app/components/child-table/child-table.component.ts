import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IChildData } from '../../models/data-interfaces';

@Component({
	selector: 'app-child-table',
	templateUrl: './child-table.component.html',
	styleUrls: ['./child-table.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildTableComponent {
	@Input() public child!: IChildData;
}
