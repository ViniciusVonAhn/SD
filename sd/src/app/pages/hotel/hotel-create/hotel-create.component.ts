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
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css']
})
export class HotelCreateComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI;

  public hotelForm: FormGroup;
  public submitted = false;
  public haveId = false;

  constructor(
    private toasterService: ToasterService,
    private formBuilder: FormBuilder,
    private router: Router,
    private bffService: ConnectBffService,
    private route: ActivatedRoute,
    public global: Globals,
  ) { }

  ngOnInit() {
    this.hotelForm = this.formBuilder.group({
      name: [ '', [Validators.required, Globals.noWhitespaceValidator] ],
      cnpj: [ '', [Validators.required, Globals.noWhitespaceValidator] ],
      city: [ '', [Validators.required, Globals.noWhitespaceValidator] ],
    });

    this.getHotel(this.route.snapshot.params.id);
  }

  public cancel() {
    this.router.navigate([ '/hotel' ]);
  }

  public create() {
    this.submitted = true;
    if (this.validate()) {
      this.blockUi.start('Cadastrando');
      if (this.route.snapshot.params.id) {
        this.hotelForm.value.id = this.route.snapshot.params.id;
        this.bffService.putGeneric(environment.paths.hotel, this.hotelForm.value).then(res => {
          Globals.showToaster('Hotel', this.toasterService, res);
          this.blockUi.stop();
          if (res.statusCode === 200) {
            this.router.navigate([ '/hotel' ]);
          }
        }).catch(error => {
          this.blockUi.stop();
          this.toasterService.pop('error', 'Request', 'Erro interno.');
          console.error(error);
        });
      } else {
        this.bffService.postGeneric(environment.paths.hotel, this.hotelForm.value).then(res => {
          Globals.showToaster('Hotel', this.toasterService, res);
          this.blockUi.stop();
          if (res.statusCode === 200) {
            this.router.navigate([ '/hotel' ]);
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
    Globals.removeSpacesForm(this.hotelForm);
    if (!this.hotelForm.controls.name.valid) {
      this.toasterService.pop('warning', 'Hotel não salvo!', 'Nome é obrigatório.');
      return false;
    } else if (!this.hotelForm.controls.cnpj.valid) {
      this.toasterService.pop('warning', 'Hotel não salvo!', 'CNPJ é obrigatório.');
      return false;
    } else if (!this.hotelForm.controls.city.valid) {
      this.toasterService.pop('warning', 'Hotel não salvo!', 'Cidade é obrigatória.');
      return false;
    }
    return true;
  }

  getHotel(id) {
    if (id) {
      const filterParams = [ new FilterParams('id', '==', id) ];
      this.bffService.getGenericWithParams(environment.paths.hotel + '/find/', filterParams).then(res => {
        if (res.body[0].id) {
          const hotel = res.body[0];
          this.hotelForm = this.formBuilder.group({
            name: [ hotel.name, [Validators.required, Globals.noWhitespaceValidator] ],
            cnpj: [ hotel.cnpj, [Validators.required, Globals.noWhitespaceValidator] ],
            city: [ hotel.city, [Validators.required, Globals.noWhitespaceValidator] ],
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

  get ef() {
    return this.hotelForm.controls;
  }

}
