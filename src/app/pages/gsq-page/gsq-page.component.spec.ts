import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsqPageComponent } from './gsq-page.component';

describe('GsqPageComponent', () => {
  let component: GsqPageComponent;
  let fixture: ComponentFixture<GsqPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsqPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsqPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
