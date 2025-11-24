import { Routes } from '@angular/router';
import { CardapioComponent } from './features/cardapio/cardapio';
import { SobreComponent } from './features/sobre/sobre';
import { HomeComponent } from './features/home/home';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'cardapio', component:CardapioComponent},
    {path:'sobre', component:SobreComponent}
];
