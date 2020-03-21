import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-webpage-select',
  templateUrl: './webpage-select.component.html',
  styleUrls: ['./webpage-select.component.scss']
})
export class WebpageSelectComponent implements OnInit, OnDestroy {
  textForm: FormGroup;
  wasReliableDataSubmitted$: Subscription;
  wasReliableDataSubmitted = false;

  constructor(private readonly dataStorageService: DataStorageService,
              private readonly modalService: NgbModal) { }

  ngOnInit(): void {
    this.initForm();
    this.wasReliableDataSubmitted$ = this.dataStorageService.wasReliableDataSubmitted.subscribe(data => {
      if (data) {
        this.updateAnalyzedText();
      }
    });
  }

  ngOnDestroy(): void {
    this.wasReliableDataSubmitted$.unsubscribe();
  }

  onSubmit(): void {
    this.modalService.open(ModalComponent);
  }

  private updateAnalyzedText() {
    this.dataStorageService.saveText(this.textForm.value.text);
    // this.dataStorageService.fetchIndices();
  }

  private initForm(): void {
    this.textForm = new FormGroup({
      text: new FormControl(null, [Validators.required])
    });
  }

}
