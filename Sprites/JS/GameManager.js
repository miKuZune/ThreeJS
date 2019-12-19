class GameManager
{
    constructor()
    {
        // Core THREE.js initialization code, setting up the scene camera and renderer.
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        camera.position.z = 5;
        
        // Starting the main game loop.
        this.GameLoop(camera, scene, renderer);
    }

    GameLoop(camera, scene, renderer)
    {
        // Game start code
        var P_Controller = new PlayerController(scene);

        

        function Loop()
        {
            // Repeat this loop.
            requestAnimationFrame( Loop );
            // Re-render the scene.
            renderer.render(scene, camera);
            
            P_Controller.Update();
        }

        Loop();
    }

}