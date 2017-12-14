import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NegAjax, NegAlert,NegAuth} from '@newkit/core';
import {ScoreService} from "../../services/score.service";

import './exam-score.component.css'





@Component({
	selector: 'exam-score',
	templateUrl: 'exam-score.component.html',
})

export class ExamScoreComponent implements OnInit {

	public info:any;
	public searchObj = {};

	select:ExamList[];	
	datas:string[]=[];

	name:string;
	PeriodNum:any;
	YearNum:any;
	periods:Int32Array[];
	HRname:string;
	error:string;
	reqOptions:any;
	constructor(
		private router: Router,
        private negAjax: NegAjax,
		private negAlert: NegAlert,
		private negAuth:NegAuth,
		private scoreService: ScoreService
	){}

	ngOnInit() {
			this.reqOptions = {
			headers: {},
			hideLoading: true, // 默认false
			useCustomErrorHandler: true // 默认false
			  };		
			this.negAjax.get('http://st01nbx01/oes/api/v1/ExamRelease')
			.then(({data}) => {

			  this.select= data;
			  this.periods=this.select[0].periodNumList;
			  this.PeriodNum=this.periods[0];
			  this.YearNum=this.select[0].yearNum;
				
				this.negAjax.get('http://st01nbx01/oes/api/v1/Grade/'+this.YearNum+'/'+this.PeriodNum,this.reqOptions)
				.then(({data}) => {
					  this.datas = data;
					  this.error ="查询成功"
					//总分处理
			  		this.totalscore(data)
				},
				error=>{this.error="数据库中没有符合查询条件的数据！"});	
			})
			
			this.HRname=this.negAuth.displayName.substring(0,this.negAuth.displayName.indexOf('.'));
	}

	
	  

    searchInfo(yn,pn,fn){
		//处理空格
		if(fn!=null){
			fn=fn.trim();			
		}
		if((fn==null || fn=="") && yn==null && pn==null){
			this.error="请输入查询条件"
		}
		//按年份和期数查询成绩
		if(fn==null && yn!=null && pn!=null){
			this.negAjax.get('http://st01nbx01/oes/api/v1/Grade/'+yn+'/'+pn,this.reqOptions)
			.then(({data}) => {
			//清理数据
			this.datas=[];
			//处理数据
			for(var i=0;i<data.length;i++){
				if(data.objectiveScore != -1)
				this.datas.push(data[i]);
			}
			this.error ="成功查询"+yn+"年第"+pn+"期的成绩";
			
			//总分处理
			this.totalscore(data)
			},error=>{
				this.datas=[];
				this.error="数据库中没有"+yn+"年第"+pn+"期的成绩"})
		}
		//按名字查询成绩
		if(fn!=null && fn!="" && yn==null && pn==null){
			this.negAjax.get('http://st01nbx01/oes/api/v1/Grade/'+fn,this.reqOptions)
			.then(({data}) => {
				//清理数据
				this.datas=[];
			 	//处理数据
			for(var i=0;i<data.length;i++){
				if(data.objectiveScore != -1)
					this.datas.push(data[i]);
			}
			  this.error ="成功查询"+fn+"的成绩"
			  //总分处理
			  this.totalscore(data)
			},error=>{
				this.datas=[];
				this.error="数据库中没有"+fn+"的成绩"})
		}
		
		
		
	}
	 //总分处理
	 totalscore(datas){
		 for(var i=0;i<datas.length;i++){
		if(datas[i].subjectiveScore<0){
			datas[i].totalScore=datas[i].objectiveScore
		}
	}
	}
	 

	//级联年份和期数
	getPeriods(YearNum){
		if(YearNum!=null){
			for(var i=0;i<this.select.length;i++){
				if(this.select[i].yearNum==YearNum)
				{
					this.periods=this.select[i].periodNumList;
					this.PeriodNum=this.select[i].periodNumList[0];
					return this.periods;
				}
			}
		}
	}

	//按名字查询时清空年分和期数
	clearSelect(){
		this.PeriodNum=null;
		this.YearNum=null;
		this.error=null;
	}

	//按年份和期数查询时清空名字
	clearInput(){
		this.name=null;
		this.error=null;
	}

	//导出按钮
	export(){
		this.error="导出功能暂未实现，敬请期待。"
	}

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


class ExamList { 
	constructor(public yearNum: Int32Array, public periodNumList: Int32Array[]) { } 
}
