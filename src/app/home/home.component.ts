import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="filter by city" #filter>
        <button class="primary" type="button" 
        (click)="filterResults(filter.value)">Search</button>
      </form>  
    </section>

    <section class="results">
      <app-housing-location 
      *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
    
        `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  HousingLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: Housinglocation[] = [];
  filterResults(text: string) {
    if(!text) {
      this.filteredLocationList = this.HousingLocationList;
    }
    this.filteredLocationList = this.HousingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: Housinglocation[]) => {
      this.HousingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
}