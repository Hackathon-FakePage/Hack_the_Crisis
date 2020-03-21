import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import * as GetAlertIndicesDTO from '../common/dtos/get-alert-indices.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take, tap } from 'rxjs/operators';

export interface ReliableInfo {
  isReviewed: string;
  isEmotional: string;
  isExpert: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  textToAnalyze = new Subject<string>();
  reliableInfo = new Subject<ReliableInfo>();
  indicesToHighlight = new Subject<GetAlertIndicesDTO.Root>();
  wordsToHighlight = new Subject<string[]>();
  numberOfInformalWordsAndPhrases = new Subject<number>();
  overallNumberOfWords = new Subject<number>();
  wasReliableDataSubmitted = new Subject<boolean>();

  constructor(private readonly httpClient: HttpClient) {
  }

  saveText(text: string): void {
    this.textToAnalyze.next(text);
    this.fetchIndices(text);
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

  saveReliableInfo(info: ReliableInfo): void {
    this.reliableInfo.next(info);
  }

  setReliableDataSubmitted(submitted: boolean): void {
    this.wasReliableDataSubmitted.next(submitted);
  }

  private fetchIndices(text: string): void {
    this.httpClient.post<GetAlertIndicesDTO.Root>(environment.apiUrl, {input: text}).subscribe(data => {
      this.indicesToHighlight.next(data);
    });
  }
}

