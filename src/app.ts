import { Viewer } from "./viewer";

// @ts-ignore
window.VIEWER = {};

/**
 * App
 *
 * @class App
 * @date 2024.2.6
 * @author yisky
 */
class App {

    viewer: Viewer;

    constructor() {

        this.viewer = new Viewer();

    }
    
}

document.addEventListener( 'DOMContentLoaded', () => {

    // @ts-ignore
    window.VIEWER.app = new App();

} );