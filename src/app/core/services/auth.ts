import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // O BehaviorSubject é quem guarda o estado (true = logado, false = deslogado)
  // Começa como false (ninguém logado)
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  
  // Criamos um Observable público para os componentes (Admin) "escutarem"
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private router: Router) {
    // Truque: Ao dar F5 na página, verifica se já estava logado antes
    // para não chutar o gerente pra fora.
    const token = sessionStorage.getItem('zepelim_token');
    if (token === 'admin-token') {
      this.loggedInSubject.next(true);
    }
  }

  // Função para validar usuário e senha
  login(usuario: string, senha: string): boolean {
    // LOGIN MOCKADO (Simulação)
    // Aqui você define qual é o login e senha do sistema
    if (usuario === 'admin' && senha === 'admin') {
      
      this.loggedInSubject.next(true); // Avisa o sistema que logou
      sessionStorage.setItem('zepelim_token', 'admin-token'); // Salva no navegador
      return true; // Sucesso
    }
    
    return false; // Falha
  }

  // Função para sair
  logout() {
    this.loggedInSubject.next(false); // Avisa que saiu
    sessionStorage.removeItem('zepelim_token'); // Limpa navegador
    this.router.navigate(['/']); // Redireciona para a Home
  }
}