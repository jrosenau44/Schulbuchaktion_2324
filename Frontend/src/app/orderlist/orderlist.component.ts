
import { Component, OnInit } from '@angular/core';
import { Datasource } from '../datasources/datasource';
import { OrderlistService } from '../service/orderlist.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  public items: any[] = []; // Define the items array
  public filteredItems: any[] = []; // Array to hold the filtered items
  public searchTermSubject: string = ''; // Search term from the input field
  public searchTermTitle: string = '';
  public searchTermEbook: string = '';
  public searchTermEbookPlus: string = '';
  public searchTermTeacherCopy: string = '';
  public searchTermClass: string = '';
  public searchTermCount: string = '';
  public dataSource: Datasource<OrderlistService>;

  constructor(private orderlistService: OrderlistService) {
    this.dataSource = new Datasource<OrderlistService>(orderlistService);
  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.items = data.filter((item: any) => item && this.hasNonNullValues(item));
      this.filteredItems = this.items; // Initially, all items are displayed
    });
  }

  filterItems() {
    if (
      this.searchTermSubject === '' &&
      this.searchTermTitle === '' &&
      this.searchTermEbook === '' &&
      this.searchTermEbookPlus === '' &&
      this.searchTermTeacherCopy === '' &&
      this.searchTermClass === '' &&
      this.searchTermCount === ''
    ) {
      // If all search terms are empty, display all items
      this.filteredItems = this.items;
    } else {
      // Otherwise, apply filtering based on search terms
      this.filteredItems = this.items.filter(item =>
        (this.searchTermSubject === '' || item.book.subject.name.toLowerCase().includes(this.searchTermSubject.toLowerCase())) &&
        (this.searchTermTitle === '' || item.book.shortTitle.toLowerCase().includes(this.searchTermTitle.toLowerCase())) &&
        (this.searchTermEbook === '' || item.ebook.toString().toLowerCase() === this.searchTermEbook.toString().toLowerCase()) &&
        (this.searchTermEbookPlus === '' || item.ebookPlus.toString() === this.searchTermEbookPlus) &&
        (this.searchTermTeacherCopy === '' || item.teacherCopy.toString() === this.searchTermTeacherCopy) &&
        (this.searchTermClass === '' || item.schoolClass.name.toLowerCase().includes(this.searchTermClass.toLowerCase())) &&
        (this.searchTermCount === '' || item.count.toString().includes(this.searchTermCount))
      );
    }
  }


  private hasNonNullValues(obj: any): boolean {
    for (let key in obj) {
      if (obj[key] !== null && obj[key] !== '') {
        return true;
      }
      if (typeof obj[key] === 'object' && this.hasNonNullValues(obj[key])) {
        return true;
      }
    }
    return false;
  }
}
