import { Component, Input } from '@angular/core';

@Component({
  selector: 'item',
  templateUrl: './item.component.html'
})
export class ItemComponent {
  @Input() name: string;
  @Input() pos: number;
  @Input() score: number;
  @Input() color = 'mat-bg-primary';
}
