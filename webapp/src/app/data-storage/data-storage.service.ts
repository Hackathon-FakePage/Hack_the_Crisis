import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as GetAlertIndicesDTO from '../common/dtos/get-alert-indices.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface ReliableInfo {
  isReviewed: string;
  isEmotional: string;
  isExpert: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  textToAnalyze = new Subject<string>();
  reliableInfo = new Subject<ReliableInfo>();
  indicesToHighlight = new Subject<GetAlertIndicesDTO.Root>();
  wordsToHighlight = new Subject<string[]>();
  numberOfInformalWordsAndPhrases = new Subject<number>();
  overallNumberOfWords = new Subject<number>();
  wasReliableDataSubmitted = new Subject<boolean>();
  errorMessage = new Subject<string>();
  formalityScore = new Subject<number>();

  constructor(private readonly httpClient: HttpClient) {}

  saveText(text: string | undefined): void {
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

  saveReliableInfo(info: ReliableInfo): void {
    this.reliableInfo.next(info);
  }

  setReliableDataSubmitted(submitted: boolean): void {
    this.wasReliableDataSubmitted.next(submitted);
  }

  setFormalityScore(score: number): void {
    this.formalityScore.next(score);
  }

  fetchIndices(text: string): Observable<GetAlertIndicesDTO.Raw> {
    return this.httpClient.post<GetAlertIndicesDTO.Raw>(
      environment.apiUrl,
      { input: text },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  saveIndices(indices: GetAlertIndicesDTO.Root): void {
    this.indicesToHighlight.next(indices);
  }

  updateErrorMessage(errorMessage: string): void {
    this.errorMessage.next(errorMessage);
  }
}
