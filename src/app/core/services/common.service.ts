import {Injectable} from "@angular/core";
import {apiConfig} from '../config/app.config'
import { Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})

export class CommonService {
    public currentService: Observable<any>;
    constructor(
        private httpClient: HttpClient
    ) {
    }

    getQuote(passcode): Observable<any> {
        return this.httpClient.get(apiConfig + 'customer/getQuote?passcode=' + passcode);
    };

    saveQuote(quoteInfo) : Observable<any> {
        return this.httpClient.post(apiConfig + 'customer/createQuote', quoteInfo)
    };

    addQuote(quoteInfo, passcode): Observable<any> {
        return this.httpClient.post(apiConfig + 'customer/addQuote', {quoteInfo, passcode})
    };

    uploadFile(upload: any, name: string): Observable<any> {

        const endPoint = apiConfig + 'customer/uploadFile';
        let fileName = name + '.' + upload.name.substring(upload.name.lastIndexOf('.')+1)
        const formData: FormData = new FormData();
        formData.append('file', upload, fileName);
        return this.httpClient.post(endPoint, formData)
    };

    checkPasscode(passcode): Observable<any> {
        return this.httpClient.get(apiConfig + 'customer/checkQuote?pass=' + passcode)
    };

    getBids(passcode): Observable<any>{
        return this.httpClient.get(apiConfig + 'vendor/getBid?pass=' + passcode)
    };

    submitQuote(formData): Observable<any> {
        return this.httpClient.post(apiConfig + 'vendor/submitQuote', {
            formData
        })
    }
}
