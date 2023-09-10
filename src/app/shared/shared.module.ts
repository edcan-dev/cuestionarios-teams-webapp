import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class SharedModule { }
