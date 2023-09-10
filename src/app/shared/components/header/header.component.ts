import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { redirectUrl } from 'src/app/config/env.config';


@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private authService: MsalService
  ) {

  }

  logout() {
    // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: redirectUrl,
    });
  }
}
