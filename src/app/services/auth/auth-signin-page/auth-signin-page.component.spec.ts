import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSigninPageComponent } from './auth-signin-page.component';

describe('AuthSigninPageComponent', () => {
  let component: AuthSigninPageComponent;
  let fixture: ComponentFixture<AuthSigninPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthSigninPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSigninPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
