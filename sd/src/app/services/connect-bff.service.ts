import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterParams } from '../util/filter-params';

@Injectable({
  providedIn: 'root'
})
export class ConnectBffService {

  constructor(
    protected http: HttpClient
  ) {
  }

  getGenericAll(path: string) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.urlBffConect + path + '/').subscribe(res => {
        resolve(res as any);
      }, erro => {
        reject(erro as any);
      });
    });
  }

  getGenericId(path: string, id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.urlBffConect + path + '/' + id).subscribe(res => {
        resolve(res as any);
      }, erro => {
        reject(erro as any);
      });
    });
  }

  getGenericWithParams(path: string, params: FilterParams[]) {
    let urlParams = '';
    for (const param of params) {
      urlParams = urlParams.concat(param.stringify).concat('&');
    }
    urlParams = urlParams.substring(0, urlParams.length - 1);
    console.log(environment.urlBffConect + path + urlParams);
    return new Promise<any>(((resolve, reject) => {
      this.http.get(environment.urlBffConect + path + urlParams).subscribe(res => {
        resolve(res as any);
      }, erro => {
        reject(erro as any);
      });
    }));
  }

  getGenericTwoParam(path: string, id: any, id2: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.urlBffConect + path + '/' + id + '/' + id2).subscribe(res => {
        resolve(res as any);
      }, erro => {
        reject(erro as any);
      });
    });
  }

  postGeneric(path: string, object: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.urlBffConect + path + '/', object).subscribe(res => {
        resolve(res as any);
      }, erro => {
        reject(erro as any);
      });
    });
  }

  putGeneric(path: string, object: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.put(environment.urlBffConect + path, object).subscribe(res => {
        resolve(res as any);
      }, erro => {
        reject(erro as any);
      });
    });
  }

  deleteGeneric(path: string, id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.delete(environment.urlBffConect + path + '/' + id).subscribe(res => {
        resolve(res as any);
      }, erro => {
        reject(erro as any);
      });
    });
  }
}
