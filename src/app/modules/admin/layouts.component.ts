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
import {CommonService} from "../../core/services/common.service";
import {fuseAnimations} from "../../../@fuse/animations";
import {MatDialog} from "@angular/material/dialog";
import {CheckQuoteComponent} from "./check-quote/check-quote.component";
import {ToastrService} from "../../core/toastr/toastr.service";


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
    displayedColumns: string[] = ['email', 'title', 'description', 'quantity', 'unit', 'attachment', 'remove'];
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
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
        private toastrService: ToastrService,
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
        this.storage =  localStorage.getItem('passcode');
        this.getCustomerQuote();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getCustomerQuote = () => {
        if (this.storage) {
            this.commonService.getQuote(this.storage).subscribe(res => {
                ELEMENT_DATA = res.data
                this.refresh();
            })
        }
    }

    refresh = () => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this._changeDetectorRef.detectChanges();
    };

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
                    this.toastrService.snackBarAction(res.msg)
                    this.getCustomerQuote();
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
                    this.getCustomerQuote();
                    this._changeDetectorRef.detectChanges();
                    this.fileUploadFunction(this.file, res.data._id);
                } else {}
            })
        }
    };

    fileUploadFunction = (file, id) => {
        this.commonService.uploadFile(file, id).subscribe(resp => {
            if (resp.success === true) {
                this.getCustomerQuote();
            }
        })
    };

    openViewQuote = () => {
        const dialogRef = this._matDialog.open(CheckQuoteComponent)
        dialogRef.afterClosed().subscribe(() => {
            console.log('compose dialog was closed!')
        })
    }
}

let ELEMENT_DATA: PeriodicElement[] = [];

export interface PeriodicElement {

}
