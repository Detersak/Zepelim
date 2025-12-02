export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  data: Date;       // Vamos usar objeto Date para poder formatar (Dia/Mês)
  imagemUrl: string;
  linkIngresso?: string; // Opcional, pois pode ser entrada franca
  valor?: number;   // Opcional
  status: 'confirmado' | 'cancelado' | 'lotado';
}