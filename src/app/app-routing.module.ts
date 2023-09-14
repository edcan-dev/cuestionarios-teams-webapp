import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { BrowserUtils } from "@azure/msal-browser";
import { HomePageComponent } from "./home/pages/home-page/home-page.component";
import { LoginComponent } from "./login/pages/login.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
   },
  {
    path: "home",
    component: HomePageComponent,
     canActivate: [MsalGuard]
   },
   {
    path: '**',
    redirectTo: ''
   }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      /* {
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled",
     }*/)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
