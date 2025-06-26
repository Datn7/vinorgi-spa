import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-glb-viewer',
  standalone: true,
  templateUrl: './glb-viewer.component.html',
  styleUrl: './glb-viewer.component.scss',
})
export class GlbViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() modelUrl!: string;
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId: any;

  ngOnInit(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.camera.position.z = 2;
  }

  ngAfterViewInit(): void {
    const container = this.rendererContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    this.scene.add(light);

    const loader = new GLTFLoader();
    loader.load(this.modelUrl, (gltf: any) => {
      this.scene.add(gltf.scene);
    });

    this.animate();
  }

  animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
  }
}
