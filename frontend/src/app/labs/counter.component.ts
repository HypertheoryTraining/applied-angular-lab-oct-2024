import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
    @if(count() > 0){
      <button  (click)="decrement()">-</button>
    }
      <h2>Count: {{ count() }}</h2>
      @if(count() % 15 === 0 && count() !==0){
        <p>FizzBuzz</p>
      }
      @else if (count() % 5 === 0 && count() !==0) {
        <p>Buzz</p>
      }
      @else if (count() % 3 === 0 && count() !==0){
        <p>Fizz</p>
      }
      <button (click)="increment()">+</button>
    </div>
`,
styles: ``,
})
export class CounterComponent {
  count = signal(0);

  increment(){
    this.count.update(value => value + 1);
  }

  decrement(){
    this.count.update(value => value - 1);
  }
}
