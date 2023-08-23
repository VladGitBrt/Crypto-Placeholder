import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCoinComponent } from './selected-coin.component';

describe('SelectedCoinComponent', () => {
  let component: SelectedCoinComponent;
  let fixture: ComponentFixture<SelectedCoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedCoinComponent]
    });
    fixture = TestBed.createComponent(SelectedCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
