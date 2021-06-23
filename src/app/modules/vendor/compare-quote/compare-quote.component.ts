import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ToastrService} from "../../../core/toastr/toastr.service";
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
            let longest = res.data.reduce((a, b) => {
                return a.vendor.length > b.vendor.length ? a : b;
            });
            this.drawColumn(longest);
            this.drawRow(res.data)
        })
    };

    drawColumn = (longest) => {
        this.length = longest.vendor.length;
        let headers = [];
        for (let i = 1; i <= this.length; i++) {
            let data = 'vendor'
            headers.push(data + i);
        }
        this.displayedColumns = ['item', 'quantity'].concat(headers);
    };

    drawRow = (data) => {
        let totalPrice = {}

        for (let i = 1; i <= data.length; i++) {
            const subData = data[i - 1];
            let vendorData = {};
            if (subData.vendor && subData.vendor.length) {
                for (let j = 0; j < subData.vendor.length; j++) {
                    vendorData[subData.vendor[j].name] = subData.vendor[j].price != null ? subData.vendor[j].price : "-";
                    if (!totalPrice[subData.vendor[j].name]) {
                        totalPrice[subData.vendor[j].name] = subData.vendor[j].calPrice;
                    } else {
                        if (totalPrice[subData.vendor[j].name] !== "-" && !isNaN(parseFloat(subData.vendor[j].calPrice))) {
                            totalPrice[subData.vendor[j].name] += subData.vendor[j].calPrice;
                        } else {
                            totalPrice[subData.vendor[j].name] = "-";
                        }
                    }
                }
            }

            ELEMENT_DATA.push({
                ...{
                    item: subData.title,
                    quantity: subData.quantity
                },
                ...vendorData
            });
        }
       ELEMENT_DATA.push({
          ...{ title: '',
              quantity: 'Total'},
           ...totalPrice})

        this.refresh();
    };

    refresh = () => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this._changeDetectorRef.detectChanges();
    };
}

export interface PeriodicElement {
}

let ELEMENT_DATA: PeriodicElement[] = [];
