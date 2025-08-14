export function initializeAnimations(): void {
  console.log('✨ Initializing Animations...');
  
  setupFloatingOrbs();
  setupParticleField();
  setupHoverEffects();
  setupScrollAnimations();
}

function setupFloatingOrbs(): void {
  const orbs = document.querySelectorAll('.floating-orb');
  
  orbs.forEach((orb, index) => {
    const orbElement = orb as HTMLElement;
    
    // Set initial random positions and animations
    const randomDelay = Math.random() * 3;
    const randomDuration = 8 + Math.random() * 4;
    
    orbElement.style.animationDelay = `${randomDelay}s`;
    orbElement.style.animationDuration = `${randomDuration}s`;
    
    // Add floating animation
    animateFloatingOrb(orbElement, index);
  });
}

function animateFloatingOrb(orb: HTMLElement, index: number): void {
  const amplitude = 30 + Math.random() * 20;
  const frequency = 0.02 + Math.random() * 0.01;
  let time = 0;
  
  const animate = (): void => {
    time += frequency;
    const x = Math.sin(time) * amplitude;
    const y = Math.cos(time * 0.7) * amplitude * 0.5;
    
    orb.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
  };
  
  // Start animation with random delay
  setTimeout(animate, index * 1000);
}

function setupParticleField(): void {
  const particleField = document.querySelector('.particle-field');
  
  if (!particleField) return;

  const particles = particleField.querySelectorAll('.particle');
  
  particles.forEach((particle, index) => {
    const particleElement = particle as HTMLElement;
    
    // Random starting position
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    particleElement.style.left = `${x}px`;
    particleElement.style.top = `${y}px`;
    
    // Animate particle
    animateParticle(particleElement, index);
  });
}

function animateParticle(particle: HTMLElement, index: number): void {
  const speed = 0.5 + Math.random() * 1;
  const direction = Math.random() * Math.PI * 2;
  
  let x = parseFloat(particle.style.left) || 0;
  let y = parseFloat(particle.style.top) || 0;
  
  const animate = (): void => {
    x += Math.cos(direction) * speed;
    y += Math.sin(direction) * speed;
    
    // Wrap around screen edges
    if (x > window.innerWidth) x = 0;
    if (x < 0) x = window.innerWidth;
    if (y > window.innerHeight) y = 0;
    if (y < 0) y = window.innerHeight;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    requestAnimationFrame(animate);
  };
  
  // Start with staggered delay
  setTimeout(animate, index * 500);
}

function setupHoverEffects(): void {
  // Enhanced card hover effects
  const cards = document.querySelectorAll('.game-card');
  
  cards.forEach(card => {
    const cardElement = card as HTMLElement;
    
    cardElement.addEventListener('mouseenter', () => {
      createHoverParticles(cardElement);
    });
    
    cardElement.addEventListener('mousemove', (e) => {
      updateCardTilt(cardElement, e as MouseEvent);
    });
    
    cardElement.addEventListener('mouseleave', () => {
      resetCardTilt(cardElement);
    });
  });
}

function createHoverParticles(card: HTMLElement): void {
  const rect = card.getBoundingClientRect();
  const particleCount = 5;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'hover-particle';
    particle.style.cssText = `
      position: fixed;
      width: 3px;
      height: 3px;
      background: #00ff88;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      left: ${rect.left + Math.random() * rect.width}px;
      top: ${rect.top + Math.random() * rect.height}px;
      animation: hoverParticle 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

function updateCardTilt(card: HTMLElement, event: MouseEvent): void {
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const deltaX = (event.clientX - centerX) / (rect.width / 2);
  const deltaY = (event.clientY - centerY) / (rect.height / 2);
  
  const tiltX = deltaY * 10; // Max 10 degrees
  const tiltY = deltaX * -10; // Max 10 degrees
  
  card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
}

function resetCardTilt(card: HTMLElement): void {
  card.style.transform = '';
  card.style.transition = 'transform 0.3s ease';
  
  setTimeout(() => {
    card.style.transition = '';
  }, 300);
}

function setupScrollAnimations(): void {
  // Parallax effects for background elements
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Animate floating orbs based on scroll
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
      const orbElement = orb as HTMLElement;
      const speed = 0.1 + (index * 0.05);
      const yOffset = scrollY * speed;
      
      orbElement.style.transform = `translateY(${yOffset}px)`;
    });
    
    // Animate particle field
    const particleField = document.querySelector('.particle-field') as HTMLElement;
    if (particleField) {
      const parallaxOffset = scrollY * 0.2;
      particleField.style.transform = `translateY(${parallaxOffset}px)`;
    }
  }, { passive: true });
}

// Add CSS for hover animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes hoverParticle {
    0% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(0);
    }
  }
  
  .game-card {
    transition: transform 0.1s ease-out;
  }
  
  .floating-orb {
    transition: transform 0.1s ease-out;
  }
`;

document.head.appendChild(animationStyles);
