import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
    ]
})
export class SharedModule
{
}
