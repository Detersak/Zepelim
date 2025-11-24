import { Produto } from "./produto.model";

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  observacoes?: string;
  adicionais?: { nome: string; preco: number }[];
  subtotal: number; // Preço calculado (base + adicionais) * qtd
}