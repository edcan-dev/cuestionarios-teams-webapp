import { Component, Inject, OnInit, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

import { Role, UserInfo } from '../../interfaces/home.interfaces';
import { getTeacherRole, redirectUrl } from 'src/app/config/env.config';
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
  public userInfo: UserInfo = {};
  private profile: ProfileType = {};
  public userLayout: string[] = [];
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
    private http: HttpClient,
    private graphApiService: GraphApiService
  ) { }

  ngOnInit() {
    this.setUserInfo();
    this.setUserLayout();
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

  private async setUserInfo(): Promise<void> {
    const url = await this.graphApiService.getProfilePhotoUrl();
    this.graphApiService
      .getProfileInfo()
      .subscribe(({ givenName, surname, officeLocation, jobTitle }) => {
        let userRole: Role =
          jobTitle!.includes('Estudiante') || jobTitle! === 'Estudiante'
            ? 'STUDENT'
            : 'TEACHER';
        this.userInfo = {
          firstName: givenName!.split(' ')[0]!,
          lastName: surname!.split(' ')[0]!,
          studentId: officeLocation,
          photoUrl: url,
          role: isDevMode() ? getTeacherRole(officeLocation!) : userRole
        };
      });
  }

  private setUserLayout(): void {
    if(this.userInfo.role === 'STUDENT') {
      this.userLayout = ['Cuestionarios Pendientes', 'Mis Grupos', 'Historal de Cuestionarios']
    } else {
      this.userLayout = ['Cuestionarios Creados','Mis Grupos y Alumnos','Estadísticas']
    }
  }

  logout(): void{
    // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: redirectUrl,
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
