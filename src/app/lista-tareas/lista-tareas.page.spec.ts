import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaTareasPage } from './lista-tareas.page';

describe('ListaTareasPage', () => {
  let component: ListaTareasPage;
  let fixture: ComponentFixture<ListaTareasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTareasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
