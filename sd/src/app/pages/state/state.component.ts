import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { RemoveModalComponent } from '../../components/remove-modal/remove-modal.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConnectBffService } from '../../services/connect-bff.service';
import { ToasterService } from 'angular2-toaster';
import { Globals } from '../../util/globals';
import { FilterParams } from '../../util/filter-params';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: [ './state.component.css' ]
})
export class StateComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @BlockUI() blockUi: NgBlockUI;

  dataSource = new MatTableDataSource();
  public stateFilter: FormGroup;
  public countries: [];
  public pageTotal;

  filterParams: FilterParams[];

  displayedColumns: string[] = [ 'id', 'name', 'active', 'actions' ];

  constructor(
    private formBuilder: FormBuilder,
    private bffService: ConnectBffService,
    private toasterService: ToasterService,
    private dialog: MatDialog,
    public global: Globals, ) {
  }

  ngOnInit() {
    this.stateFilter = this.formBuilder.group({
      name: [],
      onlyActive: [],
      country: []
    });
    this.getCountries();
    this.filter();
  }

  getCountries() {
    this.filterParams = [new FilterParams('', '', '&orderBy=name')];
    this.bffService.getGenericWithParams(environment.paths.country + '/find/', this.filterParams).then(res => {
      if (res.statusCode === 200) {
        this.countries = res.body;
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
      }
    }).catch(error => {
      console.error(error);
    });
  }

  onPageSwitch(event) {
    this.filter(event.pageIndex);
  }

  filter(pageIndex?: number) {
    this.getTotal();
    this.bffService.getGenericWithParams(environment.paths.state + '/find/', this.filterParams).then(res => {
      if (res.statusCode === 200) {
        if (!pageIndex) {
          this.paginator.firstPage();
        }
        if (res.body) {
          this.dataSource = res.body;
        } else {
          this.dataSource = null;
        }
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
      }
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.getCountries();
    });
  }

  getTotal() {
    this.buildFilters();
    this.bffService.getGenericWithParams(environment.paths.state + '/count/', this.filterParams).then(res => {
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

  buildFilters() {

    this.filterParams = [];
    if (this.stateFilter.controls.name.value) {
      this.filterParams.push(new FilterParams('name', '=', this.stateFilter.controls.name.value.toUpperCase().trim().replace('  ', ' ')));
    }
    if (this.stateFilter.controls.country.value) {
      this.filterParams.push(new FilterParams('country', '==', this.stateFilter.controls.country.value));
    }
    if (this.stateFilter.controls.onlyActive.value) {
      this.filterParams.push(new FilterParams('active', '==', this.stateFilter.controls.onlyActive.value));
    }

    this.filterParams.push(new FilterParams('pageNumber', null, this.paginator ? (this.paginator.pageIndex + 1).toString() : '1'));
    this.filterParams.push(new FilterParams('pageSize', null,
    this.paginator ? this.paginator.pageSize.toString() : this.global.pageSizeDefault.toString()));
    this.filterParams.push(new FilterParams('orderBy', null, '-active,name'));
  }



  openDialog(id: string): void {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      data: { title: 'UF', text: 'Deseja excluir permanentemente esta Estado?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteData(id);
      }
    });
  }

  deleteData(id: string) {
    this.blockUi.start('Removendo Estado...');
    this.bffService.deleteGeneric(environment.paths.state, id).then(res => {
      if (res.statusCode === 200) {
        this.filter();
        this.toasterService.pop('success', 'Estado excluído com sucesso!');
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
        this.toasterService.pop('error', 'Este Estado não pode ser excluído, apenas desativado.');
      }
    }).catch(error => {
      console.error(error);
      this.toasterService.pop('error', 'Este estado o não pode ser excluído, apenas desativado.');
    }).finally(() => {
      this.blockUi.stop();
      this.filter();
    });
  }
}
