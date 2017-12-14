import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { NegAuth,NegStorage,NegAjax } from '@newkit/core'; 


import"./exam-homepage.component.css";

export class UserInfor { 
    UserName: string; 
    DisplayName: string; 
    isAuthenticated: boolean; 
} 

@Component({
	selector: 'exam-homepage',
	templateUrl: 'exam-homepage.component.html'
})

export class ExamHomepageComponent implements OnInit {
	constructor(
		private http:HttpClient,
		private router: Router,
		private negAuth: NegAuth,
		private negAjax: NegAjax,	
		private negStorage:NegStorage
	){} 

	//定义API获取的数据
	datas:Int32Array;
	endtime:string;
	userInfor: UserInfor = { 
        UserName: '', 
        DisplayName: '', 
        isAuthenticated: false };
	fullName:string
	error:string;		
	reqOptions:any;		
	name:string;
	refresh:any;
	//调用API获取数据
	 ngOnInit(){	
		//调用公司API获得登陆信息
		this.userInfor.UserName = this.negAuth.userId; 
        this.userInfor.DisplayName = this.negAuth.displayName; 
		this.userInfor.isAuthenticated = this.negAuth.isAuthenticated();

		//拆分名字字符串
		this.fullName=this.userInfor.DisplayName.substring(0,this.userInfor.DisplayName.indexOf('('));

		this.reqOptions = {
			headers: {},
			hideLoading: true, // 默认false
			useCustomErrorHandler: true // 默认false
			  };	
		
		this.name=this.negAuth.displayName.substring(0,this.negAuth.displayName.indexOf('.'));
		
		
		//笔者走了弯路，没有使用框架的方法
	    this.http.get('http://st01nbx01/oes/api/v1/ExamRelease/endTime/'+this.userInfor.UserName,{responseType:'text'}).subscribe(data=>{  
			this.endtime=data;
		})
		//框架的请求方法：
		this.negAjax.get('http://st01nbx01/oes/api/v1/Grade/'+this.fullName+'?isAll=true',this.reqOptions)
			  .then(({data}) => {
				this.datas = data;

				//总分处理：
				for(var i=0;i<data.length;i++){
					if(data[i].subjectiveScore<0){
						data[i].totalScore=data[i].objectiveScore
					}
				}
			  },error=>{this.error='Hi    '+this.name+'，  你暂时没有权限进入本系统'});
		
		//自动刷新
		this.router.navigate(['/intern-training/homepage','refresh']);
	}
	
	 //点击“开始考试/继续考试”按钮跳转
	startexam(shortname,examtime,status){	
		if(status=='开始考试'){
		this.negAjax.get('http://st01nbx01/oes/api/v1/Answer/'+shortname+'?ExamNum='+examtime,{})
		.then(()=>{
			this.negStorage.session.set('homepage-shortName',shortname);
			this.negStorage.session.set('homepage-examNum',examtime);
			this.negStorage.session.set('homepage-status',status);

			this.router.navigate(['/intern-training/page']);
		})}
		else{
			this.negStorage.session.set('homepage-shortName',shortname);
			this.negStorage.session.set('homepage-examNum',examtime);
			this.negStorage.session.set('homepage-status',status);

			this.router.navigate(['/intern-training/page']);
		}

	}
	//点击“总成绩”按钮跳转
	details(shortname,examtime){
		this.negStorage.session.set('homepage-shortName',shortname);
		this.negStorage.session.set('homepage-examNum',examtime);

		this.router.navigate(['/intern-training/detail']);
	}
}

