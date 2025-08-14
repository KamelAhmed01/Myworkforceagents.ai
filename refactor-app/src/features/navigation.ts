export function initializeNavigation(): void {
  console.log('🧭 Initializing Navigation...');
  
  setupScrollToExperiences();
  setupMobileMenu();
  setupGlobalClickHandlers();
}

function setupScrollToExperiences(): void {
  const scrollToExperiences = (): void => {
    const experiencesSection = document.getElementById('experiences');
    if (experiencesSection) {
      const offset = 120; // Account for fixed header
      const targetPosition = experiencesSection.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback to top if experiences section not found
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const goBackToExperiences = (): void => {
    console.log('🎯 Back to Experiences clicked!');
    
    const experiencesSection = document.getElementById('experiences');
    
    if (experiencesSection) {
      const headerHeight = 120;
      const targetPosition = experiencesSection.offsetTop - headerHeight;
      
      console.log('Scrolling to experiences section at position:', targetPosition);
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      console.log('Experiences section not found, scrolling to top');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Make functions globally available for backwards compatibility
  (window as any).scrollToExperiences = scrollToExperiences;
  (window as any).goBackToExperiences = goBackToExperiences;
}

function setupMobileMenu(): void {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking on nav links
    navLinks.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).tagName === 'A') {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  }
}

function setupGlobalClickHandlers(): void {
  // Event delegation for back-to-experiences actions
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const delegateTarget = target.closest('#backToExperiencesBtn, [data-action="back-to-experiences"]');
    
    if (!delegateTarget) return;

    console.log('🖱️ Delegated handler: Back to Experiences button clicked');
    event.preventDefault();
    
    try {
      const goBackToExperiences = (window as any).goBackToExperiences;
      if (typeof goBackToExperiences === 'function') {
        goBackToExperiences();
      }
    } catch (err) {
      console.error('❌ Error in goBackToExperiences:', err);
    }
  }, { capture: true });
}
