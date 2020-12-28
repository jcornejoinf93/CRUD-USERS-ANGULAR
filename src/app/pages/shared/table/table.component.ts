import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudNodeService } from '../../../services/crud-node.service';
import { UsersModels } from '../../../models/users.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() userInput: UsersModels[] = [];
  @Output() selectRecord = new EventEmitter<UsersModels>();

  constructor( private _crudService: CrudNodeService ) { }

  ngOnInit(): void {}

  selectItem(item: UsersModels){
    //console.log('Mostrando información desde el hijo', item);
    this.selectRecord.emit(item);
    
  }

}
