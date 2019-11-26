import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ConnectBffService } from '../../../services/connect-bff.service';
import { Globals } from '../../../util/globals';
import { FilterParams } from '../../../util/filter-params';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrls: [ './country-create.component.css' ]
})
export class CountryCreateComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI;

  public countryForm: FormGroup;
  public submitted = false;
  public haveId = false;

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
    return this.countryForm.controls;
  }

  ngOnInit() {
    this.countryForm = this.formBuilder.group({
      name: [ '', [Validators.required, Globals.noWhitespaceValidator] ],
      key: [ '' ],
      initials: [ '', [Validators.required, Globals.noWhitespaceValidator] ],
      internationalName: [ '' ],
      reducedName: [ '' ],
      nationality: [ '', [Validators.required, Globals.noWhitespaceValidator] ],
      marketCode: [ '' ],
      isoCode: [ '' ],
      sisbacenCode: [ '' ],
      ibgeCode: [ '', [Validators.required, Globals.noWhitespaceValidator] ],
      initialTwoP: [ '' ],
      active: [ true ]
    });

    this.getCountry(this.route.snapshot.params.id);
  }

  public cancel() {
    this.router.navigate([ '/countries' ]);
  }

  public create() {
    this.submitted = true;
    if (this.validate()) {
      this.blockUi.start('Cadastrando');
      if (this.route.snapshot.params.id) {
        this.countryForm.value.id = this.route.snapshot.params.id;
        this.bffService.putGeneric(environment.paths.country, this.countryForm.value).then(res => {
          Globals.showToaster('País', this.toasterService, res);
          this.blockUi.stop();
          if (res.statusCode === 200) {
            this.router.navigate([ '/countries' ]);
          }
        }).catch(error => {
          this.blockUi.stop();
          this.toasterService.pop('error', 'Request', 'Erro interno.');
          console.error(error);
        });
      } else {
        this.bffService.postGeneric(environment.paths.country, this.countryForm.value).then(res => {
          Globals.showToaster('País', this.toasterService, res);
          this.blockUi.stop();
          if (res.statusCode === 200) {
            this.router.navigate([ '/countries' ]);
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
    Globals.removeSpacesForm(this.countryForm);
    if (!this.countryForm.controls.name.valid) {
      this.toasterService.pop('warning', 'País não salvo!', 'Nome é obrigatório.');
      return false;
    } else if (!this.countryForm.controls.initials.valid) {
      this.toasterService.pop('warning', 'País não salvo!', 'Sigla é obrigatória.');
      return false;
    } else if (!this.countryForm.controls.nationality.valid) {
      this.toasterService.pop('warning', 'País não salvo!', 'Nacionalidade é obrigatória.');
      return false;
    } else if (!this.countryForm.controls.ibgeCode.valid) {
      this.toasterService.pop('warning', 'País não salvo!', 'Código IBGE é obrigatório.');
      return false;
    }
    return true;
  }

  getCountry(id) {
    if (id) {
      const filterParams = [ new FilterParams('id', '==', id) ];
      this.bffService.getGenericWithParams(environment.paths.country + '/find/', filterParams).then(res => {
        if (res.body[0].id) {
          const country = res.body[0];
          this.countryForm = this.formBuilder.group({
            name: [ country.name, [Validators.required, Globals.noWhitespaceValidator] ],
            key: [ country.key ],
            initials: [ country.initials, [Validators.required, Globals.noWhitespaceValidator] ],
            internationalName: [ country.internationalName ],
            reducedName: [ country.reducedName ],
            nationality: [ country.nationality, [Validators.required, Globals.noWhitespaceValidator] ],
            marketCode: [ country.marketCode ],
            isoCode: [ country.isoCode ],
            sisbacenCode: [ country.sisbacenCode ],
            ibgeCode: [ country.ibgeCode, [Validators.required, Globals.noWhitespaceValidator] ],
            initialTwoP: [ country.initialTwoP ],
            active: [ country.active ],
            id: this.route.snapshot.params.id
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
