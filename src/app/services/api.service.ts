import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Security } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class Api {
  readonly url: string = 'http://localhost:5000/dk/api';

  constructor(public http: HttpClient, private securityService : Security) { }

  get(endpoint: string, params?: any, reqOpts?: any){
    if(!reqOpts){
      reqOpts = {
        params: new HttpParams()
      };
    }
    if(params){
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?:any){
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?:any){

    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?:any){
    return this.http.put(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?:any){
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

}
