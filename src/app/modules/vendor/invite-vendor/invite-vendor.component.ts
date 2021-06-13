import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from "../../../core/toastr/toastr.service";
import {MatDialog} from "@angular/material/dialog";
import {SearchVendorComponent} from "./search-vendor/search-vendor.component";
import {CommonService} from "../../../core/services/common.service";

@Component({
    selector: 'app-invite-vendor',
    templateUrl: './invite-vendor.component.html',
    styleUrls: ['./invite-vendor.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteVendorComponent implements OnInit {
    @Input() passcode: any
    members: any[];
    uniqueURL: string;

    copyStatus: Boolean = false;
    constructor(
        private toastrService: ToastrService,
        private _matDialog: MatDialog,
        private commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.uniqueURL = window.location.href;
        this.getInvitedVendor()
    };

    getInvitedVendor = () => {
        this.commonService.getInvitedVendor(this.passcode).subscribe(res => {
            this.members = res.invitedData;
            this._changeDetectorRef.detectChanges();
        })
    };

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    copyURL = () => {
        this.copyStatus = !this.copyStatus;
        if (this.copyStatus) {
            this.toastrService.snackBarAction('Copy!')
        }
    };

    searchVendor = () => {
        const dialogRef = this._matDialog.open(SearchVendorComponent)
        dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const data = response[1];
            if (actionType === 'get') {
                this.commonService.inviteVendor(this.passcode, data.passcode).subscribe(res => {
                    if (res.success) {
                        this.getInvitedVendor()
                    } else {
                        this.toastrService.snackBarAction(res.msg);
                    }
                })
            }
        })
    };

    deleteInvitedVendor = (data) => {
        this.commonService.deleteVendor(this.passcode, data.passcode).subscribe(res => {
            if (res.success) {
                this.toastrService.snackBarAction(res.msg);
                this.getInvitedVendor();
            }
        })
    }
}
