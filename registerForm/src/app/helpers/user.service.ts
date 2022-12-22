import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from './user-interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  private SERVER_URL : string ="http://localhost:4200/api/"
  constructor(private _httpService : HttpClient) { }


  getUsers(){
    return this._httpService.get(this.SERVER_URL+"users");
  }

  getUser(useId:number){

    return this._httpService.get(`${this.SERVER_URL}users/${useId}`)

  }


  addUser(users:user){
    return this._httpService.post(`${this.SERVER_URL}users`, users)
  }


  updateUser(users:user){
    return this._httpService.put(`${this.SERVER_URL}users/${users.id}` ,users)
  }
  
  deleteUser(useId : number){
    return this._httpService.delete(`${this.SERVER_URL}users/ ${useId}`)
  }
}
