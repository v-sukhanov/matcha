import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayFilterPipe } from '@shared/pipes/array-filter.pipe';


@NgModule({
	declarations: [
		ArrayFilterPipe
	],
	exports: [
		ArrayFilterPipe
	],
	imports: [
		CommonModule
	]
})
export class ArrayFilterModule {
}
