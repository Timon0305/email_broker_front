import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-item-table',
    templateUrl: './item-table.component.html',
    styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit {

    userTable: FormGroup;
    control: FormArray;
    mode: boolean;
    touchedRows: any;
    addButtonStatus: boolean = true;

    @Output() onChangeEvent = new EventEmitter<any>();

    constructor(
        private _formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.touchedRows = [];
        this.userTable = this._formBuilder.group({
            tableRows: this._formBuilder.array([])
        });
        this.addRow();
        this.userTable.valueChanges.subscribe(res => {
           if (this.userTable.valid) {
               this.addButtonStatus = true;
               this.onChangeEvent.emit(this.userTable.value);
           } else {
               this.addButtonStatus = false;
           }
        })
    }

    ngAfterOnInit() {
        this.control = this.userTable.get('tableRows') as FormArray;
    };

    initiateForm(): FormGroup {
        return this._formBuilder.group({
            itemName: [''],
            itemDescription: [''],
            itemQuantity: [''],
            itemUnit: [''],
            isEditable: [true]
        });
    }

    addRow() {
        const control = this.userTable.get('tableRows') as FormArray;
        control.push(this.initiateForm());
    };

    deleteRow(index: number) {
        const control = this.userTable.get('tableRows') as FormArray;
        control.removeAt(index)
    };

    get getFormControls() {
        return this.userTable.get('tableRows') as FormArray;
    };

    submitForm() {
        const control = this.userTable.get('tableRows') as FormArray;
        this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
        console.log(this.touchedRows)
    };

    toggleTheme() {
        this.mode = !this.mode;
    }
}
