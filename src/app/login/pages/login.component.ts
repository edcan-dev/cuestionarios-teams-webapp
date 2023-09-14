import { Component, OnInit, Inject } from '@angular/core';
import { MsalBroadcastService, MsalService, MsalGuard, MsalGuardConfiguration, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { redirectUrl } from 'src/app/config/env.config';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDisplay: boolean = false;

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) { }

  ngOnInit(): void {

    console.log(this.authService.instance.getAllAccounts()[0].name);

    if(this.isLogged()) {
      window.location.href = '/home'
      return;
    }

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })
  }

  login() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  isLogged(): boolean {
    return this.authService.instance.getAllAccounts().length > 0;
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
