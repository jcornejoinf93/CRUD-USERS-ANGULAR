import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

//components
import { HomeComponent } from './home/home.component';
import { CrudComponent } from './crud/crud.component';
import { TableComponent } from './shared/table/table.component';





@NgModule({
  declarations: [
    HomeComponent,
    CrudComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    //HomeComponent,
    //CrudComponent,
    //TableComponent
  ]
})
export class PagesModule { }
