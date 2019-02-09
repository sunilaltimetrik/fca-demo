import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TacticDashboardComponent } from './tactic-dashboard/tactic-dashboard.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { OfferListingComponent } from './offer-listing/offer-listing.component';
import { OfferCompaireComponent } from './offer-compaire/offer-compaire.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TacticDashboardComponent,
    DragDropComponent,
    QueryBuilderComponent,
    OfferListingComponent,
    OfferCompaireComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
