import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { CartDrawerComponent } from './shared/components/cart-drawer/cart-drawer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, CartDrawerComponent],
  templateUrl: './app.html'
})
export class App {}