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
import { OrbitControls } from 'three-stdlib';

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
  private controls!: OrbitControls;
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

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 2;

    // Light
    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    this.scene.add(light);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(this.renderer.domElement);

    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Load GLB
    const loader = new GLTFLoader();
    loader.load(this.modelUrl, (gltf: any) => {
      this.scene.add(gltf.scene);

      // Auto-center and fit to view
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      this.camera.position.copy(center);
      this.camera.position.z += size * 1.2;
      this.camera.lookAt(center);

      this.controls.target.copy(center);
      this.controls.update();

      this.animate();
    });
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.renderer) this.renderer.dispose();
    if (this.controls) this.controls.dispose();
  }
}
