import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../core/services/produtos';
import { Produto } from '../../core/services/models/produto.model';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="container py-5">
      <div class="text-center mb-5">
        <h1 class="display-5 fw-bold text-uppercase">Cardápio Zepelim</h1>
        <p class="lead text-muted">Escolha sua lenda do rock favorita.</p>
      </div>

      <div class="d-flex justify-content-center gap-2 mb-5">
        <button class="btn btn-dark rounded-pill px-4" (click)="filtrar('todos')">Todos</button>
        <button class="btn btn-outline-dark rounded-pill px-4" (click)="filtrar('burgers')">Burgers</button>
        <button class="btn btn-outline-dark rounded-pill px-4" (click)="filtrar('bebidas')">Bebidas</button>
      </div>

      <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-3" *ngFor="let item of produtos$ | async">
          <app-product-card 
            [produto]="item" 
            (adicionar)="adicionarAoCarrinho($event)">
          </app-product-card>
        </div>
      </div>
    </div>
  `
})
export class CardapioComponent implements OnInit {
  produtos$!: Observable<Produto[]>;

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtos$ = this.produtosService.getProdutos();
  }

  filtrar(categoria: string) {
    if (categoria === 'todos') {
      this.produtos$ = this.produtosService.getProdutos();
    } else {
      this.produtos$ = this.produtosService.getProdutosPorCategoria(categoria);
    }
  }

  adicionarAoCarrinho(produto: Produto) {
    console.log('Adicionado ao carrinho (simulação):', produto.nome);
    // Próximo passo: Conectar com o CarrinhoService
  }
}