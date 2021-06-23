import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../../core/services/common.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "../../../core/toastr/toastr.service";
import {attachConfig} from '../../../../app/core/config/app.config'

@Component({
    selector: 'app-submit-quote',
    templateUrl: './submit-quote.component.html',
    styleUrls: ['./submit-quote.component.scss']
})
export class SubmitQuoteComponent implements OnInit, AfterViewInit {
    @Input() passcode: any;
    displayedColumns: string[] = ['item', 'description', 'quantity', 'unit', 'price'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    selection = new SelectionModel<PeriodicElement>(false, []);
    submitQuote: FormGroup;
    quoteId: any;
    myData: any;
    imageURL: string;
    constructor(
        private commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private toastrService: ToastrService,
    ) {
    }


    ngOnInit(): void {
        this.getBids();
        this.refresh();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getBids = () => {
        this.commonService.getBids(this.passcode).subscribe(res => {
            this.myData = res.myData[0];
            if (this.myData && this.myData.attachment) {
                this.imageURL = attachConfig + 'public/' + 'attachment';
            }
            ELEMENT_DATA = res.data;
            this.refresh();
        })
    };

    refresh = () => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this._changeDetectorRef.detectChanges();
    };


    submitQuotePrice = () => {
        this.commonService.submitQuote(ELEMENT_DATA, this.passcode).subscribe(res => {
            this.successForm(res)
        })
    };

    successForm = (res) => {
        this.toastrService.snackBarAction(res.msg);
        this.getBids();
        this._changeDetectorRef.detectChanges();
    };

    inputPrice = (event, id) => {
        for (let item of ELEMENT_DATA) {
           if (item['_id'] === id) {
               item['price'] = event.target.value
           }
        }
    }
}

let ELEMENT_DATA: PeriodicElement[] = [];

export interface PeriodicElement {

}
