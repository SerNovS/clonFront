import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { FormClienteComponent } from './pages/cliente/form-cliente/form-cliente.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CompraComponent } from './pages/productos/compra/compra.component';
import { FormComponent } from './pages/productos/producto/form/form.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';
import { TipoComponent } from './pages/productos/tipo/tipo.component';
import { VentaComponent } from './pages/productos/venta/venta.component';


const routes: Routes = [
  {path:'', redirectTo: '/productos', pathMatch: 'full'},
  {path:'dashboard', component: DashboardComponent},
  {path:'productos', component: ProductoComponent},
  {path:'producto/page/:page', component: ProductoComponent},
  {path:'producto/form', component: FormComponent},
  {path:'producto/form/:id', component: FormComponent},
  {path:'tipoproducto', component: TipoComponent},
  {path:'compraproducto', component: CompraComponent},
  {path:'tipoproducto', component: TipoComponent},
  {path:'ventaproducto', component: VentaComponent},
  {path:'cliente', component: ClienteComponent},
  {path:'cliente/page/:page', component: ClienteComponent},
  {path:'cliente/form', component: FormClienteComponent},
  {path:'cliente/form/:id', component: FormClienteComponent},
  {path:'login', component: LoginComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
