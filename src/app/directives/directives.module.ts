import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoHideDirective } from './auto-hide.directive';

@NgModule({
  declarations: [AutoHideDirective],
  imports: [
    CommonModule
  ],
  exports: [AutoHideDirective]
})
export class DirectivesModule { }
