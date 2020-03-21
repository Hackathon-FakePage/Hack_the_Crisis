import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from '../data-storage/data-storage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  additionalInfo: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private readonly dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmitForm(): void {
    this.dataStorageService.setReliableDataSubmitted(true);
    this.dataStorageService.saveReliableInfo(this.additionalInfo.value);
    this.activeModal.close();
  }

  private initForm(): void {
    this.additionalInfo = new FormGroup({
      isReviewed: new FormControl('2', [Validators.required]),
      isEmotional: new FormControl('2', [Validators.required]),
      isExpert: new FormControl('2', [Validators.required])
    });
  }
}
