import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import {
  combineLatest,
  Observable,
  Subject,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as GetAlertIndicesDTO from '../common/dtos/get-alert-indices.dto';

@Component({
  selector: 'app-website-analyzer',
  templateUrl: './website-analyzer.component.html',
  styleUrls: ['./website-analyzer.component.scss'],
})
export class WebsiteAnalyzerComponent implements OnInit, OnDestroy {
  textToAnalyze: string | undefined;
  indices: number[] | undefined;
  indices$: Observable<GetAlertIndicesDTO.Root>;
  unsubscribe$: Subject<void> = new Subject<void>();
  textToAnalyze$: Observable<string>;

  constructor(private readonly dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.indices$ = this.dataStorageService.indicesToHighlight;
    this.textToAnalyze$ = this.dataStorageService.textToAnalyze;
    combineLatest([this.indices$, this.textToAnalyze$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([root, text]) => {
        this.textToAnalyze = text;
        this.indices = root.indices;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
