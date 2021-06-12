import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-compare-quote',
    templateUrl: './compare-quote.component.html',
    styleUrls: ['./compare-quote.component.scss']
})
export class CompareQuoteComponent implements OnInit {

    @Input() passcode: any

    constructor() {
    }

    ngOnInit(): void {
    }

}
