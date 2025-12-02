import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para Pipes de Data e Moeda
import { Observable } from 'rxjs';
import { Evento } from '../../core/services/models/evento.model';
import { EventosService } from '../../core/services/eventos';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css'
})
export class EventosComponent implements OnInit {
  eventos$!: Observable<Evento[]>;

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.eventos$ = this.eventosService.getEventos();
  }
}