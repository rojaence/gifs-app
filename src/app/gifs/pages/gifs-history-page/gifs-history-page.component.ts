import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GifService } from '../../services/gifs.service';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gifs-history-page',
  imports: [GifsListComponent],
  templateUrl: './gifs-history-page.component.html',
  styles: ``
})
export default class GifsHistoryPageComponent {
  query = toSignal(inject(ActivatedRoute).params.pipe(
    map((params) => params['query'] as string)
  ), { initialValue: '' });
  gifService = inject(GifService);
}
