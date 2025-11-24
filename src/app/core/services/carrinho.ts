import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ItemCarrinho } from '../../core/services/models/item-carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  // Estado principal: Lista de itens
  private itensSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  itens$ = this.itensSubject.asObservable();

  // Estado derivado: Calcula o TOTAL automaticamente
  total$ = this.itens$.pipe(
    map(itens => itens.reduce((acc, item) => acc + item.subtotal, 0))
  );

  // Estado derivado: Calcula a QUANTIDADE de itens
  quantidadeItens$ = this.itens$.pipe(
    map(itens => itens.length)
  );

  constructor() {
    // Tenta recuperar do LocalStorage ao iniciar
    const salvo = localStorage.getItem('zepelim_cart');
    if (salvo) {
      this.itensSubject.next(JSON.parse(salvo));
    }
  }
}