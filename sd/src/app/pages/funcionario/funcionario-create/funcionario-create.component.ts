import { environment } from '../../../../environments/environment';
import { ConnectBffService } from '../../../services/connect-bff.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Globals } from '../../../util/globals';
import { FilterParams } from '../../../util/filter-params';

@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.css']
})
export class FuncionarioCreateComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI;

  public hoteis: any[];
  public hotelName: string;
  public funcionarioForm: FormGroup;
  public submitted = false;
  public haveId = false;
  public funcionarioId;
  filterParams: FilterParams[];

  constructor(
    private toasterService: ToasterService,
    private formBuilder: FormBuilder,
    private router: Router,
    private bffService: ConnectBffService,
    private route: ActivatedRoute,
    public global: Globals,
  ) { }

  ngOnInit() {
    this.funcionarioForm = this.formBuilder.group({
      name: [ '', [ Validators.required, Globals.noWhitespaceValidator ] ],
      hotel: [ '', [ Validators.required, Globals.noWhitespaceValidator ] ],
      cpf: [ '', [ Validators.required, Globals.noWhitespaceValidator ]  ],
      age: [ '', [ Validators.required, Globals.noWhitespaceValidator ] ],
    });
    this.funcionarioId = this.route.snapshot.params.id;
    this.getHoteis();
    this.getFuncionarioById(this.route.snapshot.params.id);
  }

  get ef() {
    return this.funcionarioForm.controls;
  }

  getHoteis() {
    const filterParams =  [new FilterParams('orderBy', null, 'name')];
    this.bffService.getGenericWithParams(environment.paths.hotel + '/find/', filterParams).then(res => {
      this.hoteis = res.body;
    }).catch(error => {
      console.error(error);
    });
  }

  public cancel() {
    this.router.navigate([ '/funcionario' ]);
  }

  public create() {
    this.submitted = true;
    if (this.validate()) {
      this.blockUi.start('Cadastrando');
      const obj = this.funcionarioForm.value;
      if (this.funcionarioId) {
        obj.id = this.funcionarioId;
        this.bffService.putGeneric(environment.paths.funcionario, obj).then(res => {
          Globals.showToaster('Funcionario', this.toasterService, res);
          this.blockUi.stop();
          if (res.statusCode === 200) {
            this.router.navigate([ '/funcionario' ]);
          }
        }).catch(error => {
          this.blockUi.stop();
          this.toasterService.pop('error', 'Request', 'Erro interno.');
          console.error(error);
        });
      } else {
        this.bffService.postGeneric(environment.paths.funcionario, obj).then(res => {
          Globals.showToaster('Funcionario', this.toasterService, res);
          this.blockUi.stop();
          if (res.statusCode === 200) {
            this.router.navigate([ '/funcionario' ]);
          }
        }).catch(error => {
          this.blockUi.stop();
          this.toasterService.pop('error', 'Request', 'Erro interno.');
          console.error(error);
        });
      }
    }
  }

  validate(): boolean {
    Globals.removeSpacesForm(this.funcionarioForm);
    if (!this.funcionarioForm.controls.hotel.valid) {
      this.toasterService.pop('warning', 'Funcionario não salvo!', 'Hotel é obrigatório.');
      return false;
    } else if (!this.funcionarioForm.controls.name.valid) {
      this.toasterService.pop('warning', 'Funcionario não salvo!', 'Nome é obrigatório.');
      return false;
    } else if (!this.funcionarioForm.controls.cpf.valid) {
      this.toasterService.pop('warning', 'Funcionario não salvo!', 'CPF é obrigatória.');
      return false;
    } else if (!this.funcionarioForm.controls.age.valid) {
      this.toasterService.pop('warning', 'Funcionario não salvo!', 'Idade é obrigatória.');
      return false;
    }
    return true;
  }

  getFuncionarioById(id) {
    if (id) {
      const filterParams = [ new FilterParams('id', '==', id) ];
      this.bffService.getGenericWithParams(environment.paths.funcionario + '/find/', filterParams).then(res => {
        if (res.body[0].id) {
          const funcionario = res.body[0];
          this.funcionarioForm = this.formBuilder.group({
            name: [ funcionario.name, [ Validators.required, Globals.noWhitespaceValidator ] ],
            age: [ funcionario.age, [ Validators.required, Globals.noWhitespaceValidator ] ],
            cpf: [ funcionario.cpf, [ Validators.required, Globals.noWhitespaceValidator ] ],
            hotel: [ funcionario.hotel, [ Validators.required, Globals.noWhitespaceValidator ] ],
          });
          this.haveId = true;
        } else {
          this.haveId = false;
        }
      }).catch(error => {
        console.error(error);
      });
    }
  }

}
