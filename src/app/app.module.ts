import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';
import { VentaComponent } from './pages/productos/venta/venta.component';
import { CompraComponent } from './pages/productos/compra/compra.component';
import { TipoComponent } from './pages/productos/tipo/tipo.component';
import { TipoService } from './pages/productos/tipo/tipo.service';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './pages/productos/producto/form/form.component';
import { FormsModule } from '@angular/forms';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { FormClienteComponent } from './pages/cliente/form-cliente/form-cliente.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PaginatorClienteComponent } from './pages/cliente/paginator-cliente/paginator-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { PaginatorProductoComponent } from './pages/productos/producto/paginator-producto/paginator-producto.component';
import { HomeComponent } from './pages/home/home.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SendEmailComponent } from './pages/login/change-password/send-email/send-email.component';
import { CambiarPasswordComponent } from './pages/login/change-password/cambiar-password/cambiar-password.component';
import { SubirFotoComponent } from './pages/productos/producto/subir-foto/subir-foto.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ProductoComponent,
    VentaComponent,
    CompraComponent,
    TipoComponent,
    FormComponent,
    ClienteComponent,
    FormClienteComponent,
    FilterPipe,
    PaginatorClienteComponent,
    LoginComponent,
    PaginatorProductoComponent,
    HomeComponent,
    RegistroComponent,
    SendEmailComponent,
    CambiarPasswordComponent,
    SubirFotoComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [TipoService, interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
