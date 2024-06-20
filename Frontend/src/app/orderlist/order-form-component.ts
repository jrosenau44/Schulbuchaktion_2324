import {Component, OnInit} from '@angular/core';
import { OrderlistService } from '../service/orderlist.service';
import { Book } from '../model/book';
import { SchoolClass } from "../model/schoolclass";

export interface BookOrder {
  id: number | undefined;
  price: number | undefined; // changed from number | null to number | undefined
  count: number | undefined;
  ebook: boolean | undefined;
  ebookPlus: boolean | undefined;
  schoolClass: SchoolClass | undefined;
  book: Book | undefined;
  teacherCopy: boolean | undefined;
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  classes = []; // TODO: Fetch the list of classes from the backend
  books = []; // TODO: Fetch the list of books from the backend
  order: BookOrder = {
    id: undefined,
    price: undefined,
    count: undefined,
    ebook: undefined,
    ebookPlus: undefined,
    schoolClass: undefined,
    book: undefined,
    teacherCopy: undefined
  };

  constructor(private orderlistService: OrderlistService) { }

  onSubmit() {
    this.orderlistService.addOrder(this.order).subscribe(
      response => {
        console.log('Order added successfully');
      },
      error => {
        console.error('Error adding order:', error);
      }
    );
  }
}
