import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlsMainPageComponent } from './bls-main-page.component';

describe('BlsMainPageComponent', () => {
  let component: BlsMainPageComponent;
  let fixture: ComponentFixture<BlsMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlsMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
