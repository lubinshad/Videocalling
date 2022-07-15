import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioCallingComponent } from './audio-calling.component';

describe('AudioCallingComponent', () => {
  let component: AudioCallingComponent;
  let fixture: ComponentFixture<AudioCallingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioCallingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioCallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
