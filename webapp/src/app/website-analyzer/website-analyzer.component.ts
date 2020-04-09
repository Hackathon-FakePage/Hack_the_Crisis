import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import {
  combineLatest,
  Observable,
  Subject,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-website-analyzer',
  templateUrl: './website-analyzer.component.html',
  styleUrls: ['./website-analyzer.component.scss'],
})
export class WebsiteAnalyzerComponent implements OnInit, OnDestroy {
  textToAnalyze: string | undefined;
  wordsToHighlight: string[] = [];
  wordsToHighlight$: Observable<string[]>;
  unsubscribe$: Subject<void> = new Subject<void>();
  textToAnalyze$: Observable<string>;

  constructor(private readonly dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.wordsToHighlight$ = this.dataStorageService.wordsToHighlight;
    this.textToAnalyze$ = this.dataStorageService.textToAnalyze;
    combineLatest([this.wordsToHighlight$, this.textToAnalyze$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([words, text]) => {
        this.textToAnalyze = text;
        this.wordsToHighlight = words;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
