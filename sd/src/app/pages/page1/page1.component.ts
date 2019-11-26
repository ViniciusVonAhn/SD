import { environment } from 'src/environments/environment';
import { ConnectBffService } from './../../services/connect-bff.service';
import { Globals } from './../../util/globals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  @BlockUI() blockUi: NgBlockUI

  public exampleForm: FormGroup;
  public modelExample = {};
  public submitted = false;

  constructor(
    private toasterService: ToasterService,
    private formBuilder: FormBuilder,
    private bffService: ConnectBffService,
    public globals: Globals,
  ) { }

  ngOnInit() {
    this.exampleForm = this.formBuilder.group({
      input1: ['', Validators.required]
    });
  }

  get ef() { return this.exampleForm.controls; }

  public disableCampos() {
    this.exampleForm.controls["input1"].disable();
  }

  // public ok() {
  //   this.submitted = true;


  //   if (this.exampleForm.valid) {
  //     console.log(this.exampleForm);
  //     this.toasterService.pop("success", "Formulário", "Válido.");
  //     this.blockUi.start("Teste BlockUI")
  //     this.bffService.getGenericId(environment.paths.person, this.exampleForm.get('input1').value).then(res => {
  //       this.blockUi.stop();
  //       alert(JSON.stringify(res))
  //     }).catch(error => {
  //       this.blockUi.stop();
  //       this.toasterService.pop("error", "Request", "Erro interno.");
  //       console.error(error);
  //     });

  //   } else {
  //     this.toasterService.pop("error", "Formulário", "Inválido.");
  //   }
  // }
}
