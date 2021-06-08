import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { GridOptions } from 'ag-grid-community';

@Component({
    selector     : 'forms-layouts',
    templateUrl  : './layouts.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsLayoutsComponent implements OnInit
{
    horizontalStepperForm: FormGroup;
    public dataGrid001GridOptions: GridOptions;

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Horizontal stepper form
        this.createForm();
        this.createDataGrid001();
    }

    createForm = () => {
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                email   : ['', [Validators.required, Validators.email]],
                title : ['', Validators.required],
                description: ['', Validators.required]
            }),
        });
    };

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50,
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Name 2',
                field: 'name2',
                width: 200,
            },
            {
                headerName: 'Address Line 1',
                field: 'addressLine1',
                width: 250,
            },
            {
                headerName: 'City',
                field: 'city',
                width: 200,
            },
            {
                headerName: 'County',
                field: 'county',
                width: 100,
            },
            {
                headerName: 'State',
                field: 'state',
                width: 100,
            },
            {
                headerName: 'ZIP Code',
                field: 'zipCode',
                width: 100,
            },
            {
                headerName: 'Primary Address',
                field: 'primaryAddress',
                width: 200,
            },
        ];
    }
}
