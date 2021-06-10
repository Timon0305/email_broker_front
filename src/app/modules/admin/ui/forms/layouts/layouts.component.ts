import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ThemePalette} from "@angular/material/core";
import {CommonService} from "../../../../../core/services/common.service";
import {fuseAnimations} from "../../../../../../@fuse/animations";

@Component({
    selector: 'forms-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations   : fuseAnimations
})
export class FormsLayoutsComponent implements OnInit, AfterViewInit {
    createNewQuote: FormGroup;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'remove'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    color: ThemePalette = 'primary';
    disabled: boolean = false;
    multiple: boolean = false;
    accept: 'application/x-zip-compressed,image/*';
    submitStatus = false;
    file: File | null = null
    fileSelected = false;
    myInfo: any;
    storage : any;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.createForm();
        this.storage =  localStorage.getItem('passcode')
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    createForm = () => {
        this.createNewQuote = this._formBuilder.group({
            step1: this._formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                title: ['', Validators.required],
                description: ['', Validators.required],
                quantity: ['', Validators.required],
                unit: ['', Validators.required],
                attachment: ['']
            }),
            step2: this._formBuilder.group({
                email1: [''],
                title1: [''],
                description1: [''],
                quantity1: ['', Validators.required],
                unit1: ['', Validators.required],
                attachment1: ['']
            })
        });
    };

    nextEvent = () => {
        this.createNewQuote.patchValue({
            step2: {
                email1: this.createNewQuote.value.step1.email,
                title1: this.createNewQuote.value.step1.title,
                description1: this.createNewQuote.value.step1.description,
                quantity1: this.createNewQuote.value.step1.quantity,
                unit1: this.createNewQuote.value.step1.unit,
                attachment1: this.file.name
            }
        });
        this.createNewQuote.get('step2').disable()
    };

    advertiseImage(files: FileList | null): void  {
        if (files) {
            this.fileSelected = true
            this.file = files.item(0);
            this.createNewQuote.patchValue({
                step1 : {
                    attachment: files[0].name
                }
            });
        }
    };

    valueSubmit = () => {
        this.submitStatus = true;
        if (this.createNewQuote.invalid) {
            return;
        }

        this.storage = localStorage.getItem('passcode')

        if (this.storage) {
            this.commonService.addQuote(this.createNewQuote.value.step1, this.storage).subscribe(res => {
                if (res.success === true) {
                    this.myInfo = res.data;
                    this._changeDetectorRef.detectChanges();
                    this.fileUploadFunction(this.file, res.data._id);
                } else {}
            })
        } else {
            this.commonService.saveQuote(this.createNewQuote.value.step1).subscribe(res => {
                if (res.success === true) {
                    this.storage = res.data.passcode;
                    localStorage.setItem('passcode', res.data.passcode)
                    this.myInfo = res.data;
                    this._changeDetectorRef.detectChanges();
                    this.fileUploadFunction(this.file, res.data._id);
                } else {}
            })
        }
    };

    fileUploadFunction = (file, id) => {
        this.commonService.uploadFile(file, id).subscribe(resp => {
            if (resp.success === true) {

            }
        })
    }
}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
