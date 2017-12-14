import {Injectable} from '@angular/core';
import {NegAjax} from '@newkit/core'

@Injectable()
export class sendMessageService{

    //考试发布的API
    private api_url = 'http://st01nbx01/oes/api/v1/ExamRelease';

    constructor(
        private negAjax:NegAjax
    ){

    }

    postMessage(postData): Promise<any> {
        var reqOptions = {
            headers: {},
            hideLoading: true, // 默认false
            useCustomErrorHandler: true // 默认false
          };

        return this.negAjax.post(this.api_url,postData,reqOptions);
        }
    }
