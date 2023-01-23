import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeurComponent } from './contributeur.component';

describe('ContributeurComponent', () => {
  let component: ContributeurComponent;
  let fixture: ComponentFixture<ContributeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
