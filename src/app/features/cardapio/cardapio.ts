import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Produto } from '../../core/services/models/produto.model';
import { ItemCarrinho } from '../../core/services/models/item-carrinho.model';
import { ProdutosService } from '../../core/services/produtos';
import { CarrinhoService } from '../../core/services/carrinho';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { ProductDetails } from '../../shared/components/product-details/product-details';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  // ATENÇÃO AQUI: Verifique se o nome do arquivo na sua pasta é .component.html ou apenas .html
  templateUrl: './cardapio.html', 
  imports: [CommonModule, ProductCardComponent, ProductDetails]
})
export class CardapioComponent implements OnInit {
  produtos$!: Observable<Produto[]>;
  
  // Variáveis necessárias para o HTML funcionar
  produtoSelecionado: Produto | null = null;
  modalAberto = false;

  constructor(
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.produtos$ = this.produtosService.getProdutos();
  }

  filtrar(categoria: string) {
    if (categoria === 'todos') {
      this.produtos$ = this.produtosService.getProdutos();
    } else {
      this.produtos$ = this.produtosService.getProdutosPorCategoria(categoria);
    }
  }

  // Função chamada pelo CARD
  abrirModalCompra(produto: Produto) {
    this.produtoSelecionado = produto;
    this.modalAberto = true;
  }

  // Função chamada pelo MODAL (botão fechar)
  fecharModal() {
    this.modalAberto = false;
    this.produtoSelecionado = null;
  }

  // Função chamada pelo MODAL (botão adicionar)
  adicionarAoCarrinhoFinal(item: ItemCarrinho) {
    this.carrinhoService.adicionarItem(item);
    this.modalAberto = false;
  }
}