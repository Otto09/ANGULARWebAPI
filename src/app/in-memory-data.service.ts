import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Animal } from './animal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const animals = [
      { id: 1, name: 'Lion' },
      { id: 2, name: 'Monkey' },
      { id: 3, name: 'Ostrich' },
      { id: 4, name: 'Pigeon' },
      { id: 5, name: 'Hedgehog' },
      { id: 6, name: 'Peacock' },
      { id: 7, name: 'Sturgeon' },
      { id: 8, name: 'Woodpecker' },
      { id: 9, name: 'Carp' },
      { id: 10, name: 'Elephant' },
      { id: 11, name: 'Trout' },
      { id: 12, name: 'Beaver' }
    ];
    return {animals};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the animals array is empty,
  // the method below returns the initial number (11).
  // if the animals array is not empty, the method below returns the highest
  // animal id + 1.
  genId(animals: Animal[]): number {
    return animals.length > 0 ? Math.max(...animals.map(animal =>animal.id)) + 1 : 1;
  }
}
