import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsqSheetDataComponent } from './gsq-sheet-data.component';

describe('GsqSheetDataComponent', () => {
  let component: GsqSheetDataComponent;
  let fixture: ComponentFixture<GsqSheetDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsqSheetDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsqSheetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
