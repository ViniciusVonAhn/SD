import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { BlockUIModule } from 'ng-block-ui';
import { ToasterModule } from 'angular2-toaster';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globals } from './util/globals';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSelectModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatCheckboxModule, MatProgressSpinnerModule, MatSlideToggleModule, MatButtonModule, MatInputModule } from '@angular/material';
import { HotelComponent } from './pages/hotel/hotel.component';
import { HotelCreateComponent } from './pages/hotel/hotel-create/hotel-create.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { FuncionarioCreateComponent } from './pages/funcionario/funcionario-create/funcionario-create.component';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    HotelComponent,
    HotelCreateComponent,
    FuncionarioComponent,
    FuncionarioCreateComponent,
    RemoveModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    TextMaskModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    NgbModule,
    BlockUIModule.forRoot(),
    ToasterModule.forRoot()
  ],
  exports: [
    RemoveModalComponent
  ],
  providers: [
    Globals,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
  entryComponents: [RemoveModalComponent]
})
export class AppModule { }
