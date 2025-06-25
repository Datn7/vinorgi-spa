import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ar-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ar-viewer.component.html',
  styleUrls: ['./ar-viewer.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArViewerComponent implements OnInit {
  modelUrl: string | null = null;
  isBrowser = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isBrowser = typeof window !== 'undefined';

    const modelId = this.route.snapshot.queryParamMap.get('modelId');
    if (modelId) {
      this.http
        .get<any>(`http://localhost:5151/api/models/${modelId}`)
        .subscribe({
          next: (data) => {
            const base = window.location.origin;
            this.modelUrl = base + data.fileUrl;

            // Trigger change detection manually to avoid ExpressionChanged error
            this.cdRef.detectChanges();
          },
          error: () => {
            console.error('Model failed to load.');
          },
        });
    }
  }

  enterAR(): void {
    const viewer: any = document.querySelector('model-viewer');
    if (viewer && viewer.activateAR) {
      viewer.activateAR();
    } else {
      alert('AR mode not supported on this device.');
    }
  }
}
