// --- CUSTOM CURSOR ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; cursor.style.left = `${mouseX}px`; cursor.style.top = `${mouseY}px`; });
gsap.ticker.add(() => { posX += (mouseX - posX) * 0.1; posY += (mouseY - posY) * 0.1; follower.style.left = `${posX}px`; follower.style.top = `${posY}px`; });

const interactables = document.querySelectorAll('input, button');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => { follower.style.width = '60px'; follower.style.height = '60px'; follower.style.background = 'rgba(0, 245, 255, 0.1)'; follower.style.borderColor = '#00F5FF'; });
    el.addEventListener('mouseleave', () => { follower.style.width = '40px'; follower.style.height = '40px'; follower.style.background = 'transparent'; follower.style.borderColor = '#7C3AED'; });
});

// --- 3D SECURITY GATEWAY ANIMATION ---
const container = document.getElementById('login-canvas-container');
if (container) {
    let scene = new THREE.Scene(); let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); container.appendChild(renderer.domElement);
    const geometry1 = new THREE.TorusGeometry(3, 0.8, 16, 100); const geometry2 = new THREE.TorusGeometry(4.5, 0.2, 16, 100);
    const materialCyan = new THREE.MeshBasicMaterial({ color: 0x00F5FF, wireframe: true, transparent: true, opacity: 0.15 });
    const materialPurple = new THREE.MeshBasicMaterial({ color: 0x7C3AED, wireframe: true, transparent: true, opacity: 0.2 });
    let ring1 = new THREE.Mesh(geometry1, materialCyan); let ring2 = new THREE.Mesh(geometry2, materialPurple);
    scene.add(ring1); scene.add(ring2);
    ring1.rotation.x = Math.PI / 2; ring2.rotation.y = Math.PI / 3; camera.position.z = 8;
    let targetX = 0, targetY = 0; document.addEventListener('mousemove', (e) => { targetX = (e.clientX - window.innerWidth / 2) * 0.0005; targetY = (e.clientY - window.innerHeight / 2) * 0.0005; });
    function animate() { requestAnimationFrame(animate); ring1.rotation.z += 0.002 + targetX; ring1.rotation.x += targetY; ring2.rotation.z -= 0.001 + targetX; ring2.rotation.y += targetY; renderer.render(scene, camera); } animate();
    window.addEventListener('resize', () => { renderer.setSize(window.innerWidth, window.innerHeight); camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); });
}

// --- LOGIN LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".login-card", { opacity: 0, scale: 0.9, y: 30, duration: 1.2, ease: "expo.out" });
    const loginForm = document.getElementById('login-form'); const errorMessage = document.getElementById('error-message');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); const passwordInput = document.getElementById('password').value; const correctPassword = "apix";
        if (passwordInput === correctPassword) {
            errorMessage.classList.remove('visible'); const btn = loginForm.querySelector('button'); btn.innerHTML = "LINK ESTABLISHED..."; btn.style.backgroundColor = "rgba(0, 245, 255, 0.2)";
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        } else {
            errorMessage.classList.add('visible'); gsap.fromTo(".login-card", { x: -10 }, { x: 10, duration: 0.1, yoyo: true, repeat: 5, ease: "power1.inOut", onComplete: () => { gsap.to(".login-card", {x: 0, duration: 0.1}); }});
        }
    });
});
