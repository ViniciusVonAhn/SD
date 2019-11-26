import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ConnectBffService } from '../../services/connect-bff.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { RemoveModalComponent } from '../../components/remove-modal/remove-modal.component';
import { ToasterService } from 'angular2-toaster';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Globals } from '../../util/globals';
import { FilterParams } from '../../util/filter-params';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: [ './country.component.css' ]
})
export class CountryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @BlockUI() blockUi: NgBlockUI;

  dataSource = new MatTableDataSource();

  public countryFilter: FormGroup;
  public pageTotal;

  filterParams: FilterParams[];
  displayedColumns: string[] = [ 'id', 'name', 'initials', 'active', 'actions' ];

  constructor(
    private formBuilder: FormBuilder,
    private bffService: ConnectBffService,
    private toasterService: ToasterService,
    private dialog: MatDialog,
    public global: Globals,
  ) {
  }

  ngOnInit() {
    this.countryFilter = this.formBuilder.group({
      name: [ '' ],
      key: [ '' ],
      initials: [ '' ],
      onlyActive: [ false ]
    });
    this.filter();
  }

  onPageSwitch(event) {
    this.filter(event.pageIndex);
  }

  filter(pageIndex?: number) {
    this.getTotal();
    this.bffService.getGenericWithParams(environment.paths.country + '/find/', this.filterParams).then(res => {
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
    });
  }

  getTotal() {
    this.buildFilters();
    this.bffService.getGenericWithParams(environment.paths.country + '/count/', this.filterParams).then(res => {
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
    if (this.countryFilter.controls.name.value) {
      this.filterParams.push(new FilterParams('name', '=', this.countryFilter.controls.name.value.toUpperCase().trim().replace('  ', ' ')));
    }
    if (this.countryFilter.controls.onlyActive.value) {
      this.filterParams.push(new FilterParams('active', '==', this.countryFilter.controls.onlyActive.value));
    }

    this.filterParams.push(new FilterParams('pageNumber', null, this.paginator ? (this.paginator.pageIndex + 1).toString() : '1'));
    this.filterParams.push(new FilterParams('pageSize', null, this.paginator ? this.paginator.pageSize.toString() : this.global.pageSizeDefault.toString()));
    this.filterParams.push(new FilterParams('orderBy', null, '-active,name'));
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      data: { title: 'País', text: 'Deseja excluir permanentemente este País?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteData(id);
      }
    });
  }

  deleteData(id: string) {
    this.blockUi.start('Removendo país...');
    this.bffService.deleteGeneric(environment.paths.country, id).then(res => {
      if (res.statusCode === 200) {
        this.filter();
        this.toasterService.pop('success', 'País excluído com sucesso!');
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
        this.toasterService.pop('error', 'Este País não pode ser excluído, apenas desativado.');
      }

    }).catch(error => {
      console.error(error);
      this.toasterService.pop('error', 'Este País não pode ser excluído, apenas desativado.');
    }).finally(() => {
      this.blockUi.stop();
      this.filter();
    });
  }

}
