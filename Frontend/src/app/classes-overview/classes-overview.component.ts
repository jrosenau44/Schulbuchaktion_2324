import {Component, OnInit} from '@angular/core';
import {Datasource} from '../datasources/datasource';
import {SchoolclassService} from '../service/schoolclass.service';

@Component({
  selector: 'app-class-overview',
  templateUrl: './classes-overview.component.html',
  styleUrls: ['./classes-overview.component.css']
})
export class ClassesOverviewComponent implements OnInit {
  public items: any[] = [];
  public filteredItems: any[] = [];
  public searchTerm: string = '';
  public searchTermYear: string = '';
  public searchTermName: string = '';
  public searchTermStudentAmount: string = '';
  public searchTermRepetent: string = '';
  public searchTermBudget: string = '';
  public searchTermUsedBudget: string = '';
  public dataSource: Datasource<SchoolclassService>;

  constructor(private schoolClassService: SchoolclassService) {
    this.dataSource = new Datasource<SchoolclassService>(schoolClassService);
  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.items = data;
      this.filteredItems = this.items;
    });
  }
  deleteItem(item: any) {
    this.schoolClassService.delete(item).subscribe();
    // Update the paged items
    this.filterItems();

  }



  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.year.toString().includes(this.searchTermYear) &&
      item.name.toLowerCase().includes(this.searchTermName.toLowerCase()) &&
      item.studentAmount.toString().includes(this.searchTermStudentAmount) &&
      item.repAmount.toString().includes(this.searchTermRepetent) &&
      item.budget.toString().includes(this.searchTermBudget) &&
      item.usedBudget.toString().includes(this.searchTermUsedBudget)
    );
  }
}
