import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { PagesComponent } from './components/pages/pages.component';
import { MediaComponent} from './components/media/media.component';
import { SettingsComponent } from './components/settings/settings.component';
import { VerifyRegistrationComponent } from './components/verify-registration/verify-registration.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NewloginComponent } from './components/newlogin/newlogin.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {path:'', redirectTo: 'dashboard', pathMatch:'full'},
  {path:'dashboard', component: DashboardComponent},
  {path:'products', component: ProductsComponent},
  {path:'login', component: LoginComponent},
  {path:'pages', component: PagesComponent},
  {path:'media', component: MediaComponent},
  {path:'settings', component: SettingsComponent},
  {path:'verifyRegistration', component: VerifyRegistrationComponent},
  {path:'signup', component: SignUpComponent},
  {path:'signin', component: SignInComponent},
  {path:'homepage', component: HomePageComponent},
  {path:'newlogin', component: NewloginComponent},
  {path:'registration', component: RegistrationComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
