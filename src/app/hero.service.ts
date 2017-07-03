import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import "rxjs/add/operator/toPromise";

import { Hero } from './hero';

@Injectable()
export class HeroService {

	hero:Hero;
	private heroesUrl = 'api/heroes';
	private headers = new Headers({'content-type': 'application/json'});
	constructor( private http: Http ) { }

	getHeroes() : Promise<Hero[]> {
		return this.http.get(this.heroesUrl).toPromise().then(response => response.json().data as Hero[]).catch(this.handleError);
	}

	getHero(id:Number) : Promise<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get(url).toPromise().then(response=>response.json().data as Hero).catch(this.handleError);
	}

	update( hero:Hero ) : Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http.put(url,JSON.stringify(hero),{headers: this.headers}).toPromise().then(()=>hero).catch(this.handleError);
	}

	create( name:String ) : Promise<Hero> {
		return this.http.post( this.heroesUrl , JSON.stringify({name: name}) , { headers: this.headers } ).toPromise().then(request => request.json().data).catch(this.handleError);
	}

	delete ( id:Number ) : Promise<void> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete( url, { headers: this.headers } ).toPromise().then( () => null ).catch( this.handleError );
	}

	private handleError(error: any):Promise<any> {
		console.error("A Error occured!!!",error);
		return Promise.reject(error.message||error);
	}


}
