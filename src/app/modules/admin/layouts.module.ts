import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import { FormsLayoutsComponent } from 'app/modules/admin//layouts.component';
import {MatStepperModule} from "@angular/material/stepper";
import {FuseCardModule} from "../../../@fuse/components/card";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {FuseAlertModule} from "../../../@fuse/components/alert";
import {ToastContainerModule, ToastrModule} from "ngx-toastr";
import {NotifierModule} from "angular-notifier";
import {MatDialogModule} from "@angular/material/dialog";

export const routes: Route[] = [
    {
        path     : '',
        component: FormsLayoutsComponent
    }
];

@NgModule({
    declarations: [
        FormsLayoutsComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatStepperModule,
        MatTableModule,
        MatPaginatorModule,
        FuseCardModule,
        SharedModule,
        MatCardModule,
        NgxMatFileInputModule,
        FuseAlertModule,
        ToastrModule.forRoot({ positionClass: 'inline' }),
        ToastContainerModule,
        NotifierModule,
        MatDialogModule,
    ]
})
export class FormsLayoutsModule
{
}
