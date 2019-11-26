import { Globals } from './../../util/globals';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private globals: Globals
  ) { }

  ngOnInit() {}

  logout() {
    sessionStorage.clear();
    this.globals.logado = false;
    this.router.navigate(['/'])
  }

}

