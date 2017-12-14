import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NegAuth,NegAjax,NegStorage,NegAlert  } from '@newkit/core'; 

import { NgModule } from '@angular/core';
import './exam-modify.component.css'





@Component({
	selector: 'exam-modify',
	templateUrl: 'exam-modify.component.html',
})

export class ExamModifyComponent implements OnInit {
	constructor(
		private router: Router,
		private negAuth: NegAuth,
		private negAjax: NegAjax,	
		private negStorage:NegStorage,
		private negAlert:NegAlert
	){} 

	//初始化datas,marks
	datas:string[]=[];
	marks:string[]=[];
	name:string;
	reqOptions:any;
	refresh:any;

	ngOnInit() {
		this.reqOptions = {
			headers: {},
			hideLoading: true, // 默认false
			useCustomErrorHandler: true // 默认false
			  };
		this.negAjax.get(`http://st01nbx01/oes/api/v1/Grade?IsMarked=false`,this.reqOptions)
		.then(({data}) => {
			//清理数据
			this.datas=[];
			//处理数据
			for(var i=0;i<data.length;i++){
				if(data[i].subjectiveScore < 0 && data[i].objectiveScore > -1)
					this.datas.push(data[i]);
			}
		},error=>this.negAlert.info('没有未批阅的试卷'));

		this.negAjax.get(`http://st01nbx01/oes/api/v1/Grade?IsMarked=true&Toalnum=20`,this.reqOptions)
		.then(({data}) => {
			//清理数据
			this.marks=[];
			//处理数据
			for(var i=0;i<data.length;i++){
				if(data[i].subjectiveScore > -1 && data[i].objectiveScore > -1)
					this.marks.push(data[i]);
			}
		},error=>this.negAlert.info('没有已批阅的试卷'));

		this.name=this.negAuth.displayName.substring(0,this.negAuth.displayName.indexOf('.')); 


	 }

	modify(sn,en,status){
		this.negStorage.session.set('modify-shortName',sn);
		this.negStorage.session.set('modify-examNum',en);
		this.negStorage.session.set('modify-status',status);
		this.router.navigate(['/intern-training/rate']);
	 }
	changegrade(sn,en){

		this.negStorage.session.set('modify-shortName',sn);
		this.negStorage.session.set('modify-examNum',en);

		this.router.navigate(['/intern-training/rate']);
	}

	//按钮跳转
	//批改试卷
	tomodify(){
		this.router.navigate(['/intern-training/modify'])
	}
	//查看成绩
	score(){
		this.router.navigate(['/intern-training/score'])
	}
	//情况统计
	statis(){
		this.router.navigate(['/intern-training/statis'])
	}
	//设置时间
	time(){
		this.router.navigate(['/intern-training/time'])
	}
}