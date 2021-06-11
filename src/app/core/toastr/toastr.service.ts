import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class ToastrService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    constructor(
        private _snackBar: MatSnackBar
    ) {
    }

    snackBarAction(message: any): void {
        this._snackBar.open(message, 'Snackbar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
        setTimeout (() => {
            this._snackBar.dismiss()
        }, 3000)
    }
}
