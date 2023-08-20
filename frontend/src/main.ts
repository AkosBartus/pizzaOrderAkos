/* import { json } from "stream/consumers"; */
import "./style.css";
/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Counter for Input Pizza amount 
    Previous Next button and Carousel 
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

interface CarouselItem {
  imgSrc: string;
  quantity: number;
}

class Carousel {
  private items: CarouselItem[];
  private currentIndex: number = 0;
  private container: HTMLElement;
  private prevButton: HTMLButtonElement;
  private nextButton: HTMLButtonElement;
  
  constructor(items: CarouselItem[]) {
    this.items = items;
    this.container = document.querySelector('.carousel-inner')!;
    this.prevButton = document.querySelector('.prev-button')!;
    this.nextButton = document.querySelector('.next-button')!;
    
    this.prevButton.addEventListener('click', this.prevSlide.bind(this));
    this.nextButton.addEventListener('click', this.nextSlide.bind(this));
    
    this.render();
  }
  
  private render() {
    this.container.innerHTML = '';
    
    for (let i = this.currentIndex; i < this.currentIndex + 3; i++) {
      const index = i % this.items.length;
      const item = this.items[index];
      
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item', 'flex', 'flex-wrap', 'items-center', 'justify-center');
      
      const img = document.createElement('img');
      img.src = item.imgSrc;
      img.classList.add('h-96', 'w-96');
      
      const customNum = document.createElement('div');
      customNum.classList.add('customNum', 'm-4', 'flex', 'h-24', 'w-12', 'flex-col', 'items-center', 'justify-between', 'rounded-3xl', 'border-2', 'border-solid', 'border-yellow-600', 'bg-yellow-600', 'text-white', 'transition-opacity');
      
      const arrUp = document.createElement('div');
      arrUp.classList.add('arrUp', 'flex', 'h-3', 'w-3', 'cursor-pointer', 'text-white');
      arrUp.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/></svg>';
      arrUp.addEventListener('click', () => {
        item.quantity++;
        this.render();
      });
      
      const arrDown = document.createElement('div');
      arrDown.classList.add('arrDown', 'h-3', 'w-3', 'cursor-pointer', 'text-white');
      arrDown.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"/></svg>';
      arrDown.addEventListener('click', () => {
        if (item.quantity > 0) {
          item.quantity--;
          this.render();
        }
      });
      
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.max = '20';
      quantityInput.min = '0';
      quantityInput.value = item.quantity.toString();
      quantityInput.classList.add('pizza-amount-input', 'bg-transparent', 'text-center', 'text-2xl', '[appearance:textfield]', 'focus:border-transparent', 'focus:outline-none', 'focus:ring-0', '[&::-webkit-inner-spin-button]:appearance-none', '[&::-webkit-outer-spin-button]:appearance-none');
      
      customNum.appendChild(arrUp);
      customNum.appendChild(quantityInput);
      customNum.appendChild(arrDown);
      
      carouselItem.appendChild(img);
      carouselItem.appendChild(customNum);
      
      this.container.appendChild(carouselItem);
    }
  }
  
  private prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.render();
  }
  
  private nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.render();
  }
}
// Felépítjük a Carousel példányt a megadott képekkel és mennyiségekkel
const items: CarouselItem[] = [
  { imgSrc: 'public/pizza1.png', quantity: 0 },
  { imgSrc: 'public/pizza2.png', quantity: 0 },
  { imgSrc: 'public/pizza3.png', quantity: 0 },
  { imgSrc: 'public/pizza4.png', quantity: 0 },
  { imgSrc: 'public/pizza5.png', quantity: 0 },
  { imgSrc: 'public/pizza6.png', quantity: 0 },
  { imgSrc: 'public/pizza7.png', quantity: 0 },
];

const carousel = new Carousel(items);

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Your order section
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
type orderType = {
  pizzas: {
    [key: string]: number;
  };
  name: string;
  email: string;
  phoneNumber: string;
  houseNumber: string;
  city: string;
  zipCode: string;
  street: string;
  [key: string]: any;
};

const orderDetails: orderType = {
  pizzas: {
    "Margarita": 0,
    "Pepperoni": 0,
    "Hawaiian": 0,
    "Veggie": 0,
    "Supreme": 0,
    "Chicken": 0,
    "MeatLover's": 0,
  },
  name: "",
  email: "",
  phoneNumber: "",
  houseNumber: "",
  city: "",
  zipCode: "",
  street: "",
};

document.addEventListener("DOMContentLoaded", () => {
  const toYourOrderButton = document.getElementById("to-summary") as HTMLButtonElement
  const yourOrderDiv = document.getElementById("your-order") as HTMLDivElement

  if (toYourOrderButton && yourOrderDiv) {
    toYourOrderButton.addEventListener("click", () => {
      yourOrderDiv.innerHTML = "";

      const pizzaInputs = document.querySelectorAll(".pizza-amount-input") as NodeListOf<HTMLInputElement>
      pizzaInputs.forEach((input) => {
        const pizzaName = input.id;
        const pizzaAmount = +input.value

        if (pizzaAmount > 0) {
          orderDetails.pizzas[pizzaName] = pizzaAmount;

          const pizzaItem = document.createElement("div");
          pizzaItem.classList.add("pizza-item");
          pizzaItem.textContent = `${pizzaName}: ${pizzaAmount}`;

          yourOrderDiv.appendChild(pizzaItem);
        }
      });
    });
  }
});










