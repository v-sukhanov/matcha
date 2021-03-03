import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

	transform(value: Array<any>, func: (val: any, index?: number, values?: Array<any>) => boolean): any[] {
		if (value) {
			const temp = [...value];
			return temp.filter(func);
		} else {
			return [];
		}
	}

}
