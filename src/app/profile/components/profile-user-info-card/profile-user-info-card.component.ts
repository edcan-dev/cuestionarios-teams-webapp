import { Component, Input } from '@angular/core';
import { UserInfo } from '../../interfaces/profile.interfaces';

@Component({
  selector: 'profile-user-info-card',
  templateUrl: './profile-user-info-card.component.html',
  styleUrls:['profile-user-info-card.component.css']
})
export class ProfileUserInfoCardComponent {

  @Input()
  public userInfo: UserInfo;

  constructor() {
    this.userInfo = {};
  }


}
