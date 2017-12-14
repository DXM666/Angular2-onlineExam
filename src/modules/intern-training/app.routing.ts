import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { 
  ExamRateComponent,
  ExamDetailComponent,
  ExamHomepageComponent,
  ExamModifyComponent,
  ExamPageComponent,
  ExamScoreComponent,
  ExamStatisComponent,
  ExamTimeComponent,
} from './pages';


// 配置路由
const appRoutes: Routes = [
    // {
    //   path:'',
    //   redirectTo:'/intern-training/index',
    //   pathMatch:'prefix'
    // },
  // { path: 'index', component: ProductListComponent },
  {path:'detail',component:ExamDetailComponent},
  {path:'homepage',component:ExamHomepageComponent},
  {path:'homepage/:refresh',component:ExamHomepageComponent},
  {path:'modify',component:ExamModifyComponent},
  {path:'page',component:ExamPageComponent},
  {path:'score',component:ExamScoreComponent},
  {path:'statis',component:ExamStatisComponent},
  {path:'time',component:ExamTimeComponent},
  {path:'rate',component:ExamRateComponent},


];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);
