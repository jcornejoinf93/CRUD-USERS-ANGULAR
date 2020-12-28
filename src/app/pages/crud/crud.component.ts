import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudNodeService } from '../../services/crud-node.service';
import { UsersModels } from '../../models/users.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  form: FormGroup;
  users: UsersModels[] = [];
  user: UsersModels;
  idAux: number;

  constructor( private fb: FormBuilder,
               private _crudService: CrudNodeService ) {
    this.createForm();
   }
 
  ngOnInit(): void {
    this._crudService.getUsers().subscribe( (resp: UsersModels[]) => {
      //console.log(resp)
      this.users = resp;
    });
  }

  get nameInvalid(){
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get ageInvalid(){
    return this.form.get('age').invalid && this.form.get('age').touched;
  }

  get usernameInvalid(){
    return this.form.get('username').invalid && this.form.get('username').touched;
  }


  createForm(){

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['',[ Validators.required ]],
      username: ['',[ Validators.required, Validators.minLength(6)]]
    });
  }

  saveUser(){
    if( this.form.invalid ){
      Swal.fire({
        icon: 'error',
        title: 'It has not been possible to add the user',
        text: 'Try again!',
      });
      return null;
    }
    this._crudService.addUser( this.form.value ).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'User added successfully',
      });
      this._crudService.getUsers().subscribe( (resp: UsersModels[]) => this.users = resp );
    }//, ( err ) => {
     // Swal.fire({
     //   icon: 'error',
     //   title: 'It has not been possible to add the user',
     //   text: 'Try again!',
     // });
   // }
    );
    this.form.reset();
  }

  selectOutput(data){
    //console.log('Mostrando información desde el padre', data);
    this.form.setValue({
       name: data.name,
       age: data.age,
       username: data.username
    });
    this.idAux = data.id;
  }

  updateUser(){

    if(this.form.invalid){

      Swal.fire({
        icon: 'error',
        title: 'Your must select a record from the table',
      });

      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(this.form.value)

        this._crudService.updateUser( this.idAux , this.form.value ).subscribe( (resp: any) => {
          //console.log(resp);
          this._crudService.getUsers().subscribe( (resp: UsersModels[]) => this.users = resp );

        }
        );


        Swal.fire(
          'Updated!',
          'Your file has been updated.',
          'success'
        )
      }
    })
  }

  deleteUser(){

    if(this.form.invalid){

      Swal.fire({
        icon: 'error',
        title: 'Your must select a record from the table',
      });

      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this._crudService.deleteUser(this.idAux).subscribe( resp => {
            this._crudService.getUsers().subscribe( (resp: UsersModels[]) => this.users = resp);
        });

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    });
  }

}
