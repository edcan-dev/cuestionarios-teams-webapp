import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

import { UserInfo, UserProfilePhoto } from '../../interfaces/home.interfaces';
import { redirectUrl } from 'src/app/config/env.config';

const GRAPH_PROFILE_ENDPOINT = "https://graph.microsoft.com/v1.0/me";
const GRAPH_PHOTO_ENDPOINT = "https://graph.microsoft.com/v1.0/me/photo";
const GRAPH_PHOTO_ENDPOINT_ = "https://graph.microsoft.com/v1.0/me/photo/$value";

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  officeLocation?: string
};


addEventListener("popstate", (event) => {
  console.log(history);
});


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  userInfo: UserInfo = {};

  profile!: ProfileType;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getProfile();
    this.broadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  async getProfile() {
    this.http.get(GRAPH_PROFILE_ENDPOINT).subscribe((profile) => {
      this.profile = profile;
      this.defineUserInfo();
      this.defineUserPhotoUrl();
    });
  }

  defineUserInfo() {
    const _firstName = this.profile!.givenName!.split(' ')[0];
    const _lastName = this.profile!.surname!.split(' ')[0];
    this.userInfo = {
      firstName: _firstName!,
      lastName: _lastName!,
      studentId: this.profile!.officeLocation,
    };
  }


  defineUserPhotoUrl() {
    const accessTokenRequest = {
      scopes: ['user.read'],
      account: this.authService.instance.getAllAccounts()[0],
    };

    this.authService
      .acquireTokenSilent(accessTokenRequest)
      .subscribe((access) => {
        const _headers = new Headers({
          Authorization: `Bearer ${access.accessToken}`,
        });

        fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
          headers: _headers,
          method: 'GET',
        })
          .then((response) => {
            if (response.status === 200) {
              // Convert the response to a blob (binary large object)
              return response.blob();
            } else {
              throw new Error('Failed to retrieve the profile photo.');
            }
          })
          .then((blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              const profilePhotoUrl = reader.result;
              this.userInfo.photoUrl = <string> profilePhotoUrl;

            };
            reader.readAsDataURL(blob);
          })

      });
  }

  logout() {
    // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: redirectUrl,
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}

