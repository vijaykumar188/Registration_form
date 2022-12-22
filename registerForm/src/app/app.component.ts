import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from './helpers/user.service';
import { user } from './helpers/user-interface';
import { DBOperations } from './helpers/db-operations';
import { mustMatch } from './helpers/mustMatch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'registerapp';
  users: any[] = [];
  submitted : boolean = false;
  buttonText : string = "Submit";
  dbops : DBOperations;
  // registerForm : FormGroup = new FormGroup({})
  registerForm: FormGroup;


  constructor(private fb: FormBuilder,
    private _userService: UserService) {

  }
  ngOnInit() {


    this.setFormState();
    this.getUsers();


    // swal.fire('helloo')
    // swal.fire('Oops...', 'Something went wrong!', 'error')

  }



  setFormState() {

    this.buttonText = "submit";
    this.dbops = DBOperations.create;
    this.registerForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      // dob: ['', Validators.compose([Validators.required, Validators.pattern(/^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/)])],
      dob: ['', Validators.compose([Validators.required])],
      password: ['',Validators.compose([ Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]

    },{
      Validators : mustMatch('password','confirmPassword')
    })
  }
  

  get f(){
    return this.registerForm.controls;
  }

  onSubmit() {

//console.log(this.registerForm.value)
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    switch(this.dbops){
      case DBOperations.create:
      this._userService.addUser(this.registerForm.value).subscribe(res => {

        
        this.getUsers();
        this.onCancel();

      });
      break;
      case DBOperations.update:
        this._userService.updateUser(this.registerForm.value).subscribe(res => {

          alert('userdded')
          this.getUsers();
          this.onCancel();
  
        });

      break;
    }

  }

  onCancel() {
    this.registerForm.reset();
    this.buttonText =  "Submit";
    this.dbops = DBOperations.create;
    this.submitted  = false;
  }

  getUsers() {
    this._userService.getUsers().subscribe((res: user[]) => {


      this.users = res;

      console.log(this.users)
    })
  }

  Edit(useId: number) {

    this.buttonText = "update";
    this.dbops = DBOperations.create;

    let use = this.users.find((u : user) => u.id === useId);
    this.registerForm.patchValue(use);

    this.registerForm.get('password').setValue('');
    this.registerForm.get('confirmPassword').setValue('');
    this.registerForm.get('acceptTerms').setValue('');
    
    // alert(useId);
  }

  Delete(useId: number) {

    // this._userService.deleteUser(useId).subscribe(res => {
    //   this.getUsers();
    // })

    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be ale to recover deleted record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'yes, delete it!',
      cancelButtonText: 'No keep it'

    }).then((result) => {
      if (result.value) {
        this._userService.deleteUser(useId).subscribe(res => {
          this.getUsers();
          swal.fire(
            'Deleted!',
            'Your record has been deleted',
            'success'
          )
        });


      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Canceled',
          'Your record is safe :',
          'error'
        )
      }
    })
  }
}
