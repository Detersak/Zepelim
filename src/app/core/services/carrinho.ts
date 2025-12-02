import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ItemCarrinho } from '../services/models/item-carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  
  // O "Coração" do estado: guarda a lista atual
  private itensSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  
  // Quem quiser ver a lista, se inscreve aqui
  itens$ = this.itensSubject.asObservable();

  // Calcula o valor total automaticamente sempre que a lista muda
  total$ = this.itens$.pipe(
    map(itens => itens.reduce((acc, item) => acc + item.subtotal, 0))
  );

  // Calcula a quantidade total de itens (para o badge do ícone)
  quantidadeItens$ = this.itens$.pipe(
    map(itens => itens.length)
  );

  constructor() {
    // Ao abrir o site, tenta recuperar o carrinho salvo no navegador
    const salvo = localStorage.getItem('zepelim_cart');
    if (salvo) {
      this.itensSubject.next(JSON.parse(salvo));
    }
  }

  /**
   * Adiciona um item ao carrinho.
   * Se o item já existir (mesmo ID, observações e adicionais), soma a quantidade.
   */
  adicionarItem(novoItem: ItemCarrinho) {
    const itensAtuais = this.itensSubject.value;
    
    // Procura se já existe um item IDÊNTICO no carrinho
    const indexExistente = itensAtuais.findIndex(item => this.saoItensIguais(item, novoItem));

    if (indexExistente >= 0) {
      // CENÁRIO A: Item já existe. Apenas aumentamos a quantidade.
      const itemExistente = itensAtuais[indexExistente];
      
      // Atualiza quantidade e subtotal
      itemExistente.quantidade += novoItem.quantidade;
      itemExistente.subtotal += novoItem.subtotal;

      // Forçamos uma atualização do array para o Angular perceber
      itensAtuais[indexExistente] = itemExistente;
      this.atualizarEstado([...itensAtuais]);
    } else {
      // CENÁRIO B: Item novo. Adiciona no final da lista.
      this.atualizarEstado([...itensAtuais, novoItem]);
    }
  }

  /**
   * Remove um item pelo índice da lista
   */
  removerItem(index: number) {
    const itensAtuais = this.itensSubject.value;
    // Remove 1 item na posição 'index'
    itensAtuais.splice(index, 1);
    this.atualizarEstado([...itensAtuais]);
  }

  /**
   * Esvazia totalmente o carrinho (após compra sucesso)
   */
  limparCarrinho() {
    this.atualizarEstado([]);
  }

  // --- MÉTODOS PRIVADOS (Auxiliares) ---

  /**
   * Atualiza o BehaviorSubject e salva no LocalStorage
   */
  private atualizarEstado(itens: ItemCarrinho[]) {
    this.itensSubject.next(itens); // Avisa os componentes
    localStorage.setItem('zepelim_cart', JSON.stringify(itens)); // Salva no disco
  }

  /**
   * Compara se dois itens são funcionalmente idênticos.
   * Ex: X-Bacon sem cebola == X-Bacon sem cebola.
   */
  private saoItensIguais(itemA: ItemCarrinho, itemB: ItemCarrinho): boolean {
    // 1. Mesmo Produto ID?
    if (itemA.produto.id !== itemB.produto.id) return false;
    
    // 2. Mesma Observação?
    if (itemA.observacoes !== itemB.observacoes) return false;

    // 3. Mesmos Adicionais? (Transforma em string para comparar fácil)
    const adA = JSON.stringify(itemA.adicionais?.sort((a,b) => a.nome.localeCompare(b.nome)));
    const adB = JSON.stringify(itemB.adicionais?.sort((a,b) => a.nome.localeCompare(b.nome)));
    
    return adA === adB;
  }
}

