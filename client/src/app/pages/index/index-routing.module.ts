import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IndexComponent} from './index.component';

export const childRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: '../+home/home.module#HomeModule'},
    {path: 'classify/:classify', loadChildren: '../+classify/classify.module#ClassifyModule'},
    {path: 'detail/:id', loadChildren: '../+detail/detail.module#DetailModule'},
];

export const routes: Routes = [
    {path: '', component: IndexComponent, children: childRoutes},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class IndexRoutingModule {}