import { Component, OnInit } from '@angular/core';
import './exam-time.component.css';
import { Router } from '@angular/router';
import { NegAjax, NegAlert,NegAuth,NegStorage } from '@newkit/core';
import { GetMessageService } from '../../services/product.service';
import { SearchUserService } from '../../services/searchUser';
import { sendMessageService } from '../../services/sendMessage';
import { GetUserService } from '../../services/GetUser';
import {StaffMessage} from './Model/StaffMessage';
import {AllStaff} from './Model/AllStaff';
import {TemSaveService} from "../../services/TemSave";

@Component({
	selector: 'exam-time',
	templateUrl: 'exam-time.component.html',
})


export class ExamTimeComponent implements OnInit {
	public List: any={employeeNum:null,endTime:null,periodNum:null,startTime:null,yearNum:null} ;//查询期数结果
	public TList: any;//查询数据库结果
	public FList: any;//发布考试结果
	public UList={data: null};//查询公司API结果
	public searchObj = {};
	public People: StaffMessage;
	public PostData:StaffMessage[] = [];
	public AllStaff:AllStaff[]=[];
	public strerror:string;
	public date:string;
	public endTime:any;
	public MinData:any;
	public strstatus:number=0;
	public HRname:string;
	public postJson ={StartTime:null,EmployeeList:[]};

	    constructor(
		        private router: Router,
		        private negAjax: NegAjax,
		        private negAlert: NegAlert,
		        private GetMessageService: GetMessageService,
				private sendMessageService:sendMessageService,
				private SearchUserService: SearchUserService,
				private GetUserService:GetUserService,
				private negAuth:NegAuth
		    ) { }

	ngOnInit() {

		this.HRname=this.negAuth.displayName.substring(0,this.negAuth.displayName.indexOf('.'))

		// let a=new Date().getFullYear();
		// let b=new Date().getMonth()+1;
		// let c=new Date().getDate();
		// //this.MinData=a+"-"+b+"-"+c;
		//  //2017-12-2 
		//  this.MinData=new Date(Date.parse(this.date));
		//  console.log(this.MinData);

		//初始化People
		this.People =new StaffMessage("","","");
		this.strerror="";
		this.PostData=[];

		this.endTime=new Date();
		console.log(this.endTime);
		
		//加载页面时查询期数信息
		this.GetMessageService.getExamReleaseList(this.searchObj)
		.then(({ data }) => {
			this.List = {
				data: data,
				total: data.length
			}
			if(data.length>0){
				this.date=this.List.data[0].endTime.substring(0,this.List.data[0].endTime.indexOf('T')) ;
				//console.log(this.List.data[0].endTime);
				//获取截止日期！
				this.endTime=new Date(this.List.data[0].endTime);
				console.log(this.endTime);
			}
		},
		error =>this.negAlert.error("Get list failed."))
	 }


	 //添加数据到类中,判断是否存在该员工
	 
	 public addInput(strFullName) {
		 if(strFullName===""){
			this.serror(1);
		 }else{
			 //调用API查询是否员工已经参加考试！
			this.FindUserInTable(strFullName);
			
			//调用查询员工API数据
			//this.searchUserList(strFullName);
		 }
	 }


	 //输入值为错误时进行响应
	 public serror(strstatus){
		if(strstatus===1){
			this.strerror="英文全名不能为空！";
		}if(strstatus===2){
			this.strerror="找不到该员工！";
		}if(strstatus===3){
			this.strerror="该员工已存在！";
		}if(strstatus===4){
			this.strerror="未添加员工！";
		}if(strstatus===5){
			this.strerror="未设置考试时间！";
		}if(strstatus===6){
			this.strerror="发布考试成功！";
		}if(strstatus===7){
			this.strerror="员工已经参加过考试了！";
		}if(strstatus===8){
			this.strerror="开始考试时间设置错误！";
		}if(strstatus===9){
			this.strerror="服务器错误，发布考试失败！";
		}
	 }


	 //输入之后清空输入框数据
	 public clear(){
		this.People.fullName="";
		this.People.shortName="";
	 }

	 //从数组中移除
	 public removeInput(item) {
	  let i = this.PostData.indexOf(item);
	  this.PostData.splice(i, 1);
	 } 

