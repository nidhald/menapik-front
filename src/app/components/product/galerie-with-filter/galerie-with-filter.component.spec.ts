import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieWithFilterComponent } from './galerie-with-filter.component';

describe('GalerieWithFilterComponent', () => {
  let component: GalerieWithFilterComponent;
  let fixture: ComponentFixture<GalerieWithFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalerieWithFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalerieWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
