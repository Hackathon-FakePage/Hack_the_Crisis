import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteAnalyzerComponent } from './website-analyzer.component';

describe('WebsiteAnalyzerComponent', () => {
  let component: WebsiteAnalyzerComponent;
  let fixture: ComponentFixture<WebsiteAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
