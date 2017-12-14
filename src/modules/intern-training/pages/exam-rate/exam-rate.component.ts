import { Component, OnInit } from '@angular/core';
import { NegAjax, NegAlert, NegStorage, NegAuth } from '@newkit/core';
import { Router } from '@angular/router';
import './exam-rate.component.css';

@Component({
	selector: 'exam-rate',
	templateUrl: 'exam-rate.component.html'
})

export class ExamRateComponent implements OnInit {

	ShortName: string;
	ExamNum: number;
	HRname: string;
	Status: number;
	subjectives = [];

	scoreList = [];
	getData() {
		this.Status =
			this.ShortName = this.negStorage.session.get('modify-shortName');
		this.ExamNum = this.negStorage.session.get('modify-examNum');
		this.negAjax.get('http://st01nbx01/oes/api/v1/Answer/' + this.ShortName + '?ExamNum=' + this.ExamNum + '&QuestionType=Subjective')
			.then(({ data }) => {
				var subjective = data;
				this.negAjax.get('http://st01nbx01/oes/api/v1/Template/' + subjective.subjectList[0].paper + '?QuestionType=Subjective')
					.then(({ data }) => {
						let index = 0;
						subjective.subjectList.forEach(element => {
							var score = element.score;
							if (score < 0) {
								score = null;
							}
							this.subjectives.push({
								Template: data.subjectList[index].question,
								TotalScore: data.subjectList[index].score,
								CorrectAnswer: data.subjectList[index].correctAnswer,
								Paper: element.paper,
								QuestionNumber: element.questionNumber,
								ShortName: element.shortName,
								ExamNum: element.examNum,
								Answer: element.answer,
								Score: element.score,
								ErrorMessage: null
							});
							//初始化存放hr评分成绩的List
							this.scoreList.push({
								Mark: null,
								ExamNum: element.examNum,
								QuestionNumber: element.questionNumber,
								Score: score
							});
							index++;
						});
					});
			});
	}
	//根据传入的index确定需要判断的score位于哪里 然后根据score的值进行重新赋值
	scoreChange(index: number) {
		this.scoreList[index].Mark = true;
		this.scoreList[index].Score = this.scoreList[index].Score.trim();
		if (this.subjectives[index].TotalScore < this.scoreList[index].Score) {
			this.subjectives[index].ErrorMessage = '得分不得大于总分';
			this.scoreList[index].Score = this.subjectives[index].TotalScore;
		} else if (this.scoreList[index].Score < 0) {
			this.subjectives[index].ErrorMessage = '得分小于不得0';
			this.scoreList[index].Score = 0;
		} else if (this.scoreList[index].Score >= 0) {
			this.subjectives[index].ErrorMessage = '';
		}
		else {
			this.subjectives[index].ErrorMessage = '输入成绩无效';
			this.scoreList[index].Score = 0;
		}

	}

	saveScore(index) {
		var reqOptions = {
			headers: {},
			hideLoading: true, // 默认false
			useCustomErrorHandler: true // 默认false
		};
		if (this.Status == 0) {
			this.negAjax.post('http://st01nbx01/oes/api/v1/Answer/HR/' + this.ShortName + '/method=1', this.scoreList[index], reqOptions).then(() => {
				this.scoreList[index].Mark = false;
			});
		}
		else {
			this.negAjax.post('http://st01nbx01/oes/api/v1/Answer/HR/' + this.ShortName + '/method=1', this.scoreList[index], reqOptions).then(() => {
				this.negAjax.post('http://st01nbx01/oes/api/v1/Grade/' + this.ShortName + '?ExamNum=' + this.ExamNum, {},reqOptions).then(() => {
					this.scoreList[index].Mark = false;
				});
			});
		}
	}

	sendScore() {
		this.negAjax.post('http://st01nbx01/oes/api/v1/Grade/' + this.ShortName + '?ExamNum=' + this.ExamNum, {}).then(() => {
			this.negAlert.success('提交成功');
			this.router.navigate(['/intern-training/modify'])
		});
	}
	constructor(
		private router: Router,
		private negAjax: NegAjax,
		private negStorage: NegStorage,
		private negAuth: NegAuth,
		private negAlert: NegAlert
	) { }
	ngOnInit() {
		this.getData();
		this.HRname = this.negAuth.displayName.substring(0, this.negAuth.displayName.indexOf('.'))
	}

	//批改试卷
	tomodify() {
		this.router.navigate(['/intern-training/modify'])
	}
	//查看成绩
	score() {
		this.router.navigate(['/intern-training/score'])
	}
	//情况统计
	statis() {
		this.router.navigate(['/intern-training/statis'])
	}
	//设置时间
	time() {
		this.router.navigate(['/intern-training/time'])
	}
}