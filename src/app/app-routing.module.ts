import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from "./login.guard";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        canActivate: [LoginGuard],
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'directorio',
        canActivate: [LoginGuard],
        loadChildren: () => import('./directorio/directorio.module').then(m => m.DirectorioPageModule)
    },
    {
        path: 'noticias',
        canActivate: [LoginGuard],
        loadChildren: () => import('./noticias/noticias.module').then(m => m.NoticiasPageModule)
    },
    {
        path: 'avisos',
        canActivate: [LoginGuard],
        loadChildren: () => import('./avisos/avisos.module').then(m => m.AvisosPageModule)
    },
    {
        path: 'acerca',
        canActivate: [LoginGuard],
        loadChildren: () => import('./acerca/acerca.module').then(m => m.AcercaPageModule)
    },
    {
        path: 'calendario-escolar',
        canActivate: [LoginGuard],
        loadChildren: () => import('./calendario-escolar/calendario-escolar.module').then(m => m.CalendarioEscolarPageModule)
    },
    {
        path: 'eventos',
        canActivate: [LoginGuard],
        loadChildren: () => import('./eventos/eventos.module').then(m => m.EventosPageModule)
    },
    {
        path: 'perfil',
        canActivate: [LoginGuard],
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
    },
    {
        path: 'calificaciones',
        canActivate: [LoginGuard],
        loadChildren: () => import('./calificaciones/calificaciones.module').then(m => m.CalificacionesPageModule)
    },
    {
        path: 'horarios',
        canActivate: [LoginGuard],
        loadChildren: () => import('./horarios/horarios.module').then(m => m.HorariosPageModule)
    },
    {
        path: 'tutorias',
        canActivate: [LoginGuard],
        loadChildren: () => import('./tutorias/tutorias.module').then(m => m.TutoriasPageModule)
    },
    {
        path: 'tareas',
        canActivate: [LoginGuard],
        loadChildren: () => import('./lista-tareas/lista-tareas.module').then(m => m.ListaTareasPageModule)
    },
    {
        path: 'pagos',
        canActivate: [LoginGuard],
        loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosPageModule)
    },
    {
        path: 'notificacion',
        loadChildren: () => import('./notificacion/notificacion.module').then(m => m.NotificacionPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
