import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContributeurComponent } from './list-contributeur.component';

describe('ListContributeurComponent', () => {
  let component: ListContributeurComponent;
  let fixture: ComponentFixture<ListContributeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListContributeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContributeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
