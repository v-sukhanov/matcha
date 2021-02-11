import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'matcha-navbar-item',
	templateUrl: './navbar-item.component.html',
	styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent implements OnInit {
	@Input() public iconName: string;
	@Input() public link: string;
	@Input() public text: string;

	constructor() {
		this.iconName = '';
		this.link = '';
		this.text = '';
	}

	ngOnInit(): void {
	}

}
