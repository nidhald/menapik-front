import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendreVotreContenuComponent } from './vendre-votre-contenu.component';

describe('VendreVotreContenuComponent', () => {
  let component: VendreVotreContenuComponent;
  let fixture: ComponentFixture<VendreVotreContenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendreVotreContenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendreVotreContenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
