import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DataStorageService,
  ReliableInfo,
} from '../data-storage/data-storage.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  FormalityData,
  GenericStatus, OverallStatus,
  ReliableData,
  StatusCalculatorService,
} from './status-calculator/status-calculator.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit, OnDestroy {
  formalityData: FormalityData | undefined;
  reliableData: ReliableData | undefined;
  overallNumberOfWords$: Observable<number>;
  numberOfFlagWords$: Observable<number>;
  formalityScore$: Observable<number>;
  reliableInfo$: Observable<ReliableInfo>;
  reliableStatus: GenericStatus;
  formalStatus: GenericStatus;
  overallStatus: OverallStatus;
  unsubscribe$: Subject<void> = new Subject<void>();
  isRatingLocked = true;

  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly calculator: StatusCalculatorService
  ) {}

  ngOnInit(): void {
    this.numberOfFlagWords$ = this.dataStorageService.numberOfInformalWordsAndPhrases;
    this.overallNumberOfWords$ = this.dataStorageService.overallNumberOfWords;
    this.formalityScore$ = this.dataStorageService.formalityScore;
    combineLatest([
      this.numberOfFlagWords$,
      this.overallNumberOfWords$,
      this.formalityScore$
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([flagWords, overallNumber, formalityScore]) => {
        console.log('formality score: ');
        console.log(formalityScore);
        this.formalityData = new FormalityData(formalityScore, flagWords, overallNumber);
        // this.reliableData = new ReliableData(reliableInfo);
        this.formalStatus = this.calculator.calculateFormalStatus(
          this.formalityData
        );
        // this.reliableStatus = this.calculator.calculateReliabilityStatus(
        //   reliableInfo
        // );
        // const reliableData = reliableInfo ? new ReliableData(reliableInfo) : undefined;
        // this.overallStatus = this.calculator.calculateOverallStatus(this.formalityData, reliableData);
        this.overallStatus = this.calculator.calculateOverallStatus(this.formalityData, undefined);
      });
  }

  get overallRating(): number {
    return this.overallStatus.ratingPercentage / 100 * 5;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
