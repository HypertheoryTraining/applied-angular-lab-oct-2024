import { Injectable, signal } from '@angular/core';

Injectable({ providedIn: 'root' });
export class LabsService {
  private counterValue = signal(1);

  setCounterValue(val: number) {
    if ([1, 3, 5].includes(val)) {
      this.counterValue.set(val);
    }
  }

  public get getCounterValue(): number {
    return this.counterValue();
  }
}
