import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    ProfileModule,
    SharedModule,
    CommonModule
  ],
  exports: [HomePageComponent],
  declarations: [
    HomePageComponent
  ],

})
export class HomeModule { }