	 //POST数据给API，进行发布考试
	public SendMessage(allData):number {
		let a=0;
		try{
			this.sendMessageService.postMessage(allData)
			.then(({ data }) => {
				this.FList = {
					data: data,
					total: data.length
				}
			  //查询期数
			  this.searchList();
			  return  1;
			},
			error => this.negAlert.error("POST数据失败."))
		}catch{
			return 2;
		}
		
	}
	

	//从数据库中查询员工是否已经参加考试
	public FindUserInTable(FullName) {
		this.GetUserService.getUser(FullName)
			.then(({ data}) => {
				
				console.log(data);
				this.serror(7);//员工已经参加过考试了！
				//console.log(data.length)

				//如果LENGTH大于2，则返回错误信息：该员工已参加考试

				//否则，调用查询公司API，进行添加！！

			},
			error =>this.searchUserList(FullName)//this.negAlert.error("G56615615651.")
		)
	}

	
	//查询期数信息
	public _loadList(searchObj?) {
		this.GetMessageService.getExamReleaseList(searchObj)
			.then(({ data }) => {
				this.List = {
					data: data,
					total: data.length
				}
				this.date=this.List.data[0].endTime.substring(0,this.List.data[0].endTime.indexOf('T')) ;
			},
			error => this.negAlert.error("Get list failed."))
	}
	
	//查询员工信息
	public   findUser(fullName) {
		this.SearchUserService.getUserMessage(fullName)
			.then(({ data }) => {
				console.log(data);
				if(data.length != 0){
					this.UList.data = data;
						this.strerror="";
						var s = this.UList.data;
						let tempUser:StaffMessage = new StaffMessage(s.UserName,s.FullName,s.Email);
						console.log("全名是："+tempUser.fullName);
						console.log("短名是："+tempUser.shortName);
						console.log("邮箱是："+tempUser.email);
						//判断数组中是否已存在用户
						if(this.PostData.length!=0){
							for (var index = 0; index <this.PostData.length; index++) {
								var element = this.PostData[index];
								if(element.fullName==tempUser.fullName){
									this.serror(3);//重复添加用户
									this.strstatus=-1;//重复添加将状态变为-1
								}
							}
						}
						//将对象添加到数组中
						if(this.strstatus!=-1){//若状态不为-1，则将员工加入数组中
							this.PostData.push(tempUser);
							//加入数组成功
							console.log("加入数组成功！");
						}
				}
				else{
					this.serror(2);//用户名不存在
					//this.UList.data=null;
				}
			})
	}

	//调用查询员工方法
	public  searchUserList(FullName) {
		this.findUser(FullName);
		console.log("查询了员工："+FullName);
		
	}

	//调用用查询期数方法
	public searchList() {
		this._loadList(this.searchObj);
	}
	

	//点击确定，完成传输数据和查询
	public sumbit(){

		//判断postData数组是否为空，为空的时候，提示：发布考试失败！
		if(this.PostData.length==0){
			this.serror(4);
		}else{

			if(this.date==undefined){
				this.serror(5);//未设置日期
			}else{
			//判断发布时间不能再最新截止日期之前！！！！！

			//将thisdate赋值给MinData
			this.MinData=new Date(Date.parse(this.date));
			if(this.MinData>=this.endTime){

				this.date;//2017-10-23
				this.PostData;//
				//循环将数据添加到AllStaff中
				for (var index = 0; index < this.PostData.length; index++) {
					var element = this.PostData[index];
					let temUser:AllStaff=new AllStaff(element.shortName,element.fullName,element.email);
					this.AllStaff.push(temUser);
				}
				this.postJson.StartTime = this.date;
				this.postJson.EmployeeList = this.AllStaff;
				console.log(this.postJson);
				//将数据发送给API
				let a =this.SendMessage(this.postJson);
				//console.log("111111111111:"+a);
				//判断是否发布成功！
				if(a==2){
				 	this.serror(9);
				 }else{
				 	this.serror(6);
				}
				//清空数组
				this.PostData=[];
				this.AllStaff=[];

			}else{
				//设置开始时间有误！
				this.serror(8);

			}
			
			}
		}
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

