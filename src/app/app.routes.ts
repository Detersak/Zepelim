import { Routes } from '@angular/router';
import { CardapioComponent } from './features/cardapio/cardapio';
import { SobreComponent } from './features/sobre/sobre';
import { HomeComponent } from './features/home/home';
import { EventosComponent } from './features/eventos/eventos';
import { AdminComponent } from './features/admin/admin';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'cardapio', component:CardapioComponent},
    {path:'sobre', component:SobreComponent},
    {path:'eventos', component:EventosComponent},
    {path:'admin', component:AdminComponent}
];
