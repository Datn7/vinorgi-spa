import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingHeroComponent } from "./components/landing-hero/landing-hero.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LandingHeroComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'vinorgi-spa';
}
