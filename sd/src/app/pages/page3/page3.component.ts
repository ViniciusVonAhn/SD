import { Globals } from './../../util/globals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {


  public exampleForm: FormGroup;
  public modelExample = {};
  public submitted = false;

  constructor(
    private toasterService: ToasterService,
    private formBuilder: FormBuilder,
    public globals: Globals,
  ) { }


  public itens = [
    { "value": true, "label": "True" },
    { "value": false, "label": "False" }
  ]
  
  ngOnInit() { 
    this.exampleForm = this.formBuilder.group({
      input1: ['', Validators.required],
      input2: ['', Validators.required],
      input3: ['', Validators.required],
      input4: ['', Validators.required],
      input5: ['', Validators.required],
      input6: ['', Validators.required],
      select1: ['', Validators.required],
      select2: ['', Validators.required],
      select3: ['', Validators.required],
      select4: ['', Validators.required],
      select5: ['', Validators.required],
      select6: ['', Validators.required],
      inputmask1: [],
      inputmask2: [],
      inputmask3: [],
      inputmask4: []
    });
  }
  
  get ef() { return this.exampleForm.controls; }

  public disableCampos() {
    this.exampleForm.controls["input1"].disable();
    this.exampleForm.controls["select1"].disable();
  }
  
  public salvar() {
    this.submitted = true;
    if (this.exampleForm.valid) {
      this.toasterService.pop("success", "Formulário", "Válido.");
    } else {
      this.toasterService.pop("error", "Formulário", "Inválido.");
    }
  }

}
