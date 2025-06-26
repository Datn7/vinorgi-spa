import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-glb-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './glb-viewer.component.html',
  styleUrls: ['./glb-viewer.component.scss'],
})
export class GlbViewerComponent implements OnChanges, OnDestroy {
  @Input() modelUrl!: string;
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modelUrl'] && this.modelUrl) {
      this.initViewer();
    }
  }

  private initViewer(): void {
    const container = this.rendererContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 2;

    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    container.innerHTML = ''; // clear previous render
    container.appendChild(this.renderer.domElement);

    const loader = new GLTFLoader();
    loader.load(this.modelUrl, (gltf: any) => {
      this.scene.add(gltf.scene);
      this.animate();
    });
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.renderer) this.renderer.dispose();
  }
}
