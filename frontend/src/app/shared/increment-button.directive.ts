import { Directive, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'button[appIncrementButton]',
})
export class IncrementButtonDirective {
  constructor(el: ElementRef<HTMLButtonElement>) {
    el.nativeElement.classList.add(
      'btn',
      'btn-sm',
      'btn-circle',
      'btn-primary'
    );
  }
}

@Directive({
  standalone: true,
  selector: 'button[appDecrementButton]',
})
export class DecrementButtonDirective {
  constructor(el: ElementRef<HTMLButtonElement>) {
    el.nativeElement.classList.add(
      'btn',
      'btn-sm',
      'btn-circle',
      'btn-warning'
    );
  }
}

@Directive({
  standalone: true,
  selector: 'button[appPreferenceButton]',
})
export class PreferenceButtonDirective {
  constructor(el: ElementRef<HTMLButtonElement>) {
    el.nativeElement.classList.add(
      'btn',
      'btn-sm',
      'btn-circle',
      'btn-warning'
    );
  }
}
