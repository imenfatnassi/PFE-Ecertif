import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Organisme } from 'src/app/shared/classes/Organisme';
import { CrudService } from './generic.service';




@Injectable({
  providedIn: 'root'
})
export class OrganismeService extends CrudService<Organisme> {


  static uri = environment.apiUrlOrganisme;


  constructor( protected readonly http: HttpClient) {
    super( http,OrganismeService.uri);
  }

}