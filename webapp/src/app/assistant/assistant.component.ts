import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService, ReliableInfo } from '../data-storage/data-storage.service';
import { Subscription } from 'rxjs';
import { faCheckCircle, faCross, faQuestionCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
  reliableInfo$: Subscription;
  formalIcon;
  overallFormalCheck: string | undefined;
  reliableSum = 0;
  reliabilityStatus = '';
  reliabilityIcon;
  reliablePercentage = 0;

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
    this.reliableInfo$ = this.dataStorageService.reliableInfo.subscribe(data => {
      this.calculateReliabilityStatus(data);
    });
    this.setOverallStatuses();
  }

  ngOnDestroy(): void {
    this.numberOfFlagWords$.unsubscribe();
    this.overallNumberOfWords$.unsubscribe();
  }

  private recalculatePercentageOfInformalWords(): void {
    if (this.numberOfFlagWords !== undefined && this.overallNumberOfWords !== undefined) {
      this.flagWordsPercentage = this.numberOfFlagWords / this.overallNumberOfWords * 100;
    }
  }

  private setOverallStatuses(): void {
    this.overallFormalCheck = 'Mostly formal';
    this.formalIcon = faCheckCircle;
  }

  private calculateReliabilityStatus(reliableInfo: ReliableInfo): void {
    this.reliableSum = parseInt(reliableInfo.isEmotional, 10) + parseInt(reliableInfo.isExpert, 10) + parseInt(reliableInfo.isReviewed, 10);
    this.reliablePercentage = this.reliableSum / 6 * 100;
    if (this.reliableSum < 3) {
      this.reliabilityStatus = 'Not reliable source';
      this.reliabilityIcon = faTimesCircle;
    } else if (this.reliableSum >= 3 && this.reliableSum <= 4) {
      this.reliabilityStatus = 'Moderately reliable source';
      this.reliabilityIcon = faQuestionCircle;
    } else {
      this.reliabilityStatus = 'Reliable source';
      this.reliabilityIcon = faCheckCircle;
    }
  }
}
