export type CategoriaProduto = 'burgers' | 'bebidas' | 'porcoes' | 'sobremesas';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: CategoriaProduto;
  imagemUrl: string; // Caminho para assets ou URL externa
  disponivel: boolean; // Controlado pelo Gerente
  destaque?: boolean; // Para exibir no carrossel da Home
}