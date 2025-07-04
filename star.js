/* 
https://github.com/Aneks1/canvas-particles
This is my first pen, if you liked it please leave a heart 💗 
*/

class Particle {
    parent;
    id;
    position = { x: 0, y: 0 };
    diameter = 0;
    life = 0;
    speed = { x: 0, y: 0 };
    init() {
        const interval = setInterval(() => {
            this.position.x += this.speed.x * 60 / 1000;
            this.position.y -= this.speed.y * 60 / 1000;
            this.life -= 1 / 60;
            if (this.life <= 0) {
                clearInterval(interval);
                this.parent.particles.delete(this.id);
            }
        }, 1000 / 60);
    }
    constructor(id, parent) {
        this.parent = parent;
        this.id = id;
        this.init();
    }
}
class ParticleSystem {
    canvas;
    size;
    lastId = 0;
    ammount = 0;
    particles = new Map();
    diameter = { min: 0, max: 0 };
    life = { min: 0, max: 0 };
    speed = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
    static getRandomNumberInInterval(invterval) {
        const min = Math.ceil(invterval.min);
        const max = Math.floor(invterval.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    createParticle() {
        const particle = new Particle(this.lastId.toString(), this);
        particle.position.x = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.x });
        particle.position.y = ParticleSystem.getRandomNumberInInterval({ min: 0, max: this.size.y });
        particle.diameter = ParticleSystem.getRandomNumberInInterval(this.diameter);
        particle.life = ParticleSystem.getRandomNumberInInterval(this.life);
        particle.speed.x = ParticleSystem.getRandomNumberInInterval(this.speed.x);
        particle.speed.y = ParticleSystem.getRandomNumberInInterval(this.speed.y);
        this.particles.set(this.lastId.toString(), particle);
        this.lastId++;
    }
    init() {
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'white';
        this.particles = new Map()
        for (let i = 0; i < this.ammount; i++)
            this.createParticle();
        setInterval(() => {
            if (this.particles.size <= this.ammount)
                this.createParticle();
        }, 1000 / 60);
        setInterval(() => {
            ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles.forEach((particle) => {
                ctx?.beginPath();
                ctx?.arc(particle.position.x, particle.position.y, particle.diameter / 2, 0, 2 * Math.PI, false);
                ctx?.closePath();
                ctx?.fill();
            });
        }, 1000 / 60);
    }
    constructor(canvas, size) {
        this.canvas = canvas;
        this.size = size;
        canvas.width = size.x;
        canvas.height = size.y;
    }
}

        const canvas = document.getElementById('container')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const system = new ParticleSystem(canvas, { x: window.innerWidth, y: window.innerHeight })
        system.ammount = 100
        system.diameter = { min: 1, max: 2 }
        system.life = { min: 15, max: 20 }
        system.speed = { x: { min: -10, max: 10 }, y: { min: -10, max: 10 } }
        system.init()

onresize = (event) => {
  system.size = { x: window.innerWidth, y: window.innerHeight }
  system.init()
};

// Place this after your navbar HTML or in your main JS bundle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.navbar-hamburger');
  const links = document.querySelector('.navbar-links');
  if (!hamburger || !links) return;

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    links.classList.toggle('show');
  });

  // Optional: close menu when clicking a link (for single-page apps)
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      links.classList.remove('show');
    });
  });

  // Optional: close menu on outside click
  document.addEventListener('click', function(e) {
    if (window.innerWidth > 700) return;
    if (!hamburger.contains(e.target) && !links.contains(e.target)) {
      hamburger.classList.remove('open');
      links.classList.remove('show');
    }
  });
});

