import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;

  public user: any = {};

  constructor(
    private router: Router,
    private toasterService: ToasterService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  get l() { return this.loginForm.controls; }

  public login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      sessionStorage.setItem("role", "ok");
      this.router.navigate(['/home']);
    } else {
      this.toasterService.pop("error", "Login", "Verifique os dados obrigatórios");
    }
  }

}
