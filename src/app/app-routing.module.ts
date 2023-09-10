import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";

import { MsalGuard } from "@azure/msal-angular";
import { BrowserUtils } from "@azure/msal-browser";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/pages/profile.component";

const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "",
    component: LoginComponent,
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled", // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
