import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsqButtonListComponent } from './gsq-button-list.component';

describe('GsqButtonListComponent', () => {
  let component: GsqButtonListComponent;
  let fixture: ComponentFixture<GsqButtonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsqButtonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsqButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
