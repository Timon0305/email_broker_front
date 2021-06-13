import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../../../core/services/common.service";

@Component({
    selector: 'app-search-vendor',
    templateUrl: './search-vendor.component.html',
    styleUrls: ['./search-vendor.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchVendorComponent implements OnInit {
    passcode: any;
    vendorCounts: number = 0;
    drawerMode: 'side' | 'over';
    searchInputControl: FormControl = new FormControl();
    contacts$: [];
    selectedContact: any;
    constructor(
        public matDialogRef: MatDialogRef<SearchVendorComponent>,
        private commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.passcode = localStorage.getItem('passcode');
        this.getSearchVendors(null)
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    };

    saveAndClose(): void
    {
        this.matDialogRef.close();
    }

    getSearchVendors = (event) => {
        let searchKey = event?event.target.value:'';
        this.commonService.getAllVendors(this.passcode, searchKey).subscribe(res => {
            this.vendorCounts = res.data.length;
            this.contacts$ = res.data;
            this._changeDetectorRef.detectChanges();
        })
    };
}
