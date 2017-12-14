// 待导入的组件
import {ExamPageComponent} from "./exam-page/exam-page.component";
import {ExamHomepageComponent} from "./exam-homepage/exam-homepage.component";
import {ExamScoreComponent} from "./exam-score/exam-score.component";
import {ExamDetailComponent} from "./exam-detail/exam-detail.component";
import {ExamModifyComponent} from "./exam-modify/exam-modify.component";
import {ExamTimeComponent} from "./exam-time/exam-time.component";
import {ExamStatisComponent} from "./exam-statis/exam-statis.component";
import {ExamRateComponent} from "./exam-rate/exam-rate.component";


// 导出单个组件，方便路由使用
export {
  ExamScoreComponent,
  ExamPageComponent,
  ExamHomepageComponent,
  ExamDetailComponent,
  ExamModifyComponent,
  ExamTimeComponent,
  ExamStatisComponent,
  ExamRateComponent,
};



// 导出所有页面，方便在module中一次性注入
export const ALL_PAGES = [
  ExamScoreComponent,
  ExamPageComponent,
  ExamHomepageComponent,
  ExamDetailComponent,
  ExamModifyComponent,
  ExamTimeComponent,
  ExamStatisComponent,
  ExamRateComponent,
];
