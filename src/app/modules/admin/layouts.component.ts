import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../core/services/common.service";
import {fuseAnimations} from "../../../@fuse/animations";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "../../core/toastr/toastr.service";
import {Router} from "@angular/router";
import {FormConfig} from "../../core/shared/constants";
import {FormRow} from "../../core/shared/models";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";


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
    composeForm: FormGroup;

    disabled: boolean = false;
    multiple: boolean = false;
    accept: 'application/x-zip-compressed,image/*';
    submitStatus = false;
    file: File | null = null
    fileSelected = false;
    myInfo: any;
    storage : any;


    displayedColumns: string[] = ['item', 'description', 'quantity', 'unit'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(false, []);
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
        private toastrService: ToastrService,
        private _router: Router,
    ) {

    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.createForm();
        this.storage =  localStorage.getItem('passcode');
        this.checkForm();
    }

    ngAfterViewInit() {

    }

    createForm = () => {
        this.createNewQuote = this._formBuilder.group({
            step1: this._formBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                title: ['', Validators.required],
                description: ['', Validators.required],
                attachment: ['']
            }),
            step2: this._formBuilder.group({
                email1: [''],
                title1: [''],
                description1: [''],
                attachment1: ['']
            })
        });
    };

    checkForm = () => {
        this.composeForm = this._formBuilder.group({
            passcode     : ['', [Validators.required]],
        });
    }

    nextEvent = () => {
        this.createNewQuote.patchValue({
            step2: {
                email1: this.createNewQuote.value.step1.email,
                title1: this.createNewQuote.value.step1.title,
                description1: this.createNewQuote.value.step1.description,
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
                    this.successForm(res)
                } else {}
            })
        } else {
            this.commonService.saveQuote(this.createNewQuote.value.step1).subscribe(res => {
                if (res.success === true) {
                    this.storage = res.data.passcode;
                    localStorage.setItem('passcode', res.data.passcode)
                    this.successForm(res)
                } else {}
            })
        }
    };

    fileUploadFunction = (file, id) => {
        this.commonService.uploadFile(file, id).subscribe(resp => {
            if (resp.success === true) {

            }
        })
    };


    send(): void {
        if (this.composeForm.invalid) {
            return
        }
        this.commonService.checkPasscode(this.composeForm.value.passcode).subscribe(res => {
            if (res.success) {
                localStorage.setItem('passcode', res.passcode);
                this.storage = localStorage.getItem('passcode')
                this.toastrService.snackBarAction(res.msg);
                setTimeout(()  => {
                    this._router.navigate(['vendor/index', this.storage])
                }, 2000)
            } else {
                this.toastrService.snackBarAction(res.msg)
            }
        })
    }

    resetForm = () => {
        this.createNewQuote.reset();
    };

    successForm = (res) => {
        this.toastrService.snackBarAction(res.msg)
        this.resetForm();
        this.myInfo = res.data;
        this._changeDetectorRef.detectChanges();
        this.fileUploadFunction(this.file, res.data._id);
    };

    customTable = (event) => {
        ELEMENT_DATA = event.tableRows;
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this._changeDetectorRef.detectChanges();
    }

}

let ELEMENT_DATA: PeriodicElement[] = [

];

export interface PeriodicElement {

}
