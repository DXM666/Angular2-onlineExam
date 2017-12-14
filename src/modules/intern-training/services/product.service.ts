import {Injectable} from '@angular/core';
import {NegAjax} from '@newkit/core'

@Injectable()
export class GetMessageService{

    private api_url = 'http://st01nbx01/oes/api/v1/ExamRelease/ExamData/'+new Date().getFullYear();

    constructor(
        private negAjax:NegAjax
    ){

    }

    getExamReleaseList(searchObj?): Promise<any> {
        let reqOptions = {
            headers: {},
            hideLoading: true, // 默认false
            useCustomErrorHandler: true // 默认false
          };
        return this.negAjax.get(this.api_url,reqOptions);
        }
    }

