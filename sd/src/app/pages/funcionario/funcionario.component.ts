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
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @BlockUI() blockUi: NgBlockUI;

  dataSource = new MatTableDataSource();
  public funcionarioFilter: FormGroup;
  public hoteis: [];
  public pageTotal;

  filterParams: FilterParams[];

  //hotel
  displayedColumns: string[] = [ 'id', 'name', 'age', 'cpf', 'hotel', 'actions' ];

  constructor(
    private formBuilder: FormBuilder,
    private bffService: ConnectBffService,
    private toasterService: ToasterService,
    private dialog: MatDialog,
    public global: Globals,
  ) { }

  ngOnInit() {
    this.funcionarioFilter = this.formBuilder.group({
      name: [],
      age: [],
      cpf: [],
      hotel: []
    });
    this.getHoteis();
    this.filter();
  }

  getHoteis() {
    this.filterParams = [];
    this.filterParams.push(new FilterParams('pageNumber', null, this.paginator ? (this.paginator.pageIndex + 1).toString() : '1'));
    this.filterParams.push(new FilterParams('pageSize', null,
    this.paginator ? this.paginator.pageSize.toString() : this.global.pageSizeDefault.toString()));
    this.bffService.getGenericWithParams(environment.paths.hotel + '/find/', this.filterParams).then(res => {
      if (res.statusCode === 200) {
        this.hoteis = res.body;
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
    this.bffService.getGenericWithParams(environment.paths.funcionario + '/name/', this.filterParams).then(res => {
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
      this.getHoteis();
    });
  }

  getTotal() {
    this.buildFilters();
    this.bffService.getGenericWithParams(environment.paths.funcionario + '/count/', this.filterParams).then(res => {
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
    if (this.funcionarioFilter.controls.name.value) {
      this.filterParams.push(new FilterParams('name', '=', this.funcionarioFilter.controls.name.value.toUpperCase().trim().replace('  ', ' ')));
    }
    if (this.funcionarioFilter.controls.hotel.value && this.funcionarioFilter.controls.hotel.value != 'null') {
      this.filterParams.push(new FilterParams('hotel', '==', this.funcionarioFilter.controls.hotel.value));
    }

    this.filterParams.push(new FilterParams('pageNumber', null, this.paginator ? (this.paginator.pageIndex + 1).toString() : '1'));
    this.filterParams.push(new FilterParams('pageSize', null,
    this.paginator ? this.paginator.pageSize.toString() : this.global.pageSizeDefault.toString()));
    this.filterParams.push(new FilterParams('orderBy', null, 'name'));
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      data: { title: 'Funcionário', text: 'Deseja excluir permanentemente este Funcionário?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteData(id);
      }
    });
  }

  deleteData(id: string) {
    this.blockUi.start('Removendo Funcionário...');
    this.bffService.deleteGeneric(environment.paths.funcionario, id).then(res => {
      console.log(res);
      if (res.statusCode === 200) {
        this.filter();
        this.toasterService.pop('success', 'Funcionário excluído com sucesso!');
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
        this.toasterService.pop('error', 'Este Funcionário não pode ser excluído.');
      }
    }).catch(error => {
      console.error(error);
      this.toasterService.pop('error', 'Este Funcionário o não pode ser excluído.');
    }).finally(() => {
      this.blockUi.stop();
      this.filter();
    });
  }

}
