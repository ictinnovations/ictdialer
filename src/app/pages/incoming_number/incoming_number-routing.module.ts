import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomingNumberComponent } from './incoming_number.component';
import { FormsIncomingNumberComponent } from './incoming_number-component';
import { ForwardIncomingNumberComponent } from './forward-incoming_number-component';
import { EditIncomingNumberComponent } from './edit-incoming_number-component';
import { AssignIncomingNumberComponent } from './assign-incoming_number-component';

const routes: Routes = [{
  path: '',
  component: IncomingNumberComponent,
  children: [{
    path: 'incoming_number',
    component: FormsIncomingNumberComponent,
  }, {
    path: 'incoming_number/:id',
    component: EditIncomingNumberComponent,
  }, {
    path: 'incoming_number/:id/forward',
    component: ForwardIncomingNumberComponent,
  }, {
    path: 'incoming_number/:id/assign',
    component: AssignIncomingNumberComponent, 
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
export class IncomingNumberRoutingModule {

}

export const routedComponents = [
  IncomingNumberComponent,
  FormsIncomingNumberComponent,
  EditIncomingNumberComponent,
  ForwardIncomingNumberComponent,
  AssignIncomingNumberComponent,
];
