import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlsItemComponent } from './mls-item.component';

describe('MlsItemComponent', () => {
  let component: MlsItemComponent;
  let fixture: ComponentFixture<MlsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
