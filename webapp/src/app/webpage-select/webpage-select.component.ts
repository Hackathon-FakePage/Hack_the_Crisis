import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as GetAlertIndicesDTO from '../common/dtos/get-alert-indices.dto';

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
    this.dataStorageService.formalityScore.subscribe(data => console.log(data));
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
          console.log(data.formalityScore);
          const indices: GetAlertIndicesDTO.Root = { indices: [...data.indices] };
          this.dataStorageService.setReliableDataSubmitted(true);
          this.dataStorageService.saveText(this.textForm.value.text);
          this.dataStorageService.saveIndices(indices);
          this.dataStorageService.updateErrorMessage('');
          // this.dataStorageService.saveReliableInfo();
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
