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

  constructor(private moneylistService: MoneylistService) {
    this.dataSource = new Datasource<MoneylistService>(moneylistService);
  }

  ngOnInit() {
    this.dataSource.load().then(data => {
      this.items = data; // Angenommen, die load() Methode gibt ein Promise zurück
    });
  }
}
