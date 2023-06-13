import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsqManagementPageComponent } from './gsq-management-page.component';

describe('GsqManagementPageComponent', () => {
  let component: GsqManagementPageComponent;
  let fixture: ComponentFixture<GsqManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsqManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsqManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
