import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Subscription } from 'rxjs';
import { faPen, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  faPencil: IconDefinition = faPen;
  wasDataSubmitted$: Subscription;
  text$: Subscription;
  wasSubmitted = false;
  text: string;

  constructor(private readonly dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.wasDataSubmitted$ = this.dataStorageService.wasReliableDataSubmitted.subscribe((data) => {
      this.wasSubmitted = data;
    });
    this.text$ = this.dataStorageService.textToAnalyze.subscribe((data) => {
      this.text = data;
    });
  }

  ngOnDestroy(): void {
    this.wasDataSubmitted$.unsubscribe();
  }

  get backgroundColor(): string {
    return this.wasSubmitted ? 'dark-mode' : 'bg-transparent';
  }

  onClick() {
    this.dataStorageService.setReliableDataSubmitted(false);
  }
}
