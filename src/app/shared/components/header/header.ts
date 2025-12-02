import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarrinhoService } from '../../../core/services/carrinho';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl:'./header.html',
  styleUrl:'./header.css'
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