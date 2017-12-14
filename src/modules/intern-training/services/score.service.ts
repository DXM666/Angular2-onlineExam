import {Injectable} from '@angular/core';
import {NegAjax} from '@newkit/core'



@Injectable()
export class ScoreService{

    private api_url = 'http://localhost:3000/products?';

    constructor (
      private  negAjax:NegAjax
    ){}

    getPagedInfo(searchObj?): Promise<any> {
        let searchname: string = '';
        let searchdate: string = '';
         if (searchObj) {
            if (searchObj.ShortName) {
                searchname += '&name=' + searchObj.ShortName
            }
            if (searchObj.YearNum) {
                searchdate += '&YearNum=' + searchObj.YearNum
            }
            if (searchObj.PeriodNum) {
                searchdate += '&PeriodNum=' + searchObj.PeriodNum
            }
            // if (searchObj.CreateDateEnd) {
            //     searchparams += '&CreateDateEnd=' + searchObj.CreateDateEnd
            // }
            let search_name_url = this.api_url + searchname;
            let search_date_url = this.api_url + searchdate;
            console.log(search_name_url);
            console.log(search_date_url);


            return this.negAjax.get(search_name_url);
        }
        else{
            return this.negAjax.get(this.api_url);
        }
    }
}