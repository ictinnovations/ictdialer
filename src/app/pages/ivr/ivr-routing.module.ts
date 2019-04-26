import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsIVRComponent } from './ivr-component';
import { IVRComponent } from './ivr.component';
import { AddIVRComponent } from './ivr-form-component';


const routes: Routes = [{
  path: '',
  component: IVRComponent,
  children: [{
    path: 'ivr',
    component: FormsIVRComponent,
  }, {
    path: 'ivr/new',
    component: AddIVRComponent,
  }, {
    path: 'ivr/:id',
    component: AddIVRComponent,
  }, {
    path: 'ivr/:id/delete',
    component: AddIVRComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class IVRRoutingModule {

}

export const routedComponents = [
  IVRComponent,
  FormsIVRComponent,
  AddIVRComponent,
];
