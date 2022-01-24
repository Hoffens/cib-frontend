import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/pages/login/login.component';
import { DashboardComponent } from "./dashboard/pages/dashboard/dashboard.component";
import { UsuariosComponent } from './usuarios/pages/usuarios/usuarios.component';
import { CompaniasComponent } from "./companias/pages/companias/companias.component";
import { CarrosComponent } from './carros/pages/carros/carros.component';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UsuariosComponent,
        pathMatch: 'full'
    },
    {
        path: 'companias',
        component: CompaniasComponent,
        pathMatch: 'full'
    },
    {
        path: 'carros',
        component: CarrosComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }
]


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}