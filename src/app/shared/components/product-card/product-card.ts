import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../../core/services/models/produto.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'product-card.html',
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