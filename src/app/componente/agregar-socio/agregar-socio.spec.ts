import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSocio } from './agregar-socio';

describe('AgregarSocio', () => {
  let component: AgregarSocio;
  let fixture: ComponentFixture<AgregarSocio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarSocio],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarSocio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
