import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEntrenador } from './agregar-entrenador';

describe('AgregarEntrenador', () => {
  let component: AgregarEntrenador;
  let fixture: ComponentFixture<AgregarEntrenador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEntrenador],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarEntrenador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
