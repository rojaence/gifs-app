import { AfterViewInit, Component, computed, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  styles: ``
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifService);
  scrollState = inject(ScrollStateService);
  groupContainerRef = viewChild<ElementRef<HTMLElement>>('groupContainer');

  trendingGifGroups: Signal<Gif[][]> = computed(() => {
    const gifs = this.gifService.trendingGifs();
    const groups: Gif[][] = [];

    for (let i = 0; i < gifs.length; i += 3) {
      groups.push(gifs.slice(i, i + 3));
    }
    return groups;
  })

  onScroll(event: Event) {
    const scrollContainer = this.groupContainerRef()?.nativeElement;
    if (!scrollContainer) return;
    const scrollTop = scrollContainer.scrollTop;
    const clientHeight = scrollContainer.clientHeight;
    const scrollHeight = scrollContainer.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
    this.scrollState.trendingScrollState.set(scrollTop);
  }

  ngAfterViewInit(): void {
    const scrollContainer = this.groupContainerRef()?.nativeElement;
    if (!scrollContainer) return;
    scrollContainer.scrollTop = this.scrollState.trendingScrollState();
  }
}
