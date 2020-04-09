import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordCounterCalculatorService {
  getNumberOfWords(text: string): number {
    return text.split(' ').length;
  }
}
