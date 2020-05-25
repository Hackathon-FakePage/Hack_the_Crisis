import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  message: string | undefined;
  private message$: Subscription;

  constructor(private readonly dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.message$ = this.dataStorageService.errorMessage.subscribe(
      (message) => {
          this.message = message;
          this.closeErrorAfterTimeout();
      }
    );
  }

  ngOnDestroy(): void {
    this.message$.unsubscribe();
  }

  private closeErrorAfterTimeout(): void {
    setTimeout(() => {
      this.dataStorageService.updateErrorMessage('');
    }, 2000);
  }
}
