import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { FormClienteComponent } from './pages/cliente/form-cliente/form-cliente.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CompraComponent } from './pages/productos/compra/compra.component';
import { FormComponent } from './pages/productos/producto/form/form.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';
import { TipoComponent } from './pages/productos/tipo/tipo.component';
import { VentaComponent } from './pages/productos/venta/venta.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'producto/page/:page', component: ProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador', 'cliente'] },
  },
  {
    path: 'productos',
    component: ProductoComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador', 'cliente'] },
  },
  {
    path: 'producto/form',
    component: FormComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'producto/form/:id',
    component: FormComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'tipoproducto',
    component: TipoComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'compraproducto',
    component: CompraComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'tipoproducto',
    component: TipoComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'ventaproducto',
    component: VentaComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'cliente/page/:page',
    component: ClienteComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'cliente/form',
    component: FormClienteComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'cliente/form/:id',
    component: FormClienteComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'trabajador', 'cliente'] },
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
