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

  constructor(private userService: UserService) {
    this.dataSource = new Datasource<UserService>(userService);
  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.items = data; // Assuming the load() method returns a Promise
    });
  }
}
