import {Injectable} from "@angular/core";
import {apiConfig} from '../config/app.config'
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})

export class CommonService {
    private currentServiceSubject : BehaviorSubject<any>;
    public currentService: Observable<any>;
    constructor(
        private httpClient: HttpClient
    ) {
    }

    saveQuote(quoteInfo) : Observable<any> {
        return this.httpClient.post(apiConfig + 'createQuote', quoteInfo)
    }
}
