import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "../../../core/toastr/toastr.service";
import {MatDialog} from "@angular/material/dialog";
import {CommonService} from "../../../core/services/common.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-compare-quote',
    templateUrl: './compare-quote.component.html',
    styleUrls: ['./compare-quote.component.scss']
})
export class CompareQuoteComponent implements OnInit {

    @Input() passcode: any;
    displayedColumns = [];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    length: number;

    constructor(
        private toastrService: ToastrService,
        private commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.getMyQuote();
    };

    getMyQuote = () => {
        ELEMENT_DATA = [];
        this.commonService.getMyQuote(this.passcode).subscribe(res => {
            console.log('res', res);
            const data = res.data;
            let longest = res.data.reduce((a, b) => {
                return a.vendor.length > b.vendor.length ? a : b;
            });
            this.drawColumn(longest);

            for (let i = 1; i <= data.length; i++) {
                const subData = data[i - 1];
                let vendorData = {};
                if (subData.vendor && subData.vendor.length) {
                    for (let j = 0; j < subData.vendor.length; j++) {
                        vendorData[subData.vendor[j].name] = subData.vendor[j].price != null ? subData.vendor[j].price : "-";
                    }
                }
                ELEMENT_DATA.push({
                    ...{
                        title: subData.title,
                        quantity: subData.quantity
                    },
                    ...vendorData
                })
            }
            this.refresh();
        })
    };

    drawColumn = (longest) => {
        this.length = longest.vendor.length;
        let headers = [];
        for (let i = 1; i <= this.length; i++) {
            let data = 'vendor'
            headers.push(data + i);
        }
        this.displayedColumns = ['title', 'quantity'].concat(headers);
    };

    refresh = () => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this._changeDetectorRef.detectChanges();
    };
}

export interface PeriodicElement {
}

let ELEMENT_DATA: PeriodicElement[] = [];
