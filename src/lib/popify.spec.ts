import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Popify } from './popify';

describe('Popify', () => {
  let component: Popify;
  let fixture: ComponentFixture<Popify>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popify],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Popify);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
