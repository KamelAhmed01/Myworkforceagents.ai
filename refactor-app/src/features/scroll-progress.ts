export function initializeScrollProgress(): void {
  console.log('📊 Initializing Scroll Progress...');
  
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  
  if (!scrollProgressBar) {
    console.warn('Scroll progress bar element not found');
    return;
  }

  const updateScrollProgress = (): void => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    scrollProgressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
  };

  // Update on scroll
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  
  // Update on resize
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  
  // Initial update
  updateScrollProgress();
}
