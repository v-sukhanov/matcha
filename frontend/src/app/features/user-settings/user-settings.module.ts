import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from 'app/features/user-settings/user-settings.component';
import { UserSettingsRoutingModule } from '@features/user-settings/user-settings-routing.module';
import { FlexModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';
import { UserParamsSettingsComponent } from 'app/features/user-settings/user-params-settings/user-params-settings.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
	declarations: [UserSettingsComponent, AccountSettingsComponent, PasswordSettingsComponent, UserParamsSettingsComponent],
	imports: [
		CommonModule,
		UserSettingsRoutingModule,
		FlexModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatInputModule,
		MatSliderModule,
		MatSelectModule,
		MatChipsModule,
		MatIconModule
	]
})
export class UserSettingsModule {}

