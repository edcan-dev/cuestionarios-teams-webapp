import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

import { UserInfo } from '../../interfaces/home.interfaces';
import { redirectUrl } from 'src/app/config/env.config';
import { GraphApiService } from '../../../shared/services/graph-api-service.service';
import { ProfileType } from 'src/app/profile/interfaces/profile.interfaces';

const GRAPH_PROFILE_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_PHOTO_ENDPOINT = 'https://graph.microsoft.com/v1.0/me/photo';
const GRAPH_PHOTO_ENDPOINT_ =
  'https://graph.microsoft.com/v1.0/me/photo/$value';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  userInfo: UserInfo = {};
  profile: ProfileType = {};
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
    private http: HttpClient,
    private graphApiService: GraphApiService
  ) {
  }

  ngOnInit() {
    this.setUserInfo();
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

  async setUserInfo() {
    const url = await this.graphApiService.getProfilePhotoUrl();
    this.graphApiService
      .getProfileInfo()
      .subscribe(async ({ givenName, surname, officeLocation }) => {
        const _firstName = givenName!.split(' ')[0];
        const _lastName = surname!.split(' ')[0];
        this.userInfo = {
          firstName: _firstName!,
          lastName: _lastName!,
          studentId: officeLocation,
          photoUrl: url
        };
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
