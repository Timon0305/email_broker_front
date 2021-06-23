import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../../core/services/common.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "../../../core/toastr/toastr.service";

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
            ELEMENT_DATA = res.data;
            this.refresh();
        })
    };

    refresh = () => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this._changeDetectorRef.detectChanges();
    };


    submitQuotePrice = () => {
        console.log(ELEMENT_DATA)
        // let price = this.submitQuote.get('price').value;
        // let creatorPasscode = this.submitQuote.get('creatorPasscode').value;
        // if (!this.quoteId) {
        //     this.toastrService.snackBarAction('Please select one quote');
        //     return;
        // }
        // if (price === 0 || price === null) {
        //     this.toastrService.snackBarAction('Please your price');
        //     return;
        // }
        //
        // let data = {
        //     vendorPasscode: this.passcode,
        //     creatorId: this.quoteId,
        //     price: price,
        //     creatorPasscode: creatorPasscode,
        // }
        // this.commonService.submitQuote(data).subscribe(res => {
        //     this.successForm(res)
        // })
    };

    successForm = (res) => {
        this.toastrService.snackBarAction(res.msg);
        this.getBids();
        this._changeDetectorRef.detectChanges();
    };
}

let ELEMENT_DATA: PeriodicElement[] = [];

export interface PeriodicElement {

}
