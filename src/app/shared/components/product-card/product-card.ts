import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../core/services/models/produto.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card h-100 shadow-sm border-0">
      <div class="position-relative">
        <img [src]="produto.imagemUrl" class="card-img-top" [alt]="produto.nome"
             style="height: 200px; object-fit: cover;"
             [class.grayscale]="!produto.disponivel">
        
        <span *ngIf="!produto.disponivel" 
              class="position-absolute top-50 start-50 translate-middle badge bg-danger fs-6">
          ESGOTADO
        </span>
      </div>

      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold text-danger">{{ produto.nome }}</h5>
        <p class="card-text text-muted small flex-grow-1">{{ produto.descricao }}</p>
        
        <div class="d-flex justify-content-between align-items-center mt-3">
          <span class="fs-5 fw-bold">{{ produto.preco | currency:'BRL' }}</span>
          
          <button class="btn btn-outline-danger btn-sm" 
                  [disabled]="!produto.disponivel"
                  (click)="onAdicionar()">
            + Adicionar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .grayscale { filter: grayscale(100%); opacity: 0.6; }
    .card:hover { transform: translateY(-5px); transition: 0.3s; }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) produto!: Produto;
  @Output() adicionar = new EventEmitter<Produto>();

  onAdicionar() {
    this.adicionar.emit(this.produto);
  }
}