import { NgModule } from '@angular/core';

import { ProfileUserInfoCardComponent } from './components/profile-user-info-card/profile-user-info-card.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilePendingQuizesComponent } from './components/profile-pending-quizes/profile-pending-quizes.component';
import { ProfileMyGroupsComponent } from './components/profile-my-groups/profile-my-groups.component';
import { ProfileQuizesHistoryComponent } from './components/profile-quizes-history/profile-quizes-history.component';
import { ProfileCreatedQuizesComponent } from './components/profile-created-quizes/profile-created-quizes.component';
import { CommonModule } from '@angular/common';
import { ProfileMyGroupsAndStudentsComponent } from './components/profile-my-groups-and-students/profile-my-groups-and-students.component';
import { ProfileStatisticsComponent } from './components/profile-statistics/profile-statistics.component';


@NgModule({
  declarations: [
    ProfilePendingQuizesComponent,
    ProfileUserInfoCardComponent,
    ProfileMyGroupsComponent,
    ProfileQuizesHistoryComponent,
    ProfileCreatedQuizesComponent,
    ProfileMyGroupsAndStudentsComponent,
    ProfileStatisticsComponent,
  ],
  exports: [
    ProfilePendingQuizesComponent,
    ProfileUserInfoCardComponent,
    ProfileMyGroupsComponent,
    ProfileQuizesHistoryComponent,
    ProfileCreatedQuizesComponent,
    ProfileMyGroupsAndStudentsComponent,
    ProfileStatisticsComponent,
  ],
  imports: [SharedModule, CommonModule]
})
export class ProfileModule { }
