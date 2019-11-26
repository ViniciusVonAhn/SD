import { Globals } from './util/globals';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public config: ToasterConfig = new ToasterConfig({
    timeout: 5000,
    animation: 'flyRight'
  });

  constructor(
    public globals: Globals,
    private router: Router
  ) { }




}
