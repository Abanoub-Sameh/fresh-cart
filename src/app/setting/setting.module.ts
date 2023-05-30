import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UpdatePasswordComponent,
    UpdateDataComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
  ]
})
export class SettingModule { }
