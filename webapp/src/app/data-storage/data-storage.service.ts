import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  textToAnalyze = new Subject<string>();
  wordsToHighlight = new BehaviorSubject<string[]>(['lorem']);
  constructor() { }

  saveText(text: string): void {
    this.textToAnalyze.next(text);
  }
}

