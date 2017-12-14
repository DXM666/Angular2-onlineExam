import {Injectable} from '@angular/core';
import {NegAjax} from '@newkit/core'

@Injectable()
export class SearchUserService{


    private api_url;
    
    constructor(
        private negAjax:NegAjax
    ){

    }

    getUserMessage(Fullname): Promise<any> {
        var reqOptions = {
            headers: {},
            hideLoading: true, // 默认false
            useCustomErrorHandler: true // 默认false
          };
        this.api_url='http://apis.newegg.org/common/v1/domain/user?Fullname='+Fullname+'&format=json';
       // console.log(this.negAjax.get(this.api_url));
        return this.negAjax.get(this.api_url,reqOptions);
        }
    }
