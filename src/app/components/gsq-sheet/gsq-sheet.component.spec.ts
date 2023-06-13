import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsqSheetComponent } from './gsq-sheet.component';

describe('GsqSheetComponent', () => {
  let component: GsqSheetComponent;
  let fixture: ComponentFixture<GsqSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsqSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsqSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
