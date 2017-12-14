import { Component, OnInit } from '@angular/core';

import {Forms} from '@angular/forms';
import {NegAjax,NegStorage,NegAlert,NegAuth} from '@newkit/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TemSaveService} from "../../services/TemSave";


//返回的数据
export class Bank_data{
	ShortName:string;
	ExamNum:number;
	FillBlankList:string[] = [];
	SubjectList:string[] = [];
	JudgmentList:string[] = [];
}

//题目
export class Title{
	Answer:string[] = [];    //选项
	QuestionNumber:number;    //题号
	AnswerIndex:number;    //索引（只有选择题有）
}

@Component({
	selector: 'exam-page',
	templateUrl: 'exam-page.component.html',
	providers:[TemSaveService],
	styles:[require('./exam-page.component.css').toString()]
})

export class ExamPageComponent implements OnInit {
	mySub_judge:Title[] = [];
	mySub_blank:Title[] = [];
	mySub_subject:Title[] = [];

	StaffName:string;

	Answer_bank_data:Bank_data={};  //返回到后端所有的数据
	FillBlankList:string[] = [];    //返回到后端的填空题答案
	JudgmentList:string[] = [];    //返回到后端的判断题答案
	SubjectList:string[] = [];    //返回到后端的主观题答案

	air:number = 0;

    shortname:string;
    examnum:number;

	datas:any;    //获取的模板表
	answers:any;    //获取的答案表

	fillBlanks:any[]= [];   //从后端模板表获取的填空题试题
	judgments:any[] = [];    //从后端模板表获取的判断题试题
	subjects:any[] = [];    //从后端模板表获取的主观题试题

	constructor(
		private http:HttpClient,
		private negAjax: NegAjax,
		private negStorage:NegStorage,
		private router:Router,
		private temSaveService:TemSaveService,
		private negAlert: NegAlert,
		private negAuth: NegAuth,
	){}

	ngOnInit() {

		this.StaffName = this.negAuth.displayName.substring(0, this.negAuth.displayName.indexOf('.'))
		this.shortname = this.negStorage.session.get('homepage-shortName');
		this.examnum = this.negStorage.session.get('homepage-examNum');
		this.http.get('http://st01nbx01/oes/api/v1/answer/'+this.shortname+'?examnum='+this.examnum).subscribe(data=>{
			this.answers = data;
		this.http.get('http://st01nbx01/oes/api/v1/Template/'+this.answers.fillBlankList[0].paper).subscribe(data=> {
            this.datas = data;

			console.log(this.answers);
			console.log(this.datas);

			//填空题
			this.fillBlanks = this.datas.fillBlankList;

			for (let i=0;i<this.datas.fillBlankList.length;i++) {
                let tempSub = new Title();    //填空题
                tempSub.QuestionNumber = this.datas.fillBlankList[i].questionNumber;
                tempSub.AnswerIndex = this.datas.fillBlankList[i].answerIndex;

                for (let j = 0; j < this.datas.fillBlankList[i].correctAnswer.split(',').length; j++) {
                    tempSub.Answer[j] = this.answers.fillBlankList[i].answer[j];
                }
                this.mySub_blank.push(tempSub);
            }

			//判断题
			this.judgments = this.datas.judgmentList;

			for (let i = 0;i < this.datas.judgmentList.length;i++){
				let tempSub = new Title();    //题
				tempSub.QuestionNumber = this.datas.judgmentList[i].questionNumber;
				if(this.answers.judgmentList[i].answer == null){
					tempSub.Answer = null;
				}
				else {
					tempSub.Answer = this.answers.judgmentList[i].answer;
				}
				this.mySub_judge.push(tempSub);  //一张卷子的选择
			}

			//主观题
			this.subjects = this.datas.subjectList;
			for (let i = 0;i < this.datas.subjectList.length;i++){
				let tempSub = new Title();
				tempSub.QuestionNumber = this.datas.subjectList[i].questionNumber;
				tempSub.Answer = this.answers.subjectList[i].answer;
        		this.mySub_subject.push(tempSub);
			}
		});
		})
	}

	customTrackBy(index: number, obj: any): any {
    return  index;
  	}

  	back(){
		this.router.navigate(['/intern-training/homepage'])
	}

