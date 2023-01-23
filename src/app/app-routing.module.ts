import { ProfilComponent } from './components/profil/profil.component';
import { ContributeurComponent } from './components/contributeur/contributeur.component';
import { DetailArticleComponent } from './components/product/detail-article/detail-article.component';
import { GalerieWithFilterComponent } from './components/product/galerie-with-filter/galerie-with-filter.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/shared/contact/contact.component';
import { VendreVotreContenuComponent } from './components/product/vendre-votre-contenu/vendre-votre-contenu.component';
import {HomeComponent} from "./components/home-page/home/home.component";
import {ListProductComponent} from "./components/product/list-product/list-product.component";

import {UpdateProductComponent} from "./components/product/update-product/update-product.component";
import {ListContributeurComponent} from "./components/list-contributeur/list-contributeur.component";
import {TarifComponent} from "./components/tarif/tarif.component";
import {ComingSoonComponent} from "./components/shared/coming-soon/coming-soon.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'more', component: GalerieWithFilterComponent },
  { path: 'details/:id', component: DetailArticleComponent },
  { path: 'contributeur', component: ContributeurComponent },
  { path: 'profil', component: ProfilComponent },
  {path: 'vendre-votre-contenu', component: VendreVotreContenuComponent},
  {path: 'update-product/:id', component: UpdateProductComponent},
  {path: 'all-product', component: ListProductComponent},
  {path: 'all-contributeur', component: ListContributeurComponent},
  {path: 'tarif', component: TarifComponent},
  {path: 'coming-soon', component: ComingSoonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  ContactComponent,

  GalerieWithFilterComponent,
  DetailArticleComponent,
  ContributeurComponent,
  ProfilComponent,
];
