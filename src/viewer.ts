import { Pane } from 'tweakpane';
import { BoxGeometry, Euler, Mesh, MeshLambertMaterial, Vector3 } from 'three';
import { AmbientLight, DirectionalLight, Engine, MeshRenderer, Scene, SceneRenderer } from "@fantasy3d/core";
import { OrbitController } from '@fantasy3d/addons';

/**
 * Viewer
 *
 * @export
 * @class Viewer
 * @date 2024.2.6
 * @author yisky
 */
export class Viewer {

    // Engine
    engine: Engine;

    // Scene
    scene: Scene;

    // Pane
    pane: Pane;

    constructor() {

        // Create pane
        this.pane = new Pane( { title: 'options', expanded: false } );

        // Create Engine
        this.engine = new Engine( {

            // WebGL Options
            gl: {

                viewport: document.getElementById( 'viewport' ),
                clearColor: 'orange'

            }

        } );
        
        // Create Scene
        this._createScene();

    }

    // private functions

    /**
     * Create Scene
     *
     * @private
     * @memberof Viewer
     */
    private _createScene(): void {

        const { engine } = this;

        // Create Scene
        this.scene = new Scene( engine );

        // Create Scene Renderer
        this.scene.sceneRenderer = new SceneRenderer( engine );

        // Active Scene
        this.scene.isActive = true;

        // Create a PerspectiveCamera
        const camera = this.scene.createPerspectiveCamera( {

            transform: {

                position: new Vector3( 0.0, 25.0, 25.0 ),
                lookAt: new Vector3( 0, 0, 0 )

            },
            camera: { near: 0.1, far: 100.0 }

        } );

        // @ts-ignore Add OrbitController for camera
        camera.addComponent( OrbitController, { damping: true } );

        const { rootEntity } = this.scene;

        // Add AmbientLight
        rootEntity.addComponent( AmbientLight, { intensity: 0.15 * Math.PI } );

        // Add DirectionalLight
        rootEntity.addComponent( DirectionalLight, {

            intensity: Math.PI,
            position: new Vector3( 10.0, 10.0, 10.0 ),
            target: new Vector3( 0.0, 0.0, 0.0 )

        } );

        // Create a child entity
        const entity = rootEntity.createChild( {

            transform: {

                position: new Vector3( 0, 2.0, 0 ),
                rotation: new Euler( 0.0, Math.PI / 4.0, 0.0 )

            }

        } );

        // Add MeshRenderer component
        entity.addComponent( MeshRenderer, {

            mesh: new Mesh(

                new BoxGeometry( 4.0, 4.0, 4.0 ),
                new MeshLambertMaterial( { color: 'lightblue' } )

            )

        } );        

    }

}