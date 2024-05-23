import {Component, OnInit} from "@angular/core";
import {UserService} from "../service/user.service";
import {Datasource} from "../datasources/datasource";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  public items: any[] = [];
  public filteredItems: any[] = [];
  public pagedItems: any[] = [];
  public searchTermFirstName = '';
  public searchTermLastName = '';
  public searchTermEmail = '';
  public searchTermRole = '';
  public dataSource: Datasource<UserService>;

  public pageSize: number = 5;
  public currentPage: number = 1;
  public maxPages: number = 0;

  constructor(private userService: UserService) {
    this.dataSource = new Datasource<UserService>(userService);
  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.items = data;
      this.filteredItems = this.items;
      this.updateMaxPages(); // Update maxPages after loading items
      this.paginate();
    });
  }

  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.firstName.toLowerCase().includes(this.searchTermFirstName.toLowerCase()) &&
      item.lastName.toLowerCase().includes(this.searchTermLastName.toLowerCase()) &&
      item.email.toLowerCase().includes(this.searchTermEmail.toLowerCase()) &&
      item.role.name.toLowerCase().includes(this.searchTermRole.toLowerCase())
    );
    this.updateMaxPages(); // Update maxPages after filtering items
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedItems = this.filteredItems.slice(start, end);
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.maxPages) {
      return;
    }
    this.currentPage = newPage;
    this.paginate();
  }

  updateMaxPages() {
    this.maxPages = Math.ceil(this.filteredItems.length / this.pageSize);
  }
}
