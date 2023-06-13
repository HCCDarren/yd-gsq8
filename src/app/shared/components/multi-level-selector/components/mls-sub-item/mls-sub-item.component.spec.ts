import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlsSubItemComponent } from './mls-sub-item.component';

describe('MlsSubItemComponent', () => {
  let component: MlsSubItemComponent;
  let fixture: ComponentFixture<MlsSubItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlsSubItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlsSubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
