import { Routes } from '@angular/router';
import { LibroListaComponent } from './components/libro-lista/libro-lista.component';

export const routes: Routes = [

    {
        path: '', redirectTo: '/libros', pathMatch: 'full'
    },
    {
        path: 'libros', component: LibroListaComponent
    },
    {
        path: '**', redirectTo: '/libros'
    }
];
