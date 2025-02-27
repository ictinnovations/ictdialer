import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageComponent } from './message.component';
import { FormsDocumentComponent } from './document/document-component';
import { AddDocumentComponent } from './document/document-form-component';
import { FormsRecordingComponent } from './recording/recording-component';
import { AddRecordingComponent } from './recording/recording-form-component';
import { FormsTextComponent } from './text/text-component';
import { AddTextComponent } from './text/text-form-component';


const routes: Routes = [{
  path: '',
  component: MessageComponent,
  children: [{
    path: 'document',
    component: FormsDocumentComponent,
  }, {
    path: 'document/new',
    component: AddDocumentComponent,
  }, {
    path: 'document/:id',
    component: AddDocumentComponent,
  }, {
    path: 'document/:id/download',
    component: FormsDocumentComponent,
  }, {
    path: 'document/:id/delete',
    component: AddDocumentComponent,
  }, {
    path: 'recording',
    component: FormsRecordingComponent,
  }, {
    path: 'recording/new',
    component: AddRecordingComponent,
  }, {
    path: 'recording/:id',
    component: AddRecordingComponent,
  }, {
    path: 'recording/:id/download',
    component: FormsRecordingComponent,
  }, {
    path: 'recording/:id/delete',
    component: AddRecordingComponent,
  }, {
    path: 'text',
    component: FormsTextComponent,
  }, {
    path: 'text/new',
    component: AddTextComponent,
  }, {
    path: 'text/:id',
    component: AddTextComponent,
  }, {
    path: 'text/:id/delete',
    component: AddTextComponent,
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
export class MessageRoutingModule {

}

export const routedComponents = [
  MessageComponent,
  FormsDocumentComponent,
  AddDocumentComponent,
  FormsRecordingComponent,
  AddRecordingComponent,
  FormsTextComponent,
  AddTextComponent,
];
