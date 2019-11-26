import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { RemoveModalComponent } from '../../components/remove-modal/remove-modal.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConnectBffService } from '../../services/connect-bff.service';
import { ToasterService } from 'angular2-toaster';
import { Globals } from '../../util/globals';
import { FilterParams } from '../../util/filter-params';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @BlockUI() blockUi: NgBlockUI;

  public DOMAIN_FILTERS = {
    'MUNICIPIO': 0,
    'PAIS': 1,
    'ESTADO': 2,
    'NOME_MUN': 3,
    'ATIVO': 4
  };

  public countries = [];
  public staties = [];

  filterParams: FilterParams[];
  dataSource = new MatTableDataSource();

  public cityFilter: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'active', 'actions'];
  public pageTotal;

  constructor(
    private formBuilder: FormBuilder,
    private bffService: ConnectBffService,
    private toasterService: ToasterService,
    private dialog: MatDialog,
    public global: Globals,
  ) {
  }

  ngOnInit() {
    this.cityFilter = this.formBuilder.group({
      name: [''],
      country: [''],
      state: [''],
      onlyActive: [false]
    });

    this.getCountries();
    this.filter(0, true);
  }

  buildFilters() {
    this.filterParams = [];
    if (this.cityFilter.controls.onlyActive.value) {
      this.filterParams.push(new FilterParams('active', '==', this.cityFilter.controls.onlyActive.value));
    }

    if (this.cityFilter.controls.country.value) {
      this.filterParams.push(new FilterParams('country', '=', this.cityFilter.controls.country.value));
    }

    if (this.cityFilter.controls.state.value) {
      this.filterParams.push(new FilterParams('state', '=', this.cityFilter.controls.state.value));
    }

    if (this.cityFilter.controls.name.value) {
      this.filterParams.push(new FilterParams('name', '=', this.cityFilter.controls.name.value.toUpperCase()));
    }

    this.filterParams.push(new FilterParams('pageNumber', null, this.paginator ? (this.paginator.pageIndex + 1).toString() : '1'));
    this.filterParams.push(new FilterParams('pageSize', null, this.paginator ? this.paginator.pageSize.toString() :
      this.global.pageSizeDefault.toString()));
    this.filterParams.push(new FilterParams('orderBy', null, '-active,name'));
  }

  filter(id, update, pageIndex?: number) {
    this.getTotal();
    this.bffService.getGenericWithParams(environment.paths.city + '/find/', this.filterParams).then(res => {
      if (res.statusCode === 200) {
        if (!pageIndex && this.paginator) {
          this.paginator.firstPage();
        }

        if (res.body.length > 0) {
          this.dataSource = res.body;
        } else {
          this.dataSource = null;
        }
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
      }

      if (update) {
        if (id == this.DOMAIN_FILTERS.PAIS) {
          this.getStates(this.cityFilter.controls.country.value);
        }
      }
    }).catch(error => {
      if (update) {
        if (id == this.DOMAIN_FILTERS.PAIS) {
          this.getStates(this.cityFilter.controls.country.value);
        }
      }
      console.error(error);
    });
  }

  getTotal() {
    this.buildFilters();
    this.bffService.getGenericWithParams(environment.paths.city + '/count/', this.filterParams).then(res => {
      if (res.statusCode === 200) {
        if (res.body) {
          this.pageTotal = res.body;
        } else {
          this.pageTotal = 0;
        }
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
      }
    }).catch(error => {
      console.error(error);
    });
  }

  getCountries() {
    this.filterParams = [];
    this.filterParams.push(new FilterParams('active', '==', 'true'));
    this.filterParams.push(new FilterParams('orderBy', null, 'name'));

    this.bffService.getGenericWithParams(environment.paths.country + '/find/', this.filterParams).then(res => {
      console.log(res.body);
      this.countries = res.body;
      if (this.countries.length > 0) {
        let exist = false;

        for (let i = 0; i < this.countries.length; i++) {
          if (this.countries[i].initials === 'BR') {
            exist = true;
            this.cityFilter.controls.country.setValue(this.countries[i].id);

            break;
          }
        }

        if (!exist) {
          this.filter(this.DOMAIN_FILTERS.PAIS, false);
          this.getStates(null);
        } else {
          this.getStates(this.cityFilter.controls.country.value);
        }
      }
    }).catch(error => {
      console.error(error);
    });
  }

  getStates(id) {
    let filterParams = [];
    if (id) {
      filterParams.push(new FilterParams('active', null, 'true'));
      filterParams.push(new FilterParams('country', '=', id));
      this.filterParams.push(new FilterParams('orderBy', null, 'name'));
    } else {
      this.cityFilter.controls.state.setValue(0);
      this.filter('orderBy', null, 1);
    }
    this.bffService.getGenericWithParams(environment.paths.state + '/find/', filterParams).then(res => {
      this.staties = res.body;
      if (this.staties.length > 0) {
        let exist = false;

        for (let i = 0; i < this.staties.length; i++) {
          if (this.staties[i].initials === 'RS') {
            exist = true;
            this.cityFilter.controls.state.setValue(this.staties[i].id);
            break;
          }
        }

        if (!exist) {
          this.cityFilter.controls.state.setValue(null)
          this.filter(this.DOMAIN_FILTERS.PAIS, false);
          return;
        }

        this.filter(this.DOMAIN_FILTERS.ESTADO, true);
      }
    }).catch(error => {
      console.error(error);
    });
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      data: { title: 'Município', text: 'Deseja excluir permanentemente esse Municipio?' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.deleteData(id);
    });
  }

  onPageSwitch(event) {
    this.filter(0, true, event.pageIndex);
  }

  deleteData(id: string) {
    this.blockUi.start('Removendo Município...');
    this.bffService.deleteGeneric(environment.paths.city, id).then(res => {
      if (res.statusCode === 200) {
        this.filter(0, true);
        this.toasterService.pop('success', 'Município excluído com sucesso!');
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
        this.toasterService.pop('error', 'Este Município não pode ser excluído, apenas desativado.');
      }
    }).catch(error => {
      console.error(error);
      this.toasterService.pop('error', 'Este município o não pode ser excluído, apenas desativado.');
    }).finally(() => {
      this.blockUi.stop();
      this.filter(0, true);
    });
  }

}
