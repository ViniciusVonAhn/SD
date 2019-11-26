import { Globals } from './../../util/globals';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public globals: Globals
  ) { }

  ngOnInit() { }

  changePage(page) {
    switch (page) {
      case "hotel":
        this.router.navigate(['/hotel'])
        break;
      case "funcionario":
        this.router.navigate(['/funcionario'])
        break;
      case "staties":
        this.router.navigate(['/staties'])
        break;
      case "page3":
        this.router.navigate(['/page3'])
        break;
      case "page4":
        this.router.navigate(['/page4'])
        break;
      default:
        break;
    }
  }

  logout() {
    sessionStorage.clear();
    this.globals.logado = false;
    this.router.navigate(['/'])
  }

}
