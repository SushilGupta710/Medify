import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MedicinesModel } from '../models/medicines-model.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }
  cartItems$ = new BehaviorSubject<any>([]);
  counter$ = new BehaviorSubject<any>(1);


  setCartItems(value) {
    const currentCartItems = this.cartItems$.getValue();
    currentCartItems.push(value);
    this.cartItems$.next(currentCartItems);
  }

  getCartItems() {
    return this.cartItems$.asObservable();
  }

  getCartItemsync() {
    return this.cartItems$.getValue();
  }

  setCounter(value) {
    this.counter$.next(value);
  }

  getCounter() {
    return this.counter$.asObservable();
  }

  getCounterSync() {
    return this.counter$.getValue();
  }


  currencyFormat(price) {
    return Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,

    }).format(price)

  }
}
