import { NgModule } from '@angular/core';

import { ProfileComponent } from './pages/profile.component';
import { ProfileUserInfoCardComponent } from './components/profile-user-info-card/profile-user-info-card.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilePendingQuizesComponent } from './components/profile-pending-quizes/profile-pending-quizes.component';

@NgModule({
  declarations: [ProfileComponent, ProfileUserInfoCardComponent, ProfilePendingQuizesComponent],
  exports: [ProfileComponent],
  imports: [SharedModule]
})
export class ProfileModule { }
