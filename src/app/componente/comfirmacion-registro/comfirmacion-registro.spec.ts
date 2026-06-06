import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmacionRegistro } from './comfirmacion-registro';

describe('ComfirmacionRegistro', () => {
  let component: ComfirmacionRegistro;
  let fixture: ComponentFixture<ComfirmacionRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComfirmacionRegistro],
    }).compileComponents();

    fixture = TestBed.createComponent(ComfirmacionRegistro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
