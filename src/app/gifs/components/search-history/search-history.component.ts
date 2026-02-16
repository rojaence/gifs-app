import { Component, inject } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-history',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './search-history.component.html',
  styles: ``
})
export class SearchHistoryComponent {
  gifService = inject(GifService);
}
