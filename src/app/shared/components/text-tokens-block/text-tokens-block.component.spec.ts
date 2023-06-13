import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTokensBlockComponent } from './text-tokens-block.component';

describe('TextTokensBlockComponent', () => {
  let component: TextTokensBlockComponent;
  let fixture: ComponentFixture<TextTokensBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextTokensBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTokensBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
