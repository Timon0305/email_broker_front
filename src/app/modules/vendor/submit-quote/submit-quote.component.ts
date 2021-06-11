import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../../core/services/common.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
    selector: 'app-submit-quote',
    templateUrl: './submit-quote.component.html',
    styleUrls: ['./submit-quote.component.scss']
})
export class SubmitQuoteComponent implements OnInit, AfterViewInit {
    @Input() passcode: any;
    displayedColumns: string[] = ['select', 'email', 'title', 'description', 'quantity', 'unit', 'attachment', 'remove'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef,
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
            ELEMENT_DATA = res.data;
            this.refresh();
        })
    };

    refresh = () => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this._changeDetectorRef.detectChanges();
    };

    recordSelect = (event) => {
        console.log(event)
    }
}

let ELEMENT_DATA: PeriodicElement[] = [];

export interface PeriodicElement {

}
