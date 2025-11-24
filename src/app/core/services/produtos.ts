import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from './models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  // MOCK DATA: Simula o Banco de Dados
  private produtos: Produto[] = [
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
      imagemUrl: 'assets/img/burgers/bacon.jpg',
      disponivel: true,
      destaque: true
    },
    {
      id: 3,
      nome: 'Veggie Floyd',
      descricao: 'Burger de grão-de-bico com especiarias, rúcula, tomate seco e molho de mostarda e mel.',
      preco: 30.00,
      categoria: 'burgers',
      imagemUrl: 'assets/img/burgers/veggie.jpg',
      disponivel: true
    },

    // --- PORÇÕES ---
    {
      id: 4,
      nome: 'Batata Rústica',
      descricao: 'Batatas cortadas à mão, fritas com alecrim e alho. Acompanha maionese da casa.',
      preco: 22.00,
      categoria: 'porcoes',
      imagemUrl: 'assets/img/porcoes/batata.jpg',
      disponivel: true
    },
    {
      id: 5,
      nome: 'Onion Rings',
      descricao: 'Anéis de cebola empanados e super crocantes.',
      preco: 25.00,
      categoria: 'porcoes',
      imagemUrl: 'assets/img/porcoes/onion.jpg',
      disponivel: false // Exemplo de item esgotado para testar o admin
    },

    // --- BEBIDAS ---
    {
      id: 6,
      nome: 'Coca-Cola Lata',
      descricao: '350ml',
      preco: 6.00,
      categoria: 'bebidas',
      imagemUrl: 'assets/img/bebidas/coca.jpg',
      disponivel: true
    },
    {
      id: 7,
      nome: 'Heineken Long Neck',
      descricao: '330ml',
      preco: 12.00,
      categoria: 'bebidas',
      imagemUrl: 'assets/img/bebidas/heineken.jpg',
      disponivel: true
    }
  ];

  constructor() { }

  /**
   * Retorna todos os produtos (simula GET /produtos)
   */
  getProdutos(): Observable<Produto[]> {
    return of(this.produtos);
  }

  /**
   * Retorna produtos filtrados por categoria
   */
  getProdutosPorCategoria(categoria: string): Observable<Produto[]> {
    const filtrados = this.produtos.filter(p => p.categoria === categoria);
    return of(filtrados);
  }

  /**
   * Busca um produto pelo ID (usado no Modal de Detalhes)
   */
  getProdutoById(id: number): Observable<Produto | undefined> {
    const produto = this.produtos.find(p => p.id === id);
    return of(produto);
  }

  /**
   * Simula a edição de status pelo Gerente (Pausar/Ativar item)
   * ATENÇÃO: Como não há Backend, isso reseta ao recarregar a página.
   */
  toggleDisponibilidade(id: number): void {
    const index = this.produtos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.produtos[index].disponivel = !this.produtos[index].disponivel;
    }
  }
}