import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Component, OnInit , trigger, state , animate , style, transition } from '@angular/core';

import { HeroService } from './hero.service';
import { Router } from '@angular/router';


@Component({
	selector: 'my-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css'],
	animations: [
		trigger( 'heroState' , [
			state( 'inactive' , style({
					backgroundColor: '#eee',
					transform: 'scale(1)'
				})),
			state( 'active' , style ({
					backgroundColor: 'cfd8dc',
					transform: 'scale(1.1)'
				})),
			transition('inactive=>active',animate('100ms ease-in')),
			transition('active=>inactive',animate('100ms ease-out')),
			])
	]
})

export class HeroesComponent implements OnInit {

	constructor ( private heroService:HeroService, private router:Router ) {

	}
	title = 'heroes works!';
	// hero: Hero = {
	// 	id: 1,
	// 	name: 'windstorm'
	// };
	heroes: Hero[];
	selectedHero: Hero;

	getHeroes() : void {
		this.heroService.getHeroes().then(heros => this.heroes = heros);
	}

	onselect( hero: Hero ) {
		this.selectedHero = hero;
	}

	add( name:string ) : void {
		name = name.trim();

		if(!name) {
			return;
		}

		this.heroService.create( name ).then(hero => { this.heroes.push( hero ); this.selectedHero = null; });
	}

	delete( hero: Hero) : void {
		this.heroService.delete( hero.id ).then( () => { this.heroes = this.heroes.filter( h => h !== hero ); if ( this.selectedHero === hero ) { this.selectedHero = null; }});
	}	

	ngOnInit() : void {
		this.getHeroes();
	}

	gotoDetail() : void {
		this.router.navigate(['/detail',this.selectedHero.id]);
	}
}
