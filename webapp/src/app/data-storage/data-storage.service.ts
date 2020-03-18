import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  textToAnalyze = new Subject<string>();
  constructor() { }

  saveText(text: string): void {
    this.textToAnalyze.next(text);
  }
}

