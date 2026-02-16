import { Component } from '@angular/core';
import { MenuOption } from '../../interfaces/menu';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';
import { SearchHistoryComponent } from "../search-history/search-history.component";

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, CommonModule, RouterLinkActive, SearchHistoryComponent],
  templateUrl: './gifs-side-menu-options.component.html',
  styles: ``
})
export class GifsSideMenuOptionsComponent {
  menuOptions: MenuOption[] = [
    {
      icon: 'ri-fire-line',
      label: 'Trending',
      sublabel: 'Gifs populares',
      path: '/dashboard/trending',
    },
    {
      icon: 'ri-search-line',
      label: 'Search',
      sublabel: 'Buscar Gifs',
      path: '/dashboard/search',
    }
  ]
}
