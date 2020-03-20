import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertsAnalyzerService } from './alerts-analyzer.service';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Subscription } from 'rxjs';
import * as GetAlertIndices from '../common/dtos/get-alert-indices.dto';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  faCircle = faCircle;
  alerts: Alert[] = [];
  indices: GetAlertIndices.Root;
  numberOfAlerts: number | undefined;
  textToAnalyze$: Subscription;
  alertIndices$: Subscription;
  constructor(private readonly alertsAnalyzerService: AlertsAnalyzerService,
              private readonly dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.alertIndices$ = this.dataStorageService.indicesToHighlight.subscribe(data => {
      this.indices = data;
    });
    this.textToAnalyze$ = this.dataStorageService.textToAnalyze.subscribe((data: string) => {
      this.populateAlerts(data);
    });
  }

  populateAlerts(textToAnalyze: string): void {
    this.alerts = this.alertsAnalyzerService.getAlerts(textToAnalyze, this.indices);
    this.numberOfAlerts = this.alerts.length;
  }
}

export interface Alert {
  alertWord: string;
  correction: string;
}
