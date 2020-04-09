import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DataStorageService,
  ReliableInfo,
} from '../data-storage/data-storage.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  FormalityData,
  GenericStatus,
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
  reliableInfo$: Observable<ReliableInfo>;
  reliableStatus: GenericStatus;
  formalStatus: GenericStatus;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly calculator: StatusCalculatorService
  ) {}

  ngOnInit(): void {
    this.numberOfFlagWords$ = this.dataStorageService.numberOfInformalWordsAndPhrases;
    this.reliableInfo$ = this.dataStorageService.reliableInfo;
    this.overallNumberOfWords$ = this.dataStorageService.overallNumberOfWords;
    combineLatest([
      this.numberOfFlagWords$,
      this.overallNumberOfWords$,
      this.reliableInfo$,
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([flagWords, overallNumber, reliableInfo]) => {
        this.formalityData = new FormalityData(flagWords, overallNumber);
        this.reliableData = new ReliableData(reliableInfo);
        this.formalStatus = this.calculator.calculateFormalStatus(
          this.formalityData
        );
        this.reliableStatus = this.calculator.calculateReliabilityStatus(
          reliableInfo
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
