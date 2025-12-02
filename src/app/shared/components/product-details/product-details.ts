import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para o [(ngModel)]
import { Produto } from '../../../core/services/models/produto.model';
import { ItemCarrinho } from '../../../core/services/models/item-carrinho.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnChanges {
  @Input() produto: Produto | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<ItemCarrinho>();

  // Estado do formulário
  quantidade = 1;
  observacoes = '';
  
  // Lista de adicionais possíveis (Hardcoded para o MVP, mas poderia vir do backend)
  adicionaisDisponiveis = [
    { nome: 'Bacon Extra', preco: 4.00, selecionado: false },
    { nome: 'Queijo Extra', preco: 3.00, selecionado: false },
    { nome: 'Ovo', preco: 2.00, selecionado: false },
    { nome: 'Molho da Casa', preco: 0.00, selecionado: false }
  ];

  // Reseta o estado sempre que o produto mudar (abrir o modal)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produto'] && this.produto) {
      this.quantidade = 1;
      this.observacoes = '';
      this.adicionaisDisponiveis.forEach(a => a.selecionado = false);
    }
  }

  // Aumentar/Diminuir Quantidade
  alterarQtd(valor: number) {
    const novaQtd = this.quantidade + valor;
    if (novaQtd >= 1) this.quantidade = novaQtd;
  }

  // Calcula o preço total em tempo real (Base + Adicionais) * Qtd
  get precoTotal(): number {
    if (!this.produto) return 0;
    
    const totalAdicionais = this.adicionaisDisponiveis
      .filter(a => a.selecionado)
      .reduce((acc, curr) => acc + curr.preco, 0);

    return (this.produto.preco + totalAdicionais) * this.quantidade;
  }

  fecharModal() {
    this.close.emit();
  }

  confirmar() {
    if (!this.produto) return;

    const itemParaCarrinho: ItemCarrinho = {
      produto: this.produto,
      quantidade: this.quantidade,
      observacoes: this.observacoes,
      adicionais: this.adicionaisDisponiveis
        .filter(a => a.selecionado)
        .map(a => ({ nome: a.nome, preco: a.preco })),
      subtotal: this.precoTotal
    };

    this.addToCart.emit(itemParaCarrinho);
    this.fecharModal();
  }
}