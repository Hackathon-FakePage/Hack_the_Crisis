import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  additionalInfo: FormGroup;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    console.log(this.additionalInfo.value);
  }

  private initForm(): void {
    this.additionalInfo = new FormGroup({
      isReviewed: new FormControl('I don\'t know', [Validators.required]),
      isEmotional: new FormControl('I don\'t know', [Validators.required]),
      isExpert: new FormControl('I don\'t know', [Validators.required])
    });
  }
}
