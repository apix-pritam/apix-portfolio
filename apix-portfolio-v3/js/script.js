// --- CUSTOM CURSOR ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
});

gsap.ticker.add(() => {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;
    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;
});

const interactables = document.querySelectorAll('a, button');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.style.width = '60px';
        follower.style.height = '60px';
        follower.style.background = 'rgba(0, 245, 255, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        follower.style.width = '40px';
        follower.style.height = '40px';
        follower.style.background = 'transparent';
    });
});

// --- ADVANCED 3D CANVAS ---
const container = document.getElementById('canvas-container');
if (container) {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x7C3AED, wireframe: true, transparent: true, opacity: 0.3 });
    
    let shape = new THREE.Mesh(geometry, material);
    scene.add(shape);
    camera.position.z = 6;

    let targetX = 0;
    let targetY = 0;
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - window.innerWidth / 2) * 0.001;
        targetY = (e.clientY - window.innerHeight / 2) * 0.001;
    });

    function animate() {
        requestAnimationFrame(animate);
        shape.rotation.x += 0.001 + (targetY * 0.1);
        shape.rotation.y += 0.002 + (targetX * 0.1);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".page-transition", { opacity: 0, y: 40, duration: 1, ease: "power3.out" });
    gsap.from(".stagger-item", { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, delay: 0.3, ease: "power2.out" });

    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }
});
