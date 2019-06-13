import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JsonLoaderService {
    private readonly examplesURL = 'assets/examples/examples.json';

    constructor(private readonly httpClient: HttpClient) {}

    get examples(): Observable<any> {
        return this.httpClient.get(this.examplesURL);
    }

    getExample(set: string, example: string): Observable<any> {
        const exampleURL = `assets/examples/${set}/${example}.json`;

        return this.httpClient.get(exampleURL, { responseType: 'text' });
    }

}
