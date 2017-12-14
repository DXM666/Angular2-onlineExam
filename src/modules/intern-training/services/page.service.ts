import {NegAjax} from '@newkit/core';







@Injectable()
export class PageService {
  public sendRequest() {
    this.negAjax.post(`http://10.16.75.24:3000/framework/v2/user-profile/Newkit/jh3r`,mySub,{})
      .then(({data}) => {
        this.userProfile = data;
      });
  }
}
