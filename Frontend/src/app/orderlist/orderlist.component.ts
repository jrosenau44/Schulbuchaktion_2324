
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
      this.items = data;
      this.filteredItems = this.items; // Initially, all items are displayed
    });
  }filterItems() {
    this.filteredItems = this.items.filter(item => {
      if (item.schoolClass) { // Check if schoolClass is not null
        console.log(item.schoolClass.name);
        return item.book.subject.name.toLowerCase().includes(this.searchTermSubject.toLowerCase()) &&
          item.book.shortTitle.toLowerCase().includes(this.searchTermTitle.toLowerCase()) &&
          (this.searchTermEbook.toLowerCase() === 'yes' ? item.ebook : this.searchTermEbook.toLowerCase() === 'no' ? !item.ebook : true) &&
          (this.searchTermEbookPlus.toLowerCase() === 'yes' ? item.ebookPlus : this.searchTermEbookPlus.toLowerCase() === 'no' ? !item.ebookPlus : true) &&
          (this.searchTermTeacherCopy.toLowerCase() === 'yes' ? item.teacherCopy : this.searchTermTeacherCopy.toLowerCase() === 'no' ? !item.teacherCopy : true) &&
          item.schoolClass.name.toLowerCase().includes(this.searchTermClass.toLowerCase()) &&
          item.count.toString().includes(this.searchTermCount)
          ;
      }
      return false; // If schoolClass is null, exclude the item from the filtered list
    });
  }



}
