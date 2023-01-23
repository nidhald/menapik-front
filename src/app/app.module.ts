import { SwiperModule } from 'swiper/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ScrollToTopComponent } from './components/shared/scroll-to-top/scroll-to-top.component';
import { UserAuthModule } from './components/user-auth/user-auth.module';
import { HeroComponent } from './components/home-page/hero/hero.component';
import { VendreVotreContenuComponent } from './components/product/vendre-votre-contenu/vendre-votre-contenu.component';
import {ProductService} from './Service/product.service';
import {UserService} from './Service/user.service';
import { HomeComponent } from './components/home-page/home/home.component';
import {CreationComponent} from "./components/home-page/creation/creation.component";
import {ValeurComponent} from "./components/home-page/valeur/valeur.component";
import {TarifComponent} from "./components/tarif/tarif.component";
import {FaqComponent} from "./components/home-page/faq/faq.component";
import {ContenuComponent} from "./components/home-page/contenu/contenu.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule ,HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import {DataTablesModule} from "angular-datatables";
import { ListContributeurComponent } from './components/list-contributeur/list-contributeur.component';
import { ComingSoonComponent } from './components/shared/coming-soon/coming-soon.component';
import {NgxPaginationModule} from "ngx-pagination";




export const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    routingComponents,
    HeroComponent,
    VendreVotreContenuComponent,
    HomeComponent,
    CreationComponent,
    ValeurComponent,
    TarifComponent,
    FaqComponent,
    ContenuComponent,
    ListProductComponent,
    UpdateProductComponent,
    ListContributeurComponent,
    ComingSoonComponent
  ],
  imports: [

    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
    }),
    SwiperModule,
    UserAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule

  ],
  exports: [],
  providers: [
    ProductService,
    UserService,
    FormsModule,
    HttpClient,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
