import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../../core/services/common.service";
import {ToastrService} from "../../../core/toastr/toastr.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-quote',
  templateUrl: './check-quote.component.html',
  styleUrls: ['./check-quote.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CheckQuoteComponent implements OnInit {

    composeForm: FormGroup;
    storage : any;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<CheckQuoteComponent>,
        private _formBuilder: FormBuilder,
        private commonService: CommonService,
        private toastrService: ToastrService,
        private _router: Router,
    )
    {}

    ngOnInit(): void
    {
        // Create the form
        this.storage =  localStorage.getItem('passcode');
        this.composeForm = this._formBuilder.group({
            passcode     : ['', [Validators.required]],
        });
    }

    /**
     * Save and close
     */
    saveAndClose(): void
    {
        this.matDialogRef.close();
    }

    send(): void {
        if (this.composeForm.invalid) {
            return
        }
        this.commonService.checkPasscode(this.composeForm.value.passcode).subscribe(res => {
            if (res.success) {
                localStorage.setItem('passcode', res.passcode);
                this.storage = localStorage.getItem('passcode')
                this.toastrService.snackBarAction(res.msg);
                setTimeout(()  => {
                    this._router.navigate(['vendor/index', this.storage])
                }, 2000)
            } else {
                this.toastrService.snackBarAction(res.msg)
            }
            this.matDialogRef.close()
        })
    }
}
