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
  indicesToHighlight = new Subject<GetAlertIndicesDTO.Root>();
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

