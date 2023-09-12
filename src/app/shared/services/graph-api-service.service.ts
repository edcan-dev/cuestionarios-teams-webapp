import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, SilentRequest } from '@azure/msal-browser';
import { Observable, map, of, tap, filter, firstValueFrom } from 'rxjs';
import { ProfileType } from 'src/app/profile/interfaces/profile.interfaces';

const GRAPH_PROFILE_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_PHOTO_ENDPOINT = 'https://graph.microsoft.com/v1.0/me/photo/$value';

@Injectable({
  providedIn: 'root',
})
export class GraphApiService {
  private accessTokenRequest?: SilentRequest;

  constructor(
    private http: HttpClient,
    private authService: MsalService) { }

  getProfileInfo(): Observable<ProfileType> {
    return this.http.get<ProfileType>(GRAPH_PROFILE_ENDPOINT);
  }

  async getProfilePhotoUrl(): Promise<string> {


    const accessTokenRequest = {
      scopes: ['user.read'],
      account: this.authService.instance.getAllAccounts()[0],
    };

    const promise = new Promise<string>(
      (resolve, reject)=> {

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
              return response.blob();
            } else {
              throw('Failed to retrieve the profile photo.');
            }
          })
          .then((blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              const profilePhotoUrl = reader.result as string;
              resolve(profilePhotoUrl)
            };
            reader.readAsDataURL(blob);
          })

      });

  });

  return promise;

}
}
/*
        fetch(GRAPH_PHOTO_ENDPOINT, {
          headers: _headers,
          method: 'GET',
        })
          .then((response) => {
            if (response.status === 200) {
              return response.blob();
            } else {
              throw new Error('Failed to retrieve the profile photo.');
            }
          })
          .then((blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              reader.result as string;
            };
            reader.readAsDataURL(blob);
          })


}

      /*
        map(access => {

          const _headers = new HttpHeaders({
            Authorization: `Bearer ${access.accessToken}`,
          });


      )


      .subscribe((access) => {
      })
        const _headers = new HttpHeaders({
          Authorization: `Bearer ${access.accessToken}`,
        });

        this.http.get<Blob>(GRAPH_PHOTO_ENDPOINT, {headers: _headers})
          .pipe(
            map(blob => {
              const reader = new FileReader();
              return reader.onload = () => {
                return reader.result as string;
              };
              reader.readAsDataURL(blob);
            })
          ).subscribe(data =>  data)

        /*
        fetch(GRAPH_PHOTO_ENDPOINT, {
          headers: _headers,
          method: 'GET',
        })
          .then((response) => {
            if (response.status === 200) {
              return response.blob();
            } else {
              throw new Error('Failed to retrieve the profile photo.');
            }
          })
          .then((blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              reader.result as string;
            };
            reader.readAsDataURL(blob);
          })
          */

/*  private defineUserInfo() {
    const _firstName = this.profile!.givenName!.split(' ')[0];
    const _lastName = this.profile!.surname!.split(' ')[0];
    this.userInfo = {
      firstName: _firstName!,
      lastName: _lastName!,
      studentId: this.profile!.officeLocation,
    };
  } */
