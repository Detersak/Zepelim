import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Evento } from '../services/models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private listaInicial: Evento[] = [
    { id: 1, titulo: 'Rocks Off - Stones Tribute', descricao: 'Cover oficial.', data: new Date('2025-11-25T21:00:00'), imagemUrl: 'assets/img/eventos/banda1.png', linkIngresso: 'https://sympla.com.br', valor: 20.00, status: 'confirmado' },
    { id: 2, titulo: 'Noite Autoral', descricao: 'Bandas locais.', data: new Date('2025-12-01T22:00:00'), imagemUrl: 'assets/img/eventos/banda2.png', status: 'lotado' }
  ];

  private eventosSubject = new BehaviorSubject<Evento[]>(this.listaInicial);

  constructor() { }

  getEventos(): Observable<Evento[]> {
    return this.eventosSubject.asObservable();
  }

  // 1. ADICIONAR
  adicionarEvento(novo: Evento): void {
    const eventos = this.eventosSubject.value;
    const novoId = Math.max(...eventos.map(e => e.id), 0) + 1;
    novo.id = novoId;
    
    // Ordena por data
    const novaLista = [...eventos, novo].sort((a, b) => a.data.getTime() - b.data.getTime());
    this.eventosSubject.next(novaLista);
  }

  // 2. EDITAR
  editarEvento(id: number, novoTitulo: string, novoStatus: 'confirmado' | 'lotado' | 'cancelado'): void {
    const eventos = this.eventosSubject.value;
    const evento = eventos.find(e => e.id === id);
    if (evento) {
      evento.titulo = novoTitulo;
      evento.status = novoStatus;
      this.eventosSubject.next([...eventos]);
    }
  }

  // 3. REMOVER
  removerEvento(id: number): void {
    const eventos = this.eventosSubject.value;
    const filtrados = eventos.filter(e => e.id !== id);
    this.eventosSubject.next(filtrados);
  }
}