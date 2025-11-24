import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary fixed-top shadow-sm">
      <div class="container">
        
        <a class="navbar-brand fw-bold text-uppercase d-flex align-items-center" routerLink="/">
          <i class="bi bi-vinyl-fill text-danger me-2 fs-4"></i> ZEPELIM <span class="text-danger ms-1">BAR</span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold text-uppercase small spacing-links">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/cardapio" routerLinkActive="active-link">Cardápio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/agenda" routerLinkActive="active-link">Agenda</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/sobre" routerLinkActive="active-link">Sobre</a>
            </li>
          </ul>

          <div class="d-flex align-items-center">
            <button class="btn btn-outline-light position-relative rounded-pill px-3 d-flex align-items-center gap-2"
                    (click)="abrirCarrinho()">
              
              <i class="bi bi-cart3"></i>
              
              <span class="fw-bold">
                {{ (total$ | async) | currency:'BRL' }}
              </span>

              <span *ngIf="(quantidade$ | async) as qtd" 
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-dark">
                {{ qtd > 0 ? qtd : '' }}
                <span class="visually-hidden">itens no carrinho</span>
              </span>

            </button>
          </div>
        </div>
      </div>
    </nav>
    
    <div style="height: 76px;"></div>
  `,
  styles: [`
    /* Estilo do Link Ativo (Vermelho do Zepelim) */
    .active-link {
      color: #dc3545 !important; /* Bootstrap Danger Color */
      border-bottom: 2px solid #dc3545;
    }

    /* Espaçamento extra entre os links no Desktop */
    .spacing-links .nav-item {
      margin-left: 15px;
      margin-right: 15px;
    }
    
    .nav-link { transition: color 0.3s; }
    .nav-link:hover { color: #dc3545 !important; }
  `]
})
export class HeaderComponent {
  total$: Observable<number>;
  quantidade$: Observable<number>;

  constructor(private carrinhoService: CarrinhoService) {
    // Conecta as variáveis do template aos Observables do Service
    this.total$ = this.carrinhoService.total$;
    this.quantidade$ = this.carrinhoService.quantidadeItens$;
  }

  abrirCarrinho() {
    // AQUI vai a lógica para abrir o Modal lateral
    console.log('Abrir modal do carrinho');
    // Exemplo futuro: this.carrinhoService.toggleModal();
  }
}