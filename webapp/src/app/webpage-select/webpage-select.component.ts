import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage/data-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-webpage-select',
  templateUrl: './webpage-select.component.html',
  styleUrls: ['./webpage-select.component.scss']
})
export class WebpageSelectComponent implements OnInit {
  textForm: FormGroup;
  constructor(private readonly dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    this.dataStorageService.saveText(this.textForm.value.text);
    // this.dataStorageService.fetchIndices();
  }

  private initForm(): void {
    this.textForm = new FormGroup({
      text: new FormControl(null, [Validators.required])
    });
  }

}
