import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlsItemContainerComponent } from './mls-item-container.component';

describe('MlsItemContainerComponent', () => {
  let component: MlsItemContainerComponent;
  let fixture: ComponentFixture<MlsItemContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlsItemContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlsItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
