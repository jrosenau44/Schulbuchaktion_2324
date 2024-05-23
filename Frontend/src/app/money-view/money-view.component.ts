import { Component, OnInit } from '@angular/core';
import { Datasource } from '../datasources/datasource';
import { MoneylistService } from '../service/moneylist.service';

@Component({
  selector: 'app-money-view',
  templateUrl: './money-view.component.html',
  styleUrls: ['./money-view.component.css']
})

export class MoneyViewComponent implements OnInit {
  public items: any[] = []; // Definieren Sie hier den Typ Ihrer Elemente
  public dataSource: Datasource<MoneylistService>;
  public pagedItems: any[] = []; // This will hold the items for the current page
  public pageSize: number = 15; // Number of items per page
  public currentPage: number = 1; // Current page number
  public maxPages: number; // Total number of pages


  constructor(private moneylistService: MoneylistService) {
    this.dataSource = new Datasource<MoneylistService>(moneylistService);
    this.maxPages = 0; // Initialize maxPages

  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.items = data; // Angenommen, die load() Methode gibt ein Promise zurück
      this.maxPages = Math.ceil(this.items.length / this.pageSize); // Calculate maxPages
      this.paginate();
    });
  }

  paginate() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedItems = this.items.slice(start, end);
    console.log('Paged items:', this.pagedItems); // Add this line
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.maxPages) {
      return;
    }
    this.currentPage = newPage;
    this.paginate();
  }

}
