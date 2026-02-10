import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GifsSideMenuComponent } from "../../components/gifs-side-menu/gifs-side-menu.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterModule, GifsSideMenuComponent],
  templateUrl: './dashboard-page.component.html',
  styles: ``
})
export default class DashboardPageComponent {

}
