import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

declare const THREE: any;
declare const GLTFLoader: any;
declare const OrbitControls: any;

@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss'],
})
export class ModelViewerComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;
  @Input() modelUrl!: string;

  private scene!: any;
  private camera!: any;
  private renderer!: any;
  private controls!: any;

  ngAfterViewInit(): void {
    this.initScene();
    this.loadModel();
    this.animate();
  }

  private initScene(): void {
    const container = this.rendererContainer.nativeElement;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf9fafb);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(1, 1, 3);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    this.scene.add(directionalLight);

    // Handle resizing
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private loadModel(): void {
    if (!this.modelUrl) {
      console.error('Model URL is required!');
      return;
    }

    const loader = new GLTFLoader();
    loader.load(
      this.modelUrl,
      (gltf: any) => {
        this.scene.add(gltf.scene);
      },
      undefined,
      (error: any) => {
        console.error(error);
      }
    );
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    const container = this.rendererContainer.nativeElement;

    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }
}
