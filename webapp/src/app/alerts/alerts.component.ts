import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  faCircle = faCircle;
  alerts: Alert[] = [];
  numberOfAlerts: number | undefined;
  constructor() { }

  ngOnInit(): void {
    this.populateAlerts();
    this.numberOfAlerts = this.alerts.length;
  }

  populateAlerts(): void {
    for (let i = 0; i < 5; i++) {
      this.alerts.push({
        alertWord: 'lorem',
        correction: 'change to ipsum'
      });
    }
  }

}

export interface Alert {
  alertWord: string;
  correction: string;
}
