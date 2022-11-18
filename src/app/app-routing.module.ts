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
import { ProdGuardService } from './guards/prod-guard.service';
import { RegistroComponent } from './pages/registro/registro.component';
import { SendEmailComponent } from './pages/login/change-password/send-email/send-email.component';
import { CambiarPasswordComponent } from './pages/login/change-password/cambiar-password/cambiar-password.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'sendemail', component: SendEmailComponent },
  {
    path: 'changepassword/:tokenPassword',
    component: CambiarPasswordComponent,
  },
  {
    path: 'producto/page/:page',
    component: ProductoComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador', 'cliente'] },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador', 'cliente'] },
  },
  {
    path: 'productos',
    component: ProductoComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador', 'cliente'] },
  },
  {
    path: 'producto/form',
    component: FormComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'producto/form/:id',
    component: FormComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'tipoproducto',
    component: TipoComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'compraproducto',
    component: CompraComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'tipoproducto',
    component: TipoComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'ventaproducto',
    component: VentaComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'cliente/page/:page',
    component: ClienteComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'cliente/form',
    component: FormClienteComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'cliente/form/:id',
    component: FormClienteComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador'] },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ProdGuardService],
    data: { expectedRol: ['admin', 'trabajador', 'cliente'] },
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
