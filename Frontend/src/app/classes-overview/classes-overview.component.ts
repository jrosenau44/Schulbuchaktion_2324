import { Component, OnInit } from '@angular/core';
import { Datasource } from '../datasources/datasource';
import { SchoolclassService } from '../service/schoolclass.service';

@Component({
  selector: 'app-class-overview',
  templateUrl: './classes-overview.component.html',
  styleUrls: ['./classes-overview.component.css']
})
export class ClassesOverviewComponent implements OnInit {
  public items: any[] = []; // Define the items array
  public filteredItems: any[] = []; // Array to hold the filtered items
  public searchTerm: string = ''; // Search term from the input field
  public dataSource: Datasource<SchoolclassService>;

  constructor(private schoolClassService: SchoolclassService) {
    this.dataSource = new Datasource<SchoolclassService>(schoolClassService);
  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.items = data; // Populate the items array with data from the service
      this.filteredItems = this.items; // Initially, all items are displayed
    });
  }

  filterItems() {
    if (!this.searchTerm) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) // Change this line to search in other properties
      );
    }
  }
}
