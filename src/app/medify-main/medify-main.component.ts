import { Component, HostListener, OnInit } from '@angular/core';
import { MedicinesModel } from '../models/medicines-model.model';
import { CartServiceService } from '../services/cart-service.service';
@Component({
  selector: 'app-medify-main',
  templateUrl: './medify-main.component.html',
  styleUrls: ['./medify-main.component.scss']
})
export class MedifyMainComponent implements OnInit {

  constructor(public cartService: CartServiceService) { }

  @HostListener('document:scroll', ['$event'])
  onWindowScroll(event): void {
    // console.log(event.target)
    this.onScroll();
  }

  arrayImageData = [];
  count: number = 1;
  pageNumber: number = 1;
  loader:boolean = false;
  snackbar:boolean = false;

  ngOnInit() {
    this.getImage()
  }

  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.getImage();
    }
  }

  async getImage() {
    try {
      this.loader = true
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=12_page=${this.pageNumber}`
      );
      const data = await res.json();

      data.forEach(ele => {
        let medcines = new MedicinesModel()
        let serviceCount = this.cartService.getCounterSync()
        medcines.id = serviceCount;
        medcines.name = this.generateRandomName();
        medcines.brand = this.generateRandomBrand();
        medcines.price = Math.floor(Math.random() * 1000);
        medcines.src = `https://picsum.photos/300/300?random=${this.count}`;
        medcines.description = ele.title;
        this.arrayImageData.push(medcines);
        this.count++
        serviceCount++
        this.cartService.setCounter(serviceCount);

      });

      this.pageNumber += 1;
      this.loader = false
    } catch (error) {
      this.loader = false
      console.log('There was an error', error);
    }


  }

  generateRandomBrand() {
    const words = ['Sun Pharmaceutical', 'Cipla Ltd', 'Zydus Lifesciences', 'Alkem Laboratories', 'Lupin Ltd', 'IPCA Laboratories', 'Aurobindo Pharma', 'Biocon Ltd'];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  trimDescription(str) {
    if (str.length > 24) {
      str = str.substr(0, 24) + '...';
    }
    return str;
  }

  backToTopBtn() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  addToCart(medcine: MedicinesModel) {
    this.snackbar = true;
    setTimeout(() => {
      this.snackbar = false
    }, 1000);
    this.cartService.setCartItems(medcine);
  }


  generateRandomName() {
    const firstName = "abcdefghijklmnopqrstuvwxyz";

    let randomFirstName = "";

    for (let i = 0; i < 8; i++) {
      const index = Math.floor(Math.random() * firstName.length);
      randomFirstName += firstName[index];
    }

    return randomFirstName
  }
}
