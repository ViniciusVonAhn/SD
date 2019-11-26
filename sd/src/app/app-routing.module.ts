import { Page4Component } from './pages/page4/page4.component';
import { Page3Component } from './pages/page3/page3.component';
import { Page2Component } from './pages/page2/page2.component';
import { HomeComponent } from './pages/home/home.component';
import { Globals } from './util/globals';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, Event, NavigationError, NavigationEnd } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { environment } from 'src/environments/environment';
import { Page1Component } from './pages/page1/page1.component';
import { CountryComponent } from './pages/country/country.component';
import { CountryCreateComponent } from './pages/country/country-create/country-create.component';
import { CityComponent } from './pages/city/city.component';
import { CityCreateComponent } from './pages/city/city-create/city-create.component';
import { StateComponent } from './pages/state/state.component';
import { StateCreateComponent } from './pages/state/state-create/state-create.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { HotelCreateComponent } from './pages/hotel/hotel-create/hotel-create.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { FuncionarioCreateComponent } from './pages/funcionario/funcionario-create/funcionario-create.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'countries', component: CountryComponent },
  { path: 'countries/create', component: CountryCreateComponent },
  { path: 'countries/create/:id', component: CountryCreateComponent },
  { path: 'cities', component: CityComponent },
  { path: 'cities/create', component: CityCreateComponent },
  { path: 'cities/create/:id', component: CityCreateComponent },
  { path: 'staties', component: StateComponent },
  { path: 'staties/create', component: StateCreateComponent },
  { path: 'staties/create/:id', component: StateCreateComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'hotel/create', component: HotelCreateComponent },
  { path: 'hotel/create/:id', component: HotelCreateComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  { path: 'funcionario/create', component: FuncionarioCreateComponent },
  { path: 'funcionario/create/:id', component: FuncionarioCreateComponent },
  { path: 'home', component: HomeComponent },
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: 'page3', component: Page3Component },
  { path: 'page4', component: Page4Component },
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
