import { Component, OnInit } from '@angular/core';
import { Animal } from '../animal';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals: Animal[];

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals(): void {
    this.animalService.getAnimals()
    .subscribe(animals => 
      this.animals = animals
    );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.animalService.addAnimal({ name } as Animal)
    .subscribe(animal => {
      this.animals.push(animal);
    });
  }

  delete(animal: Animal): void {
    this.animals = this.animals.filter(h => h !== animal);
    this.animalService.deleteAnimal(animal).subscribe();
  }
}
