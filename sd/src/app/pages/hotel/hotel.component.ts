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
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @BlockUI() blockUi: NgBlockUI;

  dataSource = new MatTableDataSource();

  deleteHotel = false;
  public hotelFilter: FormGroup;
  public pageTotal;

  filterParams: FilterParams[];
  displayedColumns: string[] = [ 'id', 'name', 'cnpj', 'city', 'actions' ];

  constructor(
    private formBuilder: FormBuilder,
    private bffService: ConnectBffService,
    private toasterService: ToasterService,
    private dialog: MatDialog,
    public global: Globals,
  ) { }

  ngOnInit() {
    this.hotelFilter = this.formBuilder.group({
      name: [ '' ],
      cnpj: [ '' ],
      city: [ '' ]
    });

    this.filter();
  }

  onPageSwitch(event) {
    this.filter(event.pageIndex);
  }

  filter(pageIndex?: number) {
    this.getTotal();
    this.bffService.getGenericWithParams(environment.paths.hotel + '/find/', this.filterParams).then(res => {
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
    this.bffService.getGenericWithParams(environment.paths.hotel + '/count/', this.filterParams).then(res => {
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
    if (this.hotelFilter.controls.name.value) {
      this.filterParams.push(new FilterParams('name', '=', this.hotelFilter.controls.name.value.toUpperCase().trim().replace('  ', ' ')));
    }

    this.filterParams.push(new FilterParams('pageNumber', null, this.paginator ? (this.paginator.pageIndex + 1).toString() : '1'));
    this.filterParams.push(new FilterParams('pageSize', null, this.paginator ? this.paginator.pageSize.toString() : this.global.pageSizeDefault.toString()));
    this.filterParams.push(new FilterParams('orderBy', null, 'name'));
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(RemoveModalComponent, {
      data: { title: 'Hotel', text: 'Deseja excluir permanentemente este Hotel?' }
    });

    dialogRef.afterClosed().subscribe(async result => {
      const filterParams = [new FilterParams('hotel', '==', id)];
      await this.bffService.getGenericWithParams(environment.paths.funcionario + '/find/', filterParams).then(res => {
        if (res) {
          console.log(res);
          if (res.statusCode === 200) {
            if (res.body.length > 0) {
              this.deleteHotel = false;
            } else if (res.body.length <= 0){
              this.deleteHotel = true;
            }
          }
        }
      }).catch(error => {
        console.error(error);
      });
      if (this.deleteHotel) {
        console.log('true');
        this.deleteData(id);
      } else if (!this.deleteHotel) {
        console.log('false');
        this.deleteData(null);
      }
    });
  }

  deleteData(id: string) {
    this.blockUi.start('Removendo hotel...');
    this.bffService.deleteGeneric(environment.paths.hotel, id).then(res => {
      if (res.statusCode === 200) {
        this.filter();
        this.toasterService.pop('success', 'Hotel excluído com sucesso!');
      } else {
        console.log(res.statusCode + ' - ' + res.statusMessage);
        this.toasterService.pop('error', 'Este Hotel não pode ser excluído.');
      }

    }).catch(error => {
      console.error(error);
      this.toasterService.pop('error', 'Este Hotel não pode ser excluído.');
    }).finally(() => {
      this.blockUi.stop();
      this.filter();
    });
  }

}
