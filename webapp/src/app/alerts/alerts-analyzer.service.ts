import { Injectable } from '@angular/core';
import { Alert } from './alerts.component';
import * as GetAlertIndicesDTO from '../common/dtos/get-alert-indices.dto';
import { DataStorageService } from '../data-storage/data-storage.service';

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
    let index = 0;
    let word = '';
    let indicesCopy = indices.indices;
    // todo - enhance loop to get more than one word
    while (indicesCopy[index] + 1 === indicesCopy[index + 1]) {
      word += text.charAt(index++);
      indicesCopy = indicesCopy.slice(1, indicesCopy.length - 1);
    }
    return [word];
  }
}
