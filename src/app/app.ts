import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  // Importe o HeaderComponent aqui
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    
    <main>
      <router-outlet></router-outlet>
    </main>

    `
})
export class App {}