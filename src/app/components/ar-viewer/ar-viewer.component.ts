import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ar-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ar-viewer.component.html',
  styleUrls: ['./ar-viewer.component.scss'],
})
export class ArViewerComponent implements OnInit {
  modelUrl: string | null = null;
  isBrowser = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.isBrowser = typeof window !== 'undefined';

    if (!this.isBrowser) return;

    const modelId = this.route.snapshot.queryParamMap.get('modelId');
    if (modelId) {
      this.http
        .get<any>(`http://localhost:5151/api/models/${modelId}`)
        .subscribe({
          next: (data) => {
            const base = window.location.origin;
            this.modelUrl = base + data.fileUrl;
          },
          error: () => {
            console.error('Model failed to load on server-side.');
          },
        });
    }
  }
}
