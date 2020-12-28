import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersModels } from '../models/users.model';
import { environment } from '../../environments/environment.prod';

const base_url = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})



export class CrudNodeService {

  //url = 'http://localhost:3000/api/v1/';

  constructor( private http: HttpClient ) {}

  getUsers(){
    return this.http.get(`${ base_url }users`);
  }

  addUser( user: any ){
    return this.http.post(`${ base_url }users`, user);
  }

  updateUser( id: number, user: UsersModels ){
    console.log(id, user);
   return this.http.put(`${ base_url }users/${ id }`, user);
  }

  deleteUser(id: number){
    return this.http.delete(`${ base_url }users/${ id }`);
  }
}
