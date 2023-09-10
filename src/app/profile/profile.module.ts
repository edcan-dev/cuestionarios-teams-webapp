import { NgModule } from '@angular/core';

import { ProfileUserInfoCardComponent } from './components/profile-user-info-card/profile-user-info-card.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilePendingQuizesComponent } from './components/profile-pending-quizes/profile-pending-quizes.component';
import { ProfileMyGroupsComponent } from './components/profile-my-groups/profile-my-groups.component';
import { ProfileQuizesHistoryComponent } from './components/profile-quizes-history/profile-quizes-history.component';

@NgModule({
  declarations: [
    ProfilePendingQuizesComponent, ProfileUserInfoCardComponent, ProfileMyGroupsComponent, ProfileQuizesHistoryComponent
  ],
  exports: [
    ProfilePendingQuizesComponent, ProfileUserInfoCardComponent,
    ProfileMyGroupsComponent,
    ProfileQuizesHistoryComponent
  ],
  imports: [SharedModule]
})
export class ProfileModule { }
