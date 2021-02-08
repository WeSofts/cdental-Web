import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-carnet',
  templateUrl: './dialog-carnet.component.html',
  styleUrls: ['./dialog-carnet.component.css']
})
export class DialogCarnetComponent implements OnInit {

  abono = false;
  edit = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCarnetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data['carnet'] == null) {
      this.abono = true;
    }else{
      this.edit = true;
    }
    
  }

}
