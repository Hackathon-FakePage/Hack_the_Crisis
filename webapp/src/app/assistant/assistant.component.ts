import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss']
})
export class AssistantComponent implements OnInit, OnDestroy {
  overallNumberOfWords: number | undefined;
  numberOfFlagWords: number | undefined;
  flagWordsPercentage: number | undefined;
  overallNumberOfWords$: Subscription;
  numberOfFlagWords$: Subscription;

  constructor(private readonly dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.numberOfFlagWords$ = this.dataStorageService.numberOfInformalWordsAndPhrases.subscribe(data => {
      this.numberOfFlagWords = data;
      this.recalculatePercentageOfInformalWords();
    });
    this.overallNumberOfWords$ = this.dataStorageService.overallNumberOfWords.subscribe(data => {
      this.overallNumberOfWords = data;
      this.recalculatePercentageOfInformalWords();
    });
  }

  ngOnDestroy(): void {
    this.numberOfFlagWords$.unsubscribe();
    this.overallNumberOfWords$.unsubscribe();
  }

  private recalculatePercentageOfInformalWords(): void {
    if (this.numberOfFlagWords !== undefined && this.overallNumberOfWords !== undefined) {
      this.flagWordsPercentage = this.numberOfFlagWords / this.overallNumberOfWords * 100;
    }
    console.log(this.flagWordsPercentage);
  }
}
