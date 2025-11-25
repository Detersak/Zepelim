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
  templateUrl:'./cardapio.html'
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