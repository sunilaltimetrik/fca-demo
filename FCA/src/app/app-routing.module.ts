import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TacticDashboardComponent } from "src/app/tactic-dashboard/tactic-dashboard.component";
import { QueryBuilderComponent } from "src/app/query-builder/query-builder.component";
import { OfferListingComponent } from "src/app/offer-listing/offer-listing.component";
import { OfferCompaireComponent } from "src/app/offer-compaire/offer-compaire.component";

const routes: Routes = [
  { path: '', redirectTo: '/query-builder', pathMatch: 'full' },
  { path: 'query-builder', component: QueryBuilderComponent },
  { path: 'dashboard', component: TacticDashboardComponent },
  { path: 'offer-listing', component: OfferListingComponent },
  { path: 'compaire-offer', component: OfferCompaireComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
