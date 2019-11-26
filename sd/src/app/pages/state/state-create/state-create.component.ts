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
  selector: 'app-state-create',
  templateUrl: './state-create.component.html',
  styleUrls: [ './state-create.component.css' ]
})
export class StateCreateComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI;

  public brasilId = '';
  public isBrazil: boolean;
  public countries: any[];
  public countryName: string;
  public regions: any[];
  public stateForm: FormGroup;
  public submitted = false;
  public haveId = false;
  public stateId;
  filterParams: FilterParams[];

  constructor(
    private toasterService: ToasterService,
    private formBuilder: FormBuilder,
    private router: Router,
    private bffService: ConnectBffService,
    private route: ActivatedRoute,
    public global: Globals,
  ) {
  }

  get ef() {
    return this.stateForm.controls;
  }

  ngOnInit() {
    this.stateForm = this.formBuilder.group({
      name: [ '', [ Validators.required, Globals.noWhitespaceValidator ] ],
      country: [ '', [ Validators.required, Globals.noWhitespaceValidator ] ],
      key: [ '' ],
      initials: [ '', [ Validators.required, Globals.noWhitespaceValidator ] ],
      geographicRegion: [ null, Validators.required ],
      ibgeCode: [ '', [ Validators.required, Globals.noWhitespaceValidator ] ],
      active: [ true ]
    });
    this.stateId = this.route.snapshot.params.id;
    this.getRegions();
    this.getCountries();
    this.getStateById(this.route.snapshot.params.id);
  }

  public onChangeCountry() {
    if (this.brasilId === this.stateForm.controls.country.value) {
      this.stateForm.controls.geographicRegion.setValidators(Validators.required);
      this.stateForm.controls.ibgeCode.setValidators([ Validators.required, Globals.noWhitespaceValidator ]);
      this.isBrazil = true;
    } else {
      this.stateForm.controls.geographicRegion.clearValidators();
      this.stateForm.controls.ibgeCode.clearValidators();
      this.isBrazil = false;
    }
    this.stateForm.controls.geographicRegion.updateValueAndValidity();
    this.stateForm.controls.ibgeCode.updateValueAndValidity();
  }

  public cancel() {
    this.router.navigate([ '/staties' ]);
  }

  public create() {
    this.submitted = true;
    if (this.validate()) {
      this.blockUi.start('Cadastrando');
      const obj = this.stateForm.value;
      if (this.stateId) {
        obj.id = this.stateId;
        this.bffService.putGeneric(environment.paths.state, obj).then(res => {
          Globals.showToaster('Estado', this.toasterService, res);
          this.blockUi.stop();
          if (res.statusCode === 200) {
            this.router.navigate([ '/staties' ]);
          }
        }).catch(error => {
          this.blockUi.stop();
          this.toasterService.pop('error', 'Request', 'Erro interno.');
          console.error(error);
        });
      } else {
        this.bffService.postGeneric(environment.paths.state, obj).then(res => {
          Globals.showToaster('Estado', this.toasterService, res);
          this.blockUi.stop();
          if (res.statusCode === 200) {
            this.router.navigate([ '/staties' ]);
          }
        }).catch(error => {
          this.blockUi.stop();
          this.toasterService.pop('error', 'Request', 'Erro interno.');
          console.error(error);
        });
      }
    }
  }

  getCountries() {
    const filterParams =  [new FilterParams('orderBy', null, 'name')];
    this.bffService.getGenericWithParams(environment.paths.country + '/find/', filterParams).then(res => {
      this.countries = res.body;
      const c = res.body.find(country => country.name.toUpperCase() === 'BRASIL');
      if (c) {
        if (!this.haveId) {
          this.stateForm.controls.country.setValue(c.id);
          this.isBrazil = true;
        }
        this.brasilId = c.id.toString();
      }

    }).catch(error => {
      console.error(error);
    });
  }

  validate(): boolean {
    Globals.removeSpacesForm(this.stateForm);
    if (!this.stateForm.controls.country.valid) {
      this.toasterService.pop('warning', 'Estado não salvo!', 'País é obrigatório.');
      return false;
    } else if (!this.stateForm.controls.name.valid) {
      this.toasterService.pop('warning', 'Estado não salvo!', 'Nome é obrigatório.');
      return false;
    } else if (!this.stateForm.controls.initials.valid) {
      this.toasterService.pop('warning', 'Estado não salvo!', 'Sigla é obrigatória.');
      return false;
    } else {
      if (this.brasilId == this.stateForm.controls.country.value) {
        if (!this.stateForm.controls.geographicRegion.value) {
          this.toasterService.pop('warning', 'Estado não salvo!', 'Região geográfica é obrigatória.');
          return false;
        } else if (!this.stateForm.controls.ibgeCode.value) {
          this.toasterService.pop('warning', 'Estado não salvo!', 'Código IBGE é obrigatório.');
          return false;
        }
      }
      return true;
    }
  }

  getStateById(id) {
    if (id) {
      const filterParams = [ new FilterParams('id', '==', id) ];
      this.bffService.getGenericWithParams(environment.paths.state + '/find/', filterParams).then(res => {
        if (res.body[0].id) {
          const state = res.body[0];
          this.stateForm = this.formBuilder.group({
            name: [ state.name, [ Validators.required, Globals.noWhitespaceValidator ] ],
            key: [ state.key ],
            initials: [ state.initials, [ Validators.required, Globals.noWhitespaceValidator ] ],
            active: [ state.active ],
            country: [ state.country, [ Validators.required, Globals.noWhitespaceValidator ] ],
            ibgeCode: [ state.ibgeCode ],
            geographicRegion: [ state.geographicRegion ],
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

  getRegions() {
    this.bffService.getGenericAll(environment.paths.state + '/regions').then(res => {
      this.regions = res.body;
    }).catch(error => {
      console.error(error);
    });
  }
}
