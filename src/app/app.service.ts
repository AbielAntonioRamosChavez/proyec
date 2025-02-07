import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable()
export class AppService {
    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': 'POST,GET,PUT,DELETE,OPTIONS',
            'Access-Control-Request-Headers': 'Content-Type, Authorization'
        })
    };
    public showAlert = new Subject();
    public reloadMenu = new Subject();

    constructor(private http: HttpClient) {
    }

    _clone( data: any ) {
        return JSON.parse(JSON.stringify(data));
    }

    /**
     * Allows to use http get sending only params as a unique option or
     * custom RequestOptions.0
     *
     * @param endpoint
     * @param params: It should be [{param: string, val: string|number}, ...]
     * @param options
     * @returns {Observable<Response>}
     */
    get(domain: string, endpoint: string, params?: any, options?: any) {
        if (params) {
            let p = new URLSearchParams();
            params.forEach( (param: { param: string, val: string | number }) => {
                p.set(param.param, param.val.toString());
            });
        }
        return this.http.get(
            domain + '/' + endpoint,
            options
        );
    }

    /**
     * Allows to use http post.
     *
     * @param endpoint
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    post(domain: string, endpoint: string, body: any, options?: any) {
        let params = new HttpParams();

        const options2 = {
            params: params,
            reportProgress: true,
        };
        //this.headers.append('Accept', 'application/json');
        //this.headers.append('Content-Type', 'application/json');
        return this.http.post(domain + '/' + endpoint, body, options2);
    }

    /**
     * Allows to use http patch as goal to edit an specific field of
     * the endpoint.
     *
     * @param endpoint
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    patch(domain: string, endpoint: string, body: any, options?: any) {
        return this.http.patch(domain + '/' + endpoint, body, options);
    }

    /**
     * Allows to use http put as goal to edit all data of the endpoint.
     *
     * @param endpoint
     * @param body
     * @param options
     * @returns {Observable<Response>}
     */
    put(domain: string, endpoint: string, body?: any, options?: any) {
        return this.http.put(domain + '/' + endpoint, body, options);
    }

    /**
     * Allows to use http delete as goal to edit all data of the endpoint.
     *
     * @param endpoint
     * @param options
     * @returns {Observable<Response>}
     */
    remove(domain: string, endpoint: string, options?: any) {
        return this.http.delete(domain + '/' + endpoint, options);
    }

}
