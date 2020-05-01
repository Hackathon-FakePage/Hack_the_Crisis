import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage/data-storage.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  textToAnalyze$: Subscription;
  dataSubmitted$: Subscription;
  shouldDisplayAnalyzingSection = false;
  isHidden = false;

  constructor(private readonly dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.dataSubmitted$ = this.dataStorageService.wasReliableDataSubmitted.subscribe(
      (data) => {
        this.isHidden = data;
      }
    );
    this.textToAnalyze$ = this.dataStorageService.textToAnalyze.subscribe(
      (data) => {
        this.shouldDisplayAnalyzingSection = !_.isEmpty(data);
      }
    );
  }

  ngOnDestroy(): void {
    this.textToAnalyze$.unsubscribe();
    this.dataSubmitted$.unsubscribe();
  }

  get analyzerClass(): string {
    return this.shouldDisplayAnalyzingSection ? '' : 'hide-content';
  }
}
