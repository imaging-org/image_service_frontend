import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryInputComponent } from './gallery-input.component';

describe('GalleryInputComponent', () => {
  let component: GalleryInputComponent;
  let fixture: ComponentFixture<GalleryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
