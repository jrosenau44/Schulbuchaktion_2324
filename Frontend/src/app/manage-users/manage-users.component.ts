import { Component, OnInit } from '@angular/core';
import { Datasource } from '../datasources/datasource';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  public items: any[] = []; // Define the items array
  public dataSource: Datasource<UserService>;
  public pagedItems: any[] = []; // This will hold the items for the current page
  public pageSize: number = 5; // Number of items per page
  public currentPage: number = 1; // Current page number
  public maxPages: number; // Total number of pages


  constructor(private userService: UserService) {
    this.dataSource = new Datasource<UserService>(userService);
    this.maxPages = 0; // Initialize maxPages

  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.items = data; // Assuming the load() method returns a Promise
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
