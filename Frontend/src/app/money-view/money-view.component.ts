import {Component, OnInit} from '@angular/core';
import {Datasource} from '../datasources/datasource';
import {MoneylistService} from '../service/moneylist.service';

@Component({
  selector: 'app-money-view',
  templateUrl: './money-view.component.html',
  styleUrls: ['./money-view.component.css']
})

export class MoneyViewComponent implements OnInit {
  public originalItems: any[] = [];
  public items: any[] = [];
  public pagedItems: any[] = [];
  public searchTermYear: string = '';
  public searchTermPriceInclusiveEbook: string = '';
  public searchTermPriceEbook: string = '';
  public searchTermPriceEbookPlus: string = '';
  public searchTermTitle: string = '';
  public dataSource: Datasource<MoneylistService>;

  public pageSize: number = 10;
  public currentPage: number = 1;

  constructor(private moneylistService: MoneylistService) {
    this.dataSource = new Datasource<MoneylistService>(moneylistService);
  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.originalItems = data;
      this.items = [...this.originalItems];
      this.paginate();
      this.filterItems();
    });
  }

  paginate() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedItems = this.items.slice(start, end);
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.paginate();
  }

  filterItems() {
    this.items = this.originalItems.filter(item =>
      (this.searchTermYear === '' || item.year.toString().includes(this.searchTermYear)) &&
      (this.searchTermPriceInclusiveEbook === '' || item.priceInclusiveEbook.toString().includes(this.searchTermPriceInclusiveEbook)) &&
      (this.searchTermPriceEbook === '' || item.priceEbook.toString().includes(this.searchTermPriceEbook)) &&
      (this.searchTermPriceEbookPlus === '' || (item.priceEbookPlus ? item.priceEbookPlus.toString().includes(this.searchTermPriceEbookPlus) : false)) &&
      (this.searchTermTitle === '' || item.book.shortTitle.toLowerCase().includes(this.searchTermTitle.toLowerCase()))
    );
    this.paginate();
  }
  deleteItem(item: any) {
    this.moneylistService.delete(item).subscribe();
      this.paginate();

  }


}
