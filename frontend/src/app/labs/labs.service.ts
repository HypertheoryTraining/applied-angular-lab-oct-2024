import { Injectable, signal } from '@angular/core';

Injectable({ providedIn: 'root' });
export class LabsService {
  private counterValue = signal(1);

  setCounterValue(val: number) {
    if ([1, 3, 5].includes(val)) {
      this.counterValue.set(val);

      localStorage.setItem('counter', val.toString());
    }
  }

  public get getCounterValue(): number {
    const storedValue = Number(localStorage.getItem('counter')) || null;
    return storedValue ?? this.counterValue();
  }
}
