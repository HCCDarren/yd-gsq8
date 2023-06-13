import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLevelSelectorComponent } from './multi-level-selector.component';

describe('MultiLevelSelectorComponent', () => {
  let component: MultiLevelSelectorComponent;
  let fixture: ComponentFixture<MultiLevelSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLevelSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLevelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
