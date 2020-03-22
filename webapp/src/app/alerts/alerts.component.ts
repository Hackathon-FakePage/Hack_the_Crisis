import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertsAnalyzerService } from './alerts-analyzer.service';
import { DataStorageService } from '../data-storage/data-storage.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import * as GetAlertIndices from '../common/dtos/get-alert-indices.dto';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {
  faCircle = faCircle;
  alerts: Alert[] = [];
  numberOfAlerts: number | undefined;
  textToAnalyze$: Observable<string>;
  alertIndices$: Observable<GetAlertIndices.Root>;
  alertText: string | undefined;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly alertsAnalyzerService: AlertsAnalyzerService,
              private readonly dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.alertIndices$ = this.dataStorageService.indicesToHighlight;
    this.textToAnalyze$ = this.dataStorageService.textToAnalyze;
    this.alertIndices$.subscribe(data => console.log(data));
    combineLatest([this.alertIndices$, this.textToAnalyze$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([indices, text]) => {
      this.alertText = text;
      this.populateAlerts(text, indices);
    });
  }

  populateAlerts(textToAnalyze: string, indices: GetAlertIndices.Root): void {
    this.alerts = this.alertsAnalyzerService.getAlerts(textToAnalyze, indices);
    this.numberOfAlerts = this.alerts.length;
    this.alertText = this.numberOfAlerts !== 1 ? 'Alerts found' : 'Alert found';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

export interface Alert {
  alertWord: string;
  correction: string;
}
