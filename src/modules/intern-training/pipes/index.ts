import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name:'statusReform'
})
export class statusReformPipe implements PipeTransform {
    transform(value:any,args?:any): any{
		let status;
		switch(value){
			case -1:
			status='暂未批阅';
			break;
			case -2:
			status='批阅暂存中';
			break;
			default:
			status=value
		}
		return status;
	}
}
export const ALL_PIPES = [
    statusReformPipe
];
