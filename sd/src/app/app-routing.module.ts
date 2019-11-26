import { HomeComponent } from './pages/home/home.component';
import { Globals } from './util/globals';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, Event, NavigationError, NavigationEnd } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { environment } from 'src/environments/environment';
import { HotelComponent } from './pages/hotel/hotel.component';
import { HotelCreateComponent } from './pages/hotel/hotel-create/hotel-create.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { FuncionarioCreateComponent } from './pages/funcionario/funcionario-create/funcionario-create.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'hotel/create', component: HotelCreateComponent },
  { path: 'hotel/create/:id', component: HotelCreateComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  { path: 'funcionario/create', component: FuncionarioCreateComponent },
  { path: 'funcionario/create/:id', component: FuncionarioCreateComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private router: Router,
    private globals: Globals
  ) {
    this.router.events.subscribe((event: Event) => {
      let role = sessionStorage.getItem('role');
      if (event instanceof NavigationError) {
        if (sessionStorage.getItem('role') === environment.role) {
          this.router.navigate(['/home']);
          this.globals.logado = true;
          this.globals.sidebar = true;
        } else {
          sessionStorage.clear();
          this.router.navigate(['/']);
          this.globals.logado = false;
          this.globals.sidebar = false;
        }
      } else if (event instanceof NavigationEnd) {
        if (environment.role !== role) {
          sessionStorage.clear();
          this.router.navigate(['/']);
          this.globals.logado = false;
          this.globals.sidebar = true;
        } else if (environment.role === role && event.url === "/") {
          this.router.navigate(['/home']);
          this.globals.logado = true;
        } else {
          this.globals.sidebar = event.url === "/home" ? true : false;
          this.globals.logado = true;
          this.router.navigate([event.url.replace("#", "")]);
        }
      }
    });
  }
}
