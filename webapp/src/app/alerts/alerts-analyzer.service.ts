import { Injectable } from '@angular/core';
import { Alert } from './alerts.component';
import * as GetAlertIndicesDTO from '../common/dtos/get-alert-indices.dto';
import { DataStorageService } from '../data-storage/data-storage.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AlertsAnalyzerService {
  dummyCorrection = 'Word is informal';

  constructor(private readonly dataStorageService: DataStorageService) {
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
    return alerts;
  }

  private getHighlightedWords(text: string, indices: GetAlertIndicesDTO.Root): string[] {
    // const indicesDeep: [number[]] = [];
    const output: string[] = [];
    const indicesGrouped: number[][] = this.getGroupedIndices(indices.indices);
    for (const indexGroup of indicesGrouped) {
      let flagWord = '';
      indexGroup.forEach(charIndex => {
        flagWord += text.charAt(charIndex);
      });
      output.push(flagWord);
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
}
