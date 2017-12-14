import {Injectable} from '@angular/core';
import {NegAjax} from '@newkit/core'

@Injectable()
export class TemSaveService{

    //考试发布的API
    private api_url = 'http://st01nbx01/oes/api/v1/Answer/';

    constructor(
        private negAjax:NegAjax
    ){

    }

    postMessage(shortname,postData): Promise<any> {
        let reqOptions = {
            headers: {},
            hideLoading: false, // 默认false
            useCustomErrorHandler: true // 默认false
          };

        return this.negAjax.post(this.api_url+shortname,postData,reqOptions);
        }
    }
