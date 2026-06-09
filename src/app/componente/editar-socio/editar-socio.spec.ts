import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSocio } from './editar-socio';

describe('EditarSocio', () => {
  let component: EditarSocio;
  let fixture: ComponentFixture<EditarSocio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSocio],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarSocio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
