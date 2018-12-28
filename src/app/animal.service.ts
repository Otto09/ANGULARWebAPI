import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Animal } from './animal';
import { ANIMALS } from './mock-animals';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private animalsUrl = 'api/animals';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET animals from the server */
  getAnimals (): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.animalsUrl)
      .pipe(
        tap(_ => this.log('fetched animals')),
        catchError(this.handleError('getAnimals', []))
      );
  }

  /** GET animal by id. Will 404 if id not found */
  getAnimal(id: number): Observable<Animal> {
    const url = `${this.animalsUrl}/${id}`;
    return this.http.get<Animal>(url).pipe(
      tap(_ => this.log(`fetched animal id=${id}`)),
      catchError(this.handleError<Animal>(`getAnimal id=${id}`))
    );
  }

  /* GET animals whose name contains search term */
  searchAnimals(term: string): Observable<Animal[]> {
    if (!term.trim()) {
      // if not search term, return empty animal array.
      return of([]);
    }
    return this.http.get<Animal[]>(`${this.animalsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found animals matching "${term}"`)),
      catchError(this.handleError<Animal[]>('searchAnimals', []))
    );
  }

  /** POST: add a new animal to the server */
  addAnimal (animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.animalsUrl, animal, httpOptions).pipe(
      tap((animal: Animal) => this.log(`added animal id=${animal.id}`)),
      catchError(this.handleError<Animal>('addAnimal'))
    );
  }

  /** DELETE: delete the animal from the server */
  deleteAnimal (animal: Animal | number): Observable<Animal> {
    const id = typeof animal === 'number' ? animal : animal.id;
    const url = `${this.animalsUrl}/${id}`;

    return this.http.delete<Animal>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted animal id=${id}`)),
      catchError(this.handleError<Animal>('deleteAnimal'))
    );
  }

  /** PUT: update the animal on the server */
  updateAnimal (animal: Animal): Observable<any> {
    return this.http.put(this.animalsUrl, animal, httpOptions).pipe(
      tap(_ => this.log(`updated animal id=${animal.id}`)),
      catchError(this.handleError<any>('updateAnimal'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log an AnimalService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AnimalService: ${message}`);
  }
}
