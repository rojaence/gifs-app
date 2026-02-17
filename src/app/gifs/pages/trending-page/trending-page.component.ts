import { Component, computed, inject, Signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  styles: ``
})
export default class TrendingPageComponent {
  gifService = inject(GifService);

  trendingGifGroups: Signal<Gif[][]> = computed(() => {
    const gifs = this.gifService.trendingGifs();
    const groups: Gif[][] = [];

    for (let i = 0; i < gifs.length; i += 3) {
      groups.push(gifs.slice(i, i + 3));
    }
    return groups;
  })
}
