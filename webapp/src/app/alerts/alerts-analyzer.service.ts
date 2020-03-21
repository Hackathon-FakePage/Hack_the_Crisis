import { Injectable } from '@angular/core';
import { Alert } from './alerts.component';
import * as GetAlertIndicesDTO from '../common/dtos/get-alert-indices.dto';
import { DataStorageService } from '../data-storage/data-storage.service';
import * as _ from 'lodash';
import { WordCounterCalculatorService } from '../common/word-counter-calculator.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsAnalyzerService {
  dummyCorrection = 'Word/phrase is informal';

  constructor(private readonly dataStorageService: DataStorageService,
              private readonly wordCounterCalculatorService: WordCounterCalculatorService) {
  }

  getAlerts(text: string, indices: GetAlertIndicesDTO.Root): Alert[] {
    const alerts: Alert[] = [];
    const words: string[] = [];
    const highlightedWords = this.getHighlightedWords(text, indices);
    highlightedWords.forEach(word => {
      alerts.push({
        alertWord: word,
        correction: this.dummyCorrection
      });
      words.push(word);
    });
    this.dataStorageService.saveHighlightedWords(words);
    this.saveInformalWordsData(text, words);
    return alerts;
  }

  private getHighlightedWords(text: string, indices: GetAlertIndicesDTO.Root): string[] {
    const output: string[] = [];
    const indicesGrouped: number[][] = this.getGroupedIndices(indices.indices);
    for (const indexGroup of indicesGrouped) {
      let flagWord = '';
      indexGroup.forEach(charIndex => {
        flagWord += text.charAt(charIndex);
      });
      output.push(' ' + flagWord + ' ');
    }
    return output;
  }

  private getGroupedIndices(flatIndices: number[]) {
    const indicesGrouped: number[][] = [];
    while (flatIndices.length) {
      const tempArray: number[] = [];
      for (let i = 0; i < flatIndices.length; i++) {
        tempArray.push(flatIndices[i]);
        if (flatIndices[i + 1] !== flatIndices[i] + 1) {
          break;
        }
      }
      flatIndices = _.xor(flatIndices, tempArray);
      indicesGrouped.push(tempArray);
    }
    return indicesGrouped;
  }

  private saveInformalWordsData(text: string, flagWords: string[]): void {
    const overallNumberOfWords = this.wordCounterCalculatorService.getNumberOfWords(text);
    this.dataStorageService.saveOverallNumberOfWords(overallNumberOfWords);
    this.dataStorageService.saveNumberOfInformalWordsAndPhrases(flagWords.length);
  }
}
