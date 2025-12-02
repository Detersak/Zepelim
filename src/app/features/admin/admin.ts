// ... imports (mantenha os mesmos)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Produto } from '../../core/services/models/produto.model';
import { Evento } from '../../core/services/models/evento.model';
import { ProdutosService } from '../../core/services/produtos';
import { EventosService } from '../../core/services/eventos';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html'
})
export class AdminComponent implements OnInit {
  // ... variáveis de login e observables (mantenha iguais)
  usuario = '';
  senha = '';
  erroLogin = false;
  estaLogado$: Observable<boolean>;
  produtos$: Observable<Produto[]>;
  eventos$: Observable<Evento[]>;

  constructor(
    private authService: AuthService,
    private produtosService: ProdutosService,
    private eventosService: EventosService
  ) {
    this.estaLogado$ = this.authService.isLoggedIn$;
    this.produtos$ = this.produtosService.getProdutos();
    this.eventos$ = this.eventosService.getEventos();
  }

  ngOnInit(): void {}
  fazerLogin() { if (!this.authService.login(this.usuario, this.senha)) this.erroLogin = true; }
  sair() { this.authService.logout(); }
  alternarDisponibilidade(produto: Produto) { this.produtosService.toggleDisponibilidade(produto.id); }

  // --- FUNÇÕES DE PRODUTOS ---

  novoProduto() {
    const nome = prompt('Nome do novo produto:');
    if (!nome) return;
    
    const precoStr = prompt('Preço (ex: 35.90):');
    const preco = parseFloat(precoStr || '0');

    const novoProduto: Produto = {
      id: 0, // Será gerado no service
      nome: nome,
      descricao: 'Descrição padrão (Edite depois)',
      preco: preco,
      categoria: 'burgers', // Padrão
      imagemUrl: 'assets/img/burgers/zepelim.jpg', // Placeholder
      disponivel: true
    };

    this.produtosService.adicionarProduto(novoProduto);
  }

  editarProduto(prod: Produto) {
    const novoNome = prompt('Editar Nome:', prod.nome);
    const novoPrecoStr = prompt('Editar Preço:', prod.preco.toString());
    
    if (novoNome && novoPrecoStr) {
      this.produtosService.editarProduto(prod.id, novoNome, parseFloat(novoPrecoStr));
    }
  }

  removerProduto(prod: Produto) {
    if (confirm(`Tem certeza que deseja remover "${prod.nome}"?`)) {
      this.produtosService.removerProduto(prod.id);
    }
  }

  // --- FUNÇÕES DE EVENTOS ---

  novoEvento() {
    const titulo = prompt('Nome da Banda / Atração:');
    if (!titulo) return;

    const dataStr = prompt('Data (AAAA-MM-DD):', '2025-12-31');
    
    const novoEvento: Evento = {
      id: 0,
      titulo: titulo,
      descricao: 'Descrição do show...',
      data: new Date(dataStr + 'T21:00:00'),
      imagemUrl: 'assets/img/banda1.jpg',
      status: 'confirmado'
    };

    this.eventosService.adicionarEvento(novoEvento);
  }

  editarEvento(evento: Evento) {
    const novoTitulo = prompt('Editar Título:', evento.titulo);
    if (novoTitulo) {
      // Simplificando: muda só titulo e status
      this.eventosService.editarEvento(evento.id, novoTitulo, evento.status);
    }
  }

  removerEvento(evento: Evento) {
    if (confirm(`Remover o show "${evento.titulo}"?`)) {
      this.eventosService.removerEvento(evento.id);
    }
  }
}