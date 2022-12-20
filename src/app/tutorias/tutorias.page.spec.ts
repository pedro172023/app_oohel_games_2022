import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutoriasPage } from './tutorias.page';

describe('TutoriasPage', () => {
  let component: TutoriasPage;
  let fixture: ComponentFixture<TutoriasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoriasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
