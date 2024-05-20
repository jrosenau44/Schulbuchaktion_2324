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
  public searchTermFirstName = '';
  public searchTermLastName = '';
  public searchTermEmail = '';
  public searchTermRole = '';
  public dataSource: Datasource<UserService>;

  constructor(private userService: UserService) {
    this.dataSource = new Datasource<UserService>(userService);
  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.items = data;
      this.filteredItems = this.items;
    });
  }

  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.firstName.toLowerCase().includes(this.searchTermFirstName.toLowerCase()) &&
      item.lastName.toLowerCase().includes(this.searchTermLastName.toLowerCase()) &&
      item.email.toLowerCase().includes(this.searchTermEmail.toLowerCase()) &&
      item.role.name.toLowerCase().includes(this.searchTermRole.toLowerCase())
    );
  }

}
