import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphqlRoutingModule } from './graphql-routing.module';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GraphqlRoutingModule
  ],
  exports: [

  ]
})
export class GraphqlModule { }
