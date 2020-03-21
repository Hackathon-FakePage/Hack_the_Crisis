import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import * as GetAlertIndicesDTO from '../common/dtos/get-alert-indices.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  textToAnalyze = new Subject<string>();
  indicesToHighlight = new BehaviorSubject<GetAlertIndicesDTO.Root>({indices: [8112, 8113, 8114, 8115, 8116, 8117, 3021, 3022, 3023, 3024, 3025, 3026, 3027, 1387, 1388, 1389, 62, 63, 64, 65, 6850, 6851, 6852, 6853, 6854, 4743, 4744, 4745, 4746, 1600, 1601, 1602, 101, 102, 174, 175, 3958, 3959, 3960, 3961, 3962, 3963, 3964, 3982, 3983, 3984, 3985, 3986, 3987, 3988, 1861, 1862, 1863, 1864, 1865, 1866, 381, 382, 383, 7822, 7823, 7824, 7825, 7826]});
  wordsToHighlight = new Subject<string[]>();
  numberOfInformalWordsAndPhrases = new Subject<number>();
  overallNumberOfWords = new Subject<number>();
  constructor(private readonly httpClient: HttpClient) { }

  saveText(text: string): void {
    this.textToAnalyze.next(text);
  }

  saveNumberOfInformalWordsAndPhrases(numberToSave: number) {
    this.numberOfInformalWordsAndPhrases.next(numberToSave);
  }

  saveOverallNumberOfWords(numberToSave: number) {
    this.overallNumberOfWords.next(numberToSave);
  }

  saveHighlightedWords(words: string[]): void {
    this.wordsToHighlight.next(words);
  }

  fetchIndices(): Subscription {
    return this.httpClient.get<GetAlertIndicesDTO.Root>(environment.apiUrl).pipe(tap(data => {
      this.indicesToHighlight.next(data);
    })).subscribe();
  }
}

