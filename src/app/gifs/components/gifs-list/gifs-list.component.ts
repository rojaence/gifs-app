import { Component, input } from '@angular/core';
import { GifsListItemComponent } from "../gifs-list-item/gifs-list-item.component";

@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
  styles: ``
})
export class GifsListComponent {
  items = input<string[]>([]);
}
