import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class Globals {

    logado: boolean = false;
    sidebar: boolean = false;
    admin: boolean = false;

    masks = {
        "cpf": [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        "cnpj": [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        "hora": [/\d/, /\d/, ':', /\d/, /\d/],
        "data": [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    }

    pageSizeDefault = 10;


    static showToaster(msg: string, toasterService: ToasterService, res: any) {
      if (res.statusCode === 200 || res.statusCode === 201) {
        toasterService.pop(
          'success',
          msg + ' Salvo!',
          'Cadastro salvo com sucesso.'
        );
      } else {
        toasterService.pop('error', 'Erro!', res.body.message);
      }
    }

    public static noWhitespaceValidator(control: FormControl) {
      const value: string = (control && control.value) ? control.value.toString() : '';
      const isWhitespace = value.trim().length === 0;
      const isValid = !isWhitespace;

      return isValid ? null : { whitespace: true };
    }

    public static removeSpacesForm(form: FormGroup) {
      Object.keys(form.controls).forEach(key => {
        if (typeof form.controls[key].value === 'string') {
          form.controls[key].setValue(form.controls[key].value.trim());
          form.controls[key].setValue(form.controls[key].value.replace(/\s+/g, ' '));
        }
      });
    }

}
