import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-webpage-select',
  templateUrl: './webpage-select.component.html',
  styleUrls: ['./webpage-select.component.scss'],
})
export class WebpageSelectComponent implements OnInit, OnDestroy {
  private static readonly ERROR_MESSAGE =
    'There was a problem while analyzing the text. Please try again.';
  textForm: FormGroup | undefined;
  wasReliableDataSubmitted$: Subscription | undefined;
  fetchIndices$: Subscription | undefined;
  modalRef: NgbModalRef | undefined;

  constructor(
    private readonly dataStorageService: DataStorageService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.wasReliableDataSubmitted$ = this.dataStorageService.wasReliableDataSubmitted.subscribe(
      (data) => {
        if (data) {
          this.updateAnalyzedText();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.wasReliableDataSubmitted$.unsubscribe();
    this.fetchIndices$.unsubscribe();
  }

  onSubmit(): void {
    this.modalRef = this.modalService.open(ModalComponent);
    this.modalRef.result.then(
      () => {
        this.dataStorageService.setReliableDataSubmitted(true);
      },
      (reason) => {
        if (reason !== 'Cancel') {
          this.dataStorageService.setReliableDataSubmitted(true);
          this.dataStorageService.reliableInfo.next(undefined);
        }
      }
    );
  }

  private updateAnalyzedText() {
    this.fetchIndices$ = this.dataStorageService
      .fetchIndices(this.textForm.value.text)
      .subscribe(
        (data) => {
          this.dataStorageService.saveText(this.textForm.value.text);
          this.dataStorageService.saveIndices(data);
        },
        () => {
          this.dataStorageService.updateErrorMessage(
            WebpageSelectComponent.ERROR_MESSAGE
          );
          this.dataStorageService.saveText(undefined);
        }
      );
  }

  private initForm(): void {
    this.textForm = new FormGroup({
      text: new FormControl(null, [Validators.required]),
    });
  }
}
