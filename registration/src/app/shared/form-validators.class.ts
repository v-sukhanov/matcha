import { FormControl } from '@angular/forms';


export interface IPasswordValidatorOptions {
	requireDigit?: boolean;
	requireLowercase?: boolean;
	requireNonAlphanumeric?: boolean;
	requireUppercase?: boolean;
	requiredLength: number;
	requiredUniqueChars: boolean;
}

export class FormValidators {
	public static options: IPasswordValidatorOptions = {
		requireDigit: true,
		requireLowercase: true,
		requireNonAlphanumeric: false,
		requireUppercase: false,
		requiredLength: 6,
		requiredUniqueChars: false
	};
	private static _requireDigitRegExp: RegExp = /[0-9]/;
	private static  _requireLowercaseRegExp: RegExp = /[a-z]/;
	private static  _requireUppercase: RegExp = /[A-Z]/;
	// private static  _requiredUniqueChars: RegExp = /[\.,:;?!*+%\-<>@[\]\/\\\_{}$#]/;

	constructor() {
	}
	static passValidator(control: FormControl): { [key: string]: any } | null {
		const uppercasePattern: RegExp = /[A-Z]/i;
		const lowercasePattern: RegExp = /[a-z]/i;
		const specSymbolPattern: RegExp = /[\.,:;?!*+%\-<>@[\]\/\\\_{}$#]/i;
		const minLengthPattern: RegExp = /^.{8,}$/i;
		if (FormValidators.options.requireDigit && !FormValidators._requireDigitRegExp.test(control.value)) {
			return {
				passValidator: true,
				requiredPattern: FormValidators._requireDigitRegExp,
				actualValue: control.value
			};
		}
		if (FormValidators.options.requireLowercase && !FormValidators._requireLowercaseRegExp.test(control.value)) {
			return {
				passValidator: true,
				requiredPattern: FormValidators._requireLowercaseRegExp,
				actualValue: control.value
			};
		}
		if (FormValidators.options.requireUppercase && !FormValidators._requireUppercase.test(control.value)) {
			return {
				passValidator: true,
				requiredPattern: FormValidators._requireUppercase,
				actualValue: control.value
			};
		}
		if (FormValidators.options.requiredLength && !(new RegExp('^.{' + FormValidators.options.requiredLength + ',}$').test(control.value))) {
			return {
				passValidator: true,
				requiredPattern: new RegExp('/^.{' + FormValidators.options.requiredLength + ',}$/'),
				actualValue: control.value
			};
		}
		return null;
	}

	static emailValidator(control: FormControl): { [key: string]: any } | null {
		const pattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
		if (!pattern.test(control.value)) {
			return {
				emailValidator: true,
				requiredPattern: pattern,
				actualValue: control.value
			};
		}
		return null;
	}
}
