import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home.component';

export const  childRouter: Routes = [
    {path: '', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forChild(childRouter)],
    exports: [RouterModule]
})

export class HomeRoutingModule {

}