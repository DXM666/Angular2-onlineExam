import {Injectable} from '@angular/core';
import {NegAjax} from '@newkit/core'

@Injectable()
export class GetUserService{

    private api_url;
    
    constructor(
        private negAjax:NegAjax
    ){

    }
    getUser(Fullname): Promise<any> {

        var reqOptions = {
            headers: {},
            hideLoading: true, // 默认false
            useCustomErrorHandler: true // 默认false
          };
        this.api_url='http://st01nbx01/oes/api/v1/Grade/'+Fullname;
       // console.log(this.negAjax.get(this.api_url));
        return this.negAjax.get(this.api_url,reqOptions);
        }
    }
