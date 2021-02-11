import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from 'app/features/user-settings/user-settings.component';
import { UserSettingsRoutingModule } from '@features/user-settings/user-settings-routing.module';
import { FlexModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
	declarations: [UserSettingsComponent],
	imports: [
		CommonModule,
		UserSettingsRoutingModule,
		FlexModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatInputModule
	]
})
export class UserSettingsModule {}

