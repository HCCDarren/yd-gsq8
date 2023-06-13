import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsqSheetQueryComponent } from './gsq-sheet-query.component';

describe('GsqSheetQueryComponent', () => {
  let component: GsqSheetQueryComponent;
  let fixture: ComponentFixture<GsqSheetQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsqSheetQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsqSheetQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
