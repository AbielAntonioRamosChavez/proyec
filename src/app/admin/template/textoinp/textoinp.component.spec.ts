import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoinpComponent } from './textoinp.component';

describe('TextoinpComponent', () => {
  let component: TextoinpComponent;
  let fixture: ComponentFixture<TextoinpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextoinpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextoinpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
