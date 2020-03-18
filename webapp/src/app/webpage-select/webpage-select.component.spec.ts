import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageSelectComponent } from './webpage-select.component';

describe('WebpageSelectComponent', () => {
  let component: WebpageSelectComponent;
  let fixture: ComponentFixture<WebpageSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpageSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
