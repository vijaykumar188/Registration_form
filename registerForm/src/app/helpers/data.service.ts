import { Injectable } from '@angular/core';
import { InMemoryDbService} from 'angular-in-memory-web-api';
import { user } from './user-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }


  createDb(){
    let users : user[] = [
      {id:1, title:'mr', firstName:'ajeeth',lastName:'power',dob:'12-01-2022',email:'ajith@test.com',password:'123456',acceptTerms:true},
      {id:2, title:'mrs', firstName:'ajay',lastName:'pawsker',dob:'16-01-2020',email:'ajay@test.com',password:'12345623',acceptTerms:true},
      {id:3, title:'miss', firstName:'anjali',lastName:'raj',dob:'17-08-2021',email:'anjalih@test.com',password:'1289456',acceptTerms:true}
    ];

    return { users };
  }


}
