import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { BrowserUtils } from "@azure/msal-browser";
import { LoginComponent } from "./_login/login.component";
import { HomePageComponent } from "./home/pages/home-page/home-page.component";

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "**",
    redirectTo: '/home'
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled",
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