	//提交试卷，将选择答案返回到后端
	submit_topic() {
  	    this.JudgmentList=[];
  	    this.SubjectList=[];
  	    this.FillBlankList=[];
  	    this.Back_message();
  	    if (this.air > 0){
  	    	let info = confirm('亲，您还有'+this.air+'处未完成，确定要提交咩？');
			if (info == true ){
				this.putDatas(this.Answer_bank_data);
			}else {
				alert('您可以继续答卷了哟^_^');
			}
		}else {
  	    	let info = confirm('亲，确定要提交咩？');
			if (info == true ){
				this.putDatas(this.Answer_bank_data);
			}else {
				alert('您可以继续答卷了哟^_^');
			}
		}

    }

    //暂存试卷
    info(){
		this.Back_message();
  		this.putData(this.Answer_bank_data.ShortName,this.Answer_bank_data);
	}

	public Back_message(){
		//填空题答案数据
		for (let i=0;i<this.mySub_blank.length;i++)
		{
			let tempAnswer = new Title();
			tempAnswer.Answer = [];
			tempAnswer.QuestionNumber = this.mySub_blank[i].QuestionNumber;
			tempAnswer.AnswerIndex = this.mySub_blank[i].AnswerIndex;
			for(let j=0;j<this.mySub_blank[i].Answer.length;j++)
			{
				tempAnswer.Answer.push(this.mySub_blank[i].Answer[j]);
				if (this.mySub_blank[i].Answer[j] == null){
                    	this.air += 1;
				}
			}
			this.FillBlankList.push(tempAnswer);
		}
		//判断题答案数据
		for(let i=0;i<this.mySub_judge.length;i++)
		{
			let tempAnswer = new Title();
			tempAnswer.QuestionNumber = this.mySub_judge[i].QuestionNumber;
			tempAnswer.Answer = [];
			tempAnswer.Answer = this.mySub_judge[i].Answer;
			if (this.mySub_judge[i].Answer == null){
                    	this.air += 1
			}
			this.JudgmentList.push(tempAnswer)
		}
		//主观题答案数据
		for(let i=0;i<this.mySub_subject.length;i++)
		{
			let tempAnswer = new Title();
			tempAnswer.Answer = '';
			tempAnswer.QuestionNumber = this.mySub_subject[i].QuestionNumber;
			tempAnswer.Answer = this.mySub_subject[i].Answer;
			if (this.mySub_subject[i].Answer == null){
                    	this.air += 1
			}
			this.SubjectList.push(tempAnswer);
		}
		this.Answer_bank_data.ShortName = this.shortname;
		this.Answer_bank_data.ExamNum = this.examnum;
		this.Answer_bank_data.FillBlankList = this.FillBlankList;
		this.Answer_bank_data.JudgmentList = this.JudgmentList;
		this.Answer_bank_data.SubjectList = this.SubjectList;
  	}


  	public  putDatas(datas){
		this.negAjax.post(`http://st01nbx01/oes/api/v1/Answer/`+this.Answer_bank_data.ShortName,datas,{})
      .then(({data}) => {
		    this.negAjax.post('http://st01nbx01/oes/api/v1/Grade/Objective/'+this.Answer_bank_data.ShortName+'?ExamNum='+this.Answer_bank_data.ExamNum).then(
				({data}) =>{
					if(data.errorCode == 200){
						this.negAlert.success('提交成功'); // 弹出成功提示框
					}
					else {
						this.negAlert.error('提交失败'); // 弹出出错提示框
					}
					this.router.navigate(['/intern-training/homepage'])
				});
		});
	}



	//调用服务post答案
	public putData(shortname,postData) {
  	    console.log("postdata");
  	    console.log(postData);
		this.temSaveService.postMessage(shortname,postData)
			.then(({ data }) => {
				if (data == 'Message:暂存成功！'){
					this.negAlert.success('暂存成功'); // 弹出成功提示框
				}
                this.Answer_bank_data=null;
				this.Answer_bank_data = {};
                this.Answer_bank_data.ShortName=[];
                this.Answer_bank_data.ExamNum=null;
				this.Answer_bank_data.FillBlankList = [];
                this.Answer_bank_data.JudgmentList = [];
                this.Answer_bank_data.SubjectList = [];
                this.FillBlankList=[];
                this.SubjectList=[];
                this.JudgmentList=[];
				// this.router.navigate(['/intern-training/homepage']);
			},
			error => this.negAlert.error('暂存失败')
		)
	}
}
