import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { MatCommonModule } from '@angular/material/core';

@NgModule({
  imports: [
    ProfileModule,
    SharedModule
  ],
  exports: [HomePageComponent],
  declarations: [
    HomePageComponent
  ],

})
export class HomeModule { }
