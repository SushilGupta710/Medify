import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { MedicinesModel } from '../models/medicines-model.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartServiceService) { }

  cartData: MedicinesModel[];
  productQuantity: number;
  quantityTotal: number;
  subTotal: number = 0;

  ngOnInit() {
    if (this.cartService.getCartItemsync() && this.cartService.getCartItemsync().length > 0) {
      this.cartData = this.cartService.getCartItemsync();
      this.getSubTotal();
    }
  }

  getSubTotal() {
    let oldprice = 0;
    this.cartData.forEach((obj) => {
      oldprice = oldprice + obj.price;
    })

    this.subTotal = oldprice
  }


  getTotal(subTotal) {
    return this.cartService.currencyFormat(subTotal + 20)
  }

  removeFromCart(index) {
    this.cartData.splice(index, 1);

    const tr = document.querySelector(`#product${index}`);
    tr.remove();
    this.getSubTotal();

  }

}
