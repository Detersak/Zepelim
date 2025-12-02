import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../services/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  // DADOS INICIAIS (MOCK)
  private listaInicial: Produto[] = [
    // --- BURGERS ---
    { 
      id: 1, 
      nome: 'Zepelim Burger', 
      descricao: 'O clássico da casa. 180g de blend bovino, queijo prato, alface, tomate e maionese verde artesanal no pão brioche.', 
      preco: 32.00, 
      categoria: 'burgers', 
      imagemUrl: 'assets/img/burgers/zepelim.jpg', 
      disponivel: true, 
      destaque: true 
    },
    { 
      id: 2, 
      nome: 'Stairway to Bacon', 
      descricao: 'Para os fortes. Duplo smash burger (2x 100g), muito cheddar inglês e fatias generosas de bacon crocante.', 
      preco: 38.90, 
      categoria: 'burgers', 
      imagemUrl: 'assets/img/burgers/bacon.jpeg', 
      disponivel: true, 
      destaque: true 
    },
    { 
      id: 3, 
      nome: 'Veggie Floyd', 
      descricao: 'Burger de grão-de-bico com especiarias, rúcula, tomate seco e molho de mostarda e mel.', 
      preco: 30.00, 
      categoria: 'burgers', 
      imagemUrl: 'assets/img/burgers/veggie.jpeg', 
      disponivel: true 
    },

    // --- PORÇÕES ---
    { 
      id: 4, 
      nome: 'Batata Rústica', 
      descricao: 'Batatas cortadas à mão, fritas com alecrim e alho. Acompanha maionese da casa.', 
      preco: 22.00, 
      categoria: 'porcoes', 
      imagemUrl: 'assets/img/porcoes/batata.jpeg', 
      disponivel: true 
    },
    { 
      id: 5, 
      nome: 'Onion Rings', 
      descricao: 'Anéis de cebola empanados e super crocantes.', 
      preco: 25.00, 
      categoria: 'porcoes', 
      imagemUrl: 'assets/img/porcoes/onion.jpeg', 
      disponivel: false // Começa pausado para teste do Admin
    },

    // --- BEBIDAS ---
    { 
      id: 6, 
      nome: 'Coca-Cola Lata', 
      descricao: '350ml', 
      preco: 6.00, 
      categoria: 'bebidas', 
      imagemUrl: 'assets/img/bebidas/coca.jpeg', 
      disponivel: true 
    },
    { 
      id: 7, 
      nome: 'Heineken Long Neck', 
      descricao: '330ml', 
      preco: 12.00, 
      categoria: 'bebidas', 
      imagemUrl: 'assets/img/bebidas/heineken.jpeg', 
      disponivel: true 
    }
  ];

  // Estado Reativo (BehaviorSubject)
  private produtosSubject = new BehaviorSubject<Produto[]>(this.listaInicial);

  constructor() { }

  getProdutos(): Observable<Produto[]> {
    return this.produtosSubject.asObservable();
  }

  getProdutosPorCategoria(categoria: string): Observable<Produto[]> {
    // Nota: Num app real, o filtro seria no backend ou num pipe, 
    // mas aqui retornamos tudo e o componente filtra se precisar, 
    // ou criamos um observable derivado. Para simplificar o MVP, vamos filtrar o valor atual:
    const todos = this.produtosSubject.value;
    return new BehaviorSubject(todos.filter(p => p.categoria === categoria)).asObservable();
  }

  // --- AÇÕES DO ADMIN ---

  // 1. ALTERAR STATUS
  toggleDisponibilidade(id: number): void {
    const produtos = this.produtosSubject.value;
    const produto = produtos.find(p => p.id === id);
    if (produto) {
      produto.disponivel = !produto.disponivel;
      this.produtosSubject.next([...produtos]); // Notifica mudança
    }
  }

  // 2. ADICIONAR
  adicionarProduto(novo: Produto): void {
    const produtos = this.produtosSubject.value;
    // Gera ID simples (pega o maior ID + 1)
    const novoId = Math.max(...produtos.map(p => p.id)) + 1;
    novo.id = novoId;
    
    this.produtosSubject.next([...produtos, novo]);
  }

  // 3. EDITAR (Apenas nome e preço para simplificar)
  editarProduto(id: number, novoNome: string, novoPreco: number): void {
    const produtos = this.produtosSubject.value;
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
      produtos[index].nome = novoNome;
      produtos[index].preco = novoPreco;
      this.produtosSubject.next([...produtos]);
    }
  }

  // 4. REMOVER
  removerProduto(id: number): void {
    const produtos = this.produtosSubject.value;
    const filtrados = produtos.filter(p => p.id !== id);
    this.produtosSubject.next(filtrados);
  }
}