import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertsAnalyzerService } from './alerts-analyzer.service';
import { DataStorageService } from '../data-storage/data-storage.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import * as GetAlertIndices from '../common/dtos/get-alert-indices.dto';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  faCircle = faCircle;
  alerts: Alert[] = [];
  numberOfAlerts: number | undefined;
  textToAnalyze$: Observable<string>;
  alertIndices$: Observable<GetAlertIndices.Root>;
  alertText: string | undefined;

  constructor(private readonly alertsAnalyzerService: AlertsAnalyzerService,
              private readonly dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.alertIndices$ = this.dataStorageService.indicesToHighlight;
    this.textToAnalyze$ = this.dataStorageService.textToAnalyze;
    forkJoin([this.alertIndices$, this.textToAnalyze$]).subscribe(([indices, text]) => {
      this.alertText = text;
      this.populateAlerts(text, indices);
    });
  }

  populateAlerts(textToAnalyze: string, indices: GetAlertIndices.Root): void {
    this.alerts = this.alertsAnalyzerService.getAlerts(textToAnalyze, indices);
    this.numberOfAlerts = this.alerts.length;
    this.alertText = this.numberOfAlerts !== 1 ? 'Alerts found' : 'Alert found';
  }
}

export interface Alert {
  alertWord: string;
  correction: string;
}
