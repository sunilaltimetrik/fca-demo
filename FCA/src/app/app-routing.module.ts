import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TacticDashboardComponent } from "src/app/tactic-dashboard/tactic-dashboard.component";
import { QueryBuilderComponent } from "src/app/query-builder/query-builder.component";
import { OfferListingComponent } from "src/app/offer-listing/offer-listing.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TacticDashboardComponent },
  { path: 'query-builder', component: QueryBuilderComponent },
  { path: 'offer-listing', component: OfferListingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
