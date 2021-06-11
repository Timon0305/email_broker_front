import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteVendorComponent } from './invite-vendor/invite-vendor.component';
import { CompareQuoteComponent } from './compare-quote/compare-quote.component';
import { SubmitQuoteComponent } from './submit-quote/submit-quote.component';
import {Route, RouterModule} from "@angular/router";
import {VendorComponent} from "./vendor.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FuseAlertModule} from "../../../@fuse/components/alert";
import {FuseAutogrowModule} from "../../../@fuse/directives/autogrow";
import {SharedModule} from "../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRippleModule} from "@angular/material/core";

export const vendorRouter: Route[] = [
    {
        path     : 'index/:id',
        component: VendorComponent
    }
];


@NgModule({
  declarations: [
    InviteVendorComponent,
    CompareQuoteComponent,
    SubmitQuoteComponent,
      VendorComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(vendorRouter),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        FuseAlertModule,
        FuseAutogrowModule,
        SharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatRippleModule
    ]
})
export class VendorModule { }
