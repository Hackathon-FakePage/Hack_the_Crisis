import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-website-analyzer',
  templateUrl: './website-analyzer.component.html',
  styleUrls: ['./website-analyzer.component.scss']
})
export class WebsiteAnalyzerComponent implements OnInit, OnDestroy {
    textToAnalyze: string | undefined;
    wordsToHighlight: string[] = ['Lorem'];
    textToAnalyze$: Subscription;

  constructor(private readonly dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.textToAnalyze$ = this.dataStorageService.textToAnalyze.subscribe((text: string) => {
      this.textToAnalyze = text;
    });
  }

  ngOnDestroy(): void {
    this.textToAnalyze$.unsubscribe();
  }

}
