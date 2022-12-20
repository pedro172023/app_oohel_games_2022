import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalificacionesPage } from './calificaciones.page';

describe('CalificacionesPage', () => {
  let component: CalificacionesPage;
  let fixture: ComponentFixture<CalificacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalificacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
