import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-invite-vendor',
    templateUrl: './invite-vendor.component.html',
    styleUrls: ['./invite-vendor.component.scss']
})
export class InviteVendorComponent implements OnInit {
    @Input() passcode: any

    constructor() {
    }

    ngOnInit(): void {
    }

}
