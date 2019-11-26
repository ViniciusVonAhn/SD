import { environment } from './../../../../environments/environment';
import { ConnectBffService } from './../../../services/connect-bff.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { RemoveModalComponent } from '../../../components/remove-modal/remove-modal.component';
import { ToasterService } from 'angular2-toaster';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Globals } from '../../../util/globals';
import { FilterParams } from '../../../util/filter-params';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css']
})
export class CityCreateComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @BlockUI() blockUi: NgBlockUI;

  public groups = [];
  public countries = [];
  public staties = [];
  public cities = [];

  public cityForm: FormGroup;
  public submitted = false;
  public haveId = false;
  public isValidUf = false;

  public update = false;

  filterParams: FilterParams[];
  filterFParams: FilterParams[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'group', 'descricaoMun', 'actions'];
  public pageTotal;

  public sequenceCode = 0;

  constructor(
    private toasterService: ToasterService,
    private formBuilder: FormBuilder,
    private router: Router,
    private bffService: ConnectBffService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public global: Globals,
  ) {
  }

  async ngOnInit() {
    this.cityForm = this.formBuilder.group({
      key: [''],
      country: ['', Validators.required],
      state: [''],
      name: ['', Validators.required],
      codeIbge: [''],
      codeRfb: [''],
      codeMec: [''],
      codeDetran: [''],
      capital: [''],
      metropolitanRegion: [''],
      active: [true]
    });

    await this.getCountries();
    await this.getCities();
  }

  public cancel() {
    this.router.navigate(['/city']);
  }

  public create() {
    this.submitted = true;
    if (this.validate()) {
      this.blockUi.start('Cadastrando');
      if (this.route.snapshot.params.id) {
        this.cityForm.value.id = this.route.snapshot.params.id;
        this.bffService.putGeneric(environment.paths.city, this.cityForm.value).then(res => {
          if (res.statusCode === 200) {
            this.toasterService.pop('success', 'Municipio Atualizado!', 'Cadastro salvo com sucesso.');
            this.router.navigate(['/cities']);
          } else {
            this.toasterService.pop('error', 'Erro!', res.body.message);
          }
          this.blockUi.stop();
        }).catch(error => {
          this.blockUi.stop();
          this.toasterService.pop('error', 'Request', 'Erro interno.');
          console.error(error);
        });
      } else {
        this.bffService.postGeneric(environment.paths.city, this.cityForm.value).then(res => {
          if (res.statusCode === 200) {
            this.toasterService.pop('success', 'Municipio Salvo!', 'Cadastro salvo com sucesso.');
            this.router.navigate(['/cities']);
          } else {
            this.toasterService.pop('error', 'Erro!', res.body.message);
          }
          this.blockUi.stop();
        }).catch(error => {
          this.blockUi.stop();
          this.toasterService.pop('error', 'Request', 'Erro interno.');
          console.error(error);
        });
      }
    }
    // }
  }

  getCities() {
    let filterParams = [];
    filterParams.push(new FilterParams('active', null, "true"));
    filterParams.push(new FilterParams('orderBy', null, "name"));

    this.bffService.getGenericWithParams(environment.paths.city + "/find/", filterParams).then(res => {
      this.cities = res.body;
      console.log(res.body);
    }).catch(error => {
      console.error(error);
    });
  }

  getCountries() {
    let filterParams = [];
    filterParams.push(new FilterParams('active', null, "true"));
    filterParams.push(new FilterParams('orderBy', null, "name"));

    this.bffService.getGenericWithParams(environment.paths.country + '/find/', filterParams).then(res => {
      this.countries = res.body;
      if (this.countries.length > 0 && !this.route.snapshot.params.id) {
        this.isValidUf = false;
        for (let i = 0; i < this.countries.length; i++) {
          if (this.countries[i].initials == "BR") {
            this.isValidUf = true;
            this.cityForm.controls['country'].setValue(this.countries[i].id);

            this.cityForm.controls['codeIbge'].setValidators([Validators.required]);
            this.cityForm.controls['codeIbge'].updateValueAndValidity();

            this.cityForm.controls['state'].setValidators([Validators.required]);
            this.cityForm.controls['state'].updateValueAndValidity();
            break;
          }
        }

        this.getStates(this.cityForm.controls.country.value);

        this.haveId = false;
        this.getLastIdMun();
      } else {
        this.getCityById(this.route.snapshot.params.id)
      }
    }).catch(error => {
      console.error(error);
    });
  }

  getStates(id, edit = false) {
    console.log(edit + " - " + id);
    let filterParams = [];
    if (id != null) {
      this.isValidUf = false;
      console.log(JSON.stringify(this.countries))
      for (let i = 0; i < this.countries.length; i++) {
        if (this.countries[i].id == id && this.countries[i].initials == "BR") {
          this.isValidUf = true;
          break;
        }
      }

      if (!this.isValidUf) {
        this.cityForm.controls.codeIbge.clearValidators();
        this.cityForm.controls['codeIbge'].updateValueAndValidity();

        this.cityForm.controls.state.clearValidators();
        this.cityForm.controls['state'].updateValueAndValidity();
      } else {
        this.cityForm.controls['codeIbge'].setValidators([Validators.required]);
        this.cityForm.controls['codeIbge'].updateValueAndValidity();

        this.cityForm.controls['state'].setValidators([Validators.required]);
        this.cityForm.controls['state'].updateValueAndValidity();
      }

      filterParams.push(new FilterParams('active', null, "true"));
      filterParams.push(new FilterParams('country', '=', id));
    } else {
      filterParams.push(new FilterParams('active', null, "true"));
    }

    filterParams.push(new FilterParams('orderBy', null, "name"));

    this.bffService.getGenericWithParams(environment.paths.state + "/find/", filterParams).then(res => {
      this.staties = res.body;
      if (this.staties.length > 0 && id != null && !edit) {

        for (let i = 0; i < this.staties.length; i++) {
          if (this.staties[i].initials == "RS") {
            this.cityForm.controls.state.setValue(this.staties[i].id);
            break;
          }
        }

      }
    }).catch(error => {
      console.error(error);
    });
  }

  validate(): Boolean {

    if (!this.cityForm.controls.country.valid) {
      this.toasterService.pop('warning', 'Município não salvo!', 'País é obrigatório.');
      return false;
    } else if (!this.cityForm.controls.state.valid && this.isValidUf) {
      this.toasterService.pop('warning', 'Município não salvo!', 'Estado é obrigatório.');
      return false;
    } else if (!this.cityForm.controls.name.valid) {
      this.toasterService.pop('warning', 'Município não salvo!', 'Nome é obrigatório.');
      return false;
    } else if (!this.cityForm.controls.codeIbge.valid && this.isValidUf) {
      this.toasterService.pop('warning', 'Município não salvo!', 'Código do IBGE é obrigatório.');
      return false;
    }

    return true;
  }

  getCityById(id) {
    if (id != undefined) {
      const filterParams = [new FilterParams('id', '==', id)];
      this.bffService.getGenericWithParams(environment.paths.city + '/find/', filterParams).then(res => {
        if (res.body[0].id) {
          const city = res.body[0];
          this.cityForm = this.formBuilder.group({
            key: [city.key],
            country: [city.country],
            state: [city.state],
            name: [city.name, Validators.required],
            codeIbge: [city.codeIbge],
            codeRfb: [city.codeRfb],
            codeMec: [city.codeMec],
            codeDetran: [city.codeDetran],
            capital: [city.capital],
            metropolitanRegion: [city.metropolitanRegion],
            active: [city.active]
          });

          this.haveId = true;

          this.sequenceCode = res.body[0].id;
          this.getStates(res.body[0].country, true);
        } else {
          this.haveId = false;
          this.getLastIdMun();
        }
      }).catch(error => {
        console.error(error);
      });
    } else {
      this.haveId = false;
      this.getLastIdMun();
    }
  }

  getLastIdMun() {
    console.log("res");
    this.bffService.getGenericAll(environment.paths.city).then(res => {
      if (res.statusCode === 200) {
        let allMun = res.body;

        let sequence = 0;
        for (let i = 0; i < allMun.length; i++) {
          sequence = allMun[i].id;
        }

        this.sequenceCode = sequence + 1;
      }
    })
  }

  openDialogMun(id: string): void {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      data: { title: 'UF', text: 'Deseja excluir permanentemente esse Municipio Filho?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteData(id);
      }
    });
  }

  deleteData(id: string) {
    this.blockUi.start('Removendo Município...');
    this.bffService.deleteGeneric(environment.paths.city, id).then(res => {
      if (res.statusCode === 200) {
        this.dataSource = new MatTableDataSource(res.body);
        this.dataSource.paginator = this.paginator;
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
      }
      this.toasterService.pop('success', 'Município excluído com sucesso!');
    }).catch(error => {
      console.error(error);
      this.toasterService.pop('error', 'Este município o não pode ser excluído, apenas desativado.');
    }).finally(() => {
      this.blockUi.stop();
      this.update = true;
      this.ngOnInit();
    });
  }

  get ef() {
    return this.cityForm.controls;
  }
}
