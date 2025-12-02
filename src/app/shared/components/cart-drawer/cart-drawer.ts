import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CarrinhoService } from '../../../core/services/carrinho';
import { ItemCarrinho } from '../../../core/services/models/item-carrinho.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart-drawer.html', 
  styles: [`
    .scale-in-center { animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
    @keyframes scale-in-center { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
    .alert-warning { border-left: 5px solid #ffc107; }
    .alert-danger { border-left: 5px solid #dc3545; }
  `]
})
export class CartDrawerComponent implements OnInit, OnDestroy {
  itens$: Observable<ItemCarrinho[]>;
  total$: Observable<number>;
  
  private subs = new Subscription();
  private listaItens: ItemCarrinho[] = [];
  private valorTotal: number = 0;

  // Dados do Formulário
  dadosCliente = {
    nome: '',
    endereco: '',
    numero: '',
    complemento: '',
    telefone: '',
    pagamento: 'pix'
  };

  taxaEntrega = 8.00;
  
  // Controle de Estados
  estadoAtual: 'carrinho' | 'processando' | 'sucesso' = 'carrinho';
  numeroPedido = '';
  
  // Regras Específicas
  confirmouIdade = false;
  simularLojaAberta = false; // MODO DEMO

  constructor(private carrinhoService: CarrinhoService) {
    this.itens$ = this.carrinhoService.itens$;
    this.total$ = this.carrinhoService.total$;
  }

  ngOnInit(): void {
    // Inscreve para ter os valores atualizados no TS para validação
    this.subs.add(this.carrinhoService.itens$.subscribe(i => this.listaItens = i));
    this.subs.add(this.carrinhoService.total$.subscribe(t => this.valorTotal = t));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  removerItem(index: number) {
    this.carrinhoService.removerItem(index);
  }

  // --- GETTERS (REGRAS DE NEGÓCIO) ---

  // RN01: Horário (com override do modo demo)
  get lojaAberta(): boolean {
    if (this.simularLojaAberta) return true; // Bypass para teste

    const agora = new Date();
    const hora = agora.getHours();
    // Aberto das 18h até as 02h da manhã
    return hora >= 18 || hora < 2; 
  }

  // RN02: Valor Mínimo
  get atingiuValorMinimo(): boolean {
    return (this.valorTotal + this.taxaEntrega) >= 30.00;
  }

  // RN03: Bebida Alcoólica
  get temBebidaAlcoolica(): boolean {
    return this.listaItens.some(item => item.produto.categoria === 'bebidas');
  }

  // RN05: Cadastro Obrigatório
  get cadastroCompleto(): boolean {
    return !!(
      this.dadosCliente.nome &&
      this.dadosCliente.telefone &&
      this.dadosCliente.endereco &&
      this.dadosCliente.numero
    );
  }

  // Validador Geral do Botão
  get podeFinalizarPedido(): boolean {
    if (!this.lojaAberta) return false;
    if (!this.atingiuValorMinimo) return false;
    if (!this.cadastroCompleto) return false;
    if (this.temBebidaAlcoolica && !this.confirmouIdade) return false;
    
    return true;
  }

  // AÇÃO FINAL
  finalizarPedido() {
    if (!this.podeFinalizarPedido) return;

    this.estadoAtual = 'processando';
    
    // Simula delay de rede (2 segundos)
    setTimeout(() => {
      this.numeroPedido = '#' + Math.floor(Math.random() * 9999).toString().padStart(4, '0');
      this.carrinhoService.limparCarrinho();
      this.estadoAtual = 'sucesso';
    }, 2000);
  }

  resetar() {
    this.estadoAtual = 'carrinho';
    this.confirmouIdade = false;
    this.dadosCliente = { nome: '', endereco: '', numero: '', complemento: '', telefone: '', pagamento: 'pix' };
  }}