import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import {Forms} from '@angular/forms';

import {NegAjax,NegStorage,NegAlert} from '@newkit/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NegAjax,NegStorage,NegAlert,NegAuth} from '@newkit/core';

// import "./exam-detail.component.css"


//题目
export class Title{
	option:string[] = [];    //选项
	QuestionNumber:number;
	Correctanswer:string[] = [];
	Istrue:string[] = [];
}


@Component({
	selector: 'exam-detail',
	// templateUrl: 'exam-detail.component.html',
	templateUrl:'exam-detail.component.html',
	styles:[require('./exam-detail.component.css').toString()]
})

export class ExamDetailComponent implements OnInit {

	mySub_judge:Title[] = [];
	mySub_blank:Title[] = [];
	mySub_subject:Title[] = [];

	StaffName:string;

	datas:any;
	answers:any;
	data1:any[]=[];
	data2:any[]=[];
	fillBlanks:any[]= [];
	judgments:any[] = [];
	subjects:any[] = [];

	constructor(
		private http:HttpClient,
		private negAjax: NegAjax,
		private negStorage:NegStorage,
		private router:Router,
		private negAuth: NegAuth,
	){}

	ngOnInit() {
			this.StaffName = this.negAuth.displayName.substring(0, this.negAuth.displayName.indexOf('.'))
			let shortname = this.negStorage.session.get('homepage-shortName');
			let examnum = this.negStorage.session.get('homepage-examNum');
			this.http.get('http://st01nbx01/oes/api/v1/answer/'+shortname+'?examnum='+examnum).subscribe(data=>{
				this.answers = data;
			this.http.get('http://st01nbx01/oes/api/v1/Template/'+this.answers.fillBlankList[0].paper).subscribe(data=> {
                this.datas = data;

			console.log(this.datas);
			console.log(this.answers);

			//填空题
			this.fillBlanks = this.datas.fillBlankList;

			for (let i=0;i<this.datas.fillBlankList.length;i++) {
                let tempSub = new Title();    //填空题
                tempSub.QuestionNumber = this.datas.fillBlankList[i].questionNumber;
                tempSub.Istrue = this.answers.fillBlankList[i].isTrue;
                for (let j = 0; j < this.datas.fillBlankList[i].correctAnswer.split(',').length; j++) {
                    tempSub.option[j] = this.answers.fillBlankList[i].answer[j];
                    // tempSub.Correctanswer[j] = this.datas.fillBlankList[i].correctAnswer[j];
                }
                this.mySub_blank.push(tempSub);
                console.log(this.mySub_blank[0].option[0])

            }
            //判断题
			this.judgments = this.datas.judgmentList;

			for (let i = 0;i < this.datas.judgmentList.length;i++){
				let tempSub = new Title();    //题
				tempSub.QuestionNumber = this.datas.judgmentList[i].questionNumber;
				tempSub.Correctanswer = this.datas.judgmentList[i].correctAnswer;
				if(this.answers.judgmentList[i].answer == null){
					tempSub.option = 'error';
					// console.log(tempSub.option)
				}
				else {
					tempSub.option = this.answers.judgmentList[i].answer;
				}
				this.mySub_judge.push(tempSub);  //一张卷子的选择
				// console.log(tempSub.option)
			}
			//主观题
			this.subjects = this.datas.subjectList;
			for (let i = 0;i < this.datas.subjectList.length;i++)
			{


				let tempSub = new Title();
				tempSub.QuestionNumber = this.datas.subjectList[i].questionNumber;
				tempSub.option = this.answers.subjectList[i].answer;
				this.mySub_subject.push(tempSub);
			}
            });
			});
			// console.log(this.mySub_judge)
	}



	//新职员首页
	homepage(){
		this.router.navigate(['/intern-training/homepage'])
	}
}