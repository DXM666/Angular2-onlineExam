import { Component, OnInit } from '@angular/core';
import { NegAjax,NegAuth } from '@newkit/core';
import { Router } from '@angular/router';
// import './exam-statis.component.css';

@Component({
	selector: 'exam-statis',
	templateUrl: 'exam-statis.component.html',
	styles:[require('./exam-statis.component.css').toString()]

})
export class ExamStatisComponent implements OnInit {

	paper1 = [];
	paper2 = [];
	HRname:string;
	getData() {
		//获取服务器上的错误率数据
		this.negAjax.get('http://st01nbx01/oes/api/v1/Mistake/' + new Date().getFullYear)
			.then(({ data }) => {
				data.mistakeA.forEach(element => {
					this.paper1.push(
						{
							questionNumber: element.questionnumber.toString(),
							errorRate: element.errorNum / element.totalNum
						}
					);
				});
				data.mistakeB.forEach(element => {
					this.paper2.push(
						{
							questionNumber: element.questionnumber.toString(),
							errorRate: element.errorNum / element.totalNum
						}
					);
				});


				var view1 = new wijmo.CollectionView(this.paper1);
				var chart1 = new wijmo.chart.FlexChart('#theChart1', {
					itemsSource: view1,
					bindingX: 'questionNumber',
					series: [
						{ binding: 'errorRate', name: '错误率' }
					],

					selectionMode: wijmo.chart.SelectionMode.Point
				});
				var view2 = new wijmo.CollectionView(this.paper2);

				var chart2 = new wijmo.chart.FlexChart('#theChart2', {
					itemsSource: view2,
					bindingX: 'questionNumber',
					series: [
						{ binding: 'errorRate', name: '错误率' }
					],
					selectionMode: wijmo.chart.SelectionMode.Point
				});
			});
	}
	constructor(
		private router: Router,
		private negAjax: NegAjax,
		private negAuth:NegAuth
	) { };

	ngOnInit() {
		//初始化柱状图
		this.getData();
		this.HRname=this.negAuth.displayName.substring(0,this.negAuth.displayName.indexOf('.')); 	
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