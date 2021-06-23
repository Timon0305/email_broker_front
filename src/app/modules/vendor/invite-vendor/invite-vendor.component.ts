import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';
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
    myData: any;
    copyStatus: Boolean = false;
    @Output() selectUrl = new EventEmitter<any>();
    constructor(
        private toastrService: ToastrService,
        private _matDialog: MatDialog,
        private commonService: CommonService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.uniqueURL = window.location.href
        this.getInvitedVendor();
        this.getQuote();
    };

    getQuote = () => {
        this.commonService.getQuote(this.passcode).subscribe(res => {
            this.myData = res.data[0];
            this._changeDetectorRef.detectChanges();
        })
    }

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
    };

    clickURL = (url) => {
        this.selectUrl.emit(url)
    }
}
