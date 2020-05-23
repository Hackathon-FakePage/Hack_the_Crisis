import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as GetAlertIndicesDTO from '../common/dtos/get-alert-indices.dto';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-webpage-select',
  templateUrl: './webpage-select.component.html',
  styleUrls: ['./webpage-select.component.scss'],
})
export class WebpageSelectComponent implements OnInit, OnDestroy {
  private static readonly ERROR_MESSAGE =
    'There was a problem while analyzing the text. Please try again.';
  textForm: FormGroup | undefined;
  fetchIndices$: Subscription | undefined;
  isHidden = false;

  constructor(
    private readonly dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.fetchIndices$.unsubscribe();
  }

  onSubmit(): void {
    this.updateAnalyzedText();
  }

  private updateAnalyzedText() {
    this.fetchIndices$ = this.dataStorageService
      .fetchIndices(this.textForm.value.text)
      .subscribe(
        (data) => {
          const indices: GetAlertIndicesDTO.Root = { indices: [...data.indices] };
          this.dataStorageService.setReliableDataSubmitted(true);
          this.dataStorageService.saveText(this.textForm.value.text);
          this.dataStorageService.saveIndices(indices);
          this.dataStorageService.setFormalityScore(data.formalityScore);
          this.dataStorageService.updateErrorMessage('');
          this.hidePage();
        },
        () => {
          this.dataStorageService.updateErrorMessage(
            WebpageSelectComponent.ERROR_MESSAGE
          );
        }
      );
  }

  private initForm(): void {
    this.textForm = new FormGroup({
      text: new FormControl(null, [Validators.required]),
    });
  }

  private hidePage(): void {
    this.isHidden = true;
  }
}
