import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlbViewerComponent } from './glb-viewer.component';

describe('GlbViewerComponent', () => {
  let component: GlbViewerComponent;
  let fixture: ComponentFixture<GlbViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlbViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlbViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
