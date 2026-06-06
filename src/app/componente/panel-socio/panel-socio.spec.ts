import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSocio } from './panel-socio';

describe('PanelSocio', () => {
  let component: PanelSocio;
  let fixture: ComponentFixture<PanelSocio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelSocio],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelSocio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
