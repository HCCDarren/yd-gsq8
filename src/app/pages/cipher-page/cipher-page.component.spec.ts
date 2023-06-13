import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CipherPageComponent } from './cipher-page.component';

describe('CipherPageComponent', () => {
  let component: CipherPageComponent;
  let fixture: ComponentFixture<CipherPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CipherPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CipherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
