import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl:
  styles: [`
    .min-vh-50 { min-height: 50vh; }
    .object-fit-cover { object-fit: cover; }
    
    /* Efeito suave ao passar o mouse nos destaques */
    .hover-effect { transition: transform 0.3s ease; }
    .hover-effect:hover { transform: translateY(-5px); }
  `]
})
export class HomeComponent {}