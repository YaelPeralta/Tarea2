import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterfazPrincipalPage } from './interfaz-principal.page';

describe('InterfazPrincipalPage', () => {
  let component: InterfazPrincipalPage;
  let fixture: ComponentFixture<InterfazPrincipalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfazPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
