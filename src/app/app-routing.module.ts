import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedifyMainComponent } from './medify-main/medify-main.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  { path: 'home', component: MedifyMainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "**",
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
