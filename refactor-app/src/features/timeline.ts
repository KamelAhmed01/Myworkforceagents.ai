export function initializeTimeline(): void {
  console.log('⏰ Initializing Timeline...');
  
  setupTimelineControls();
  setupTimelineAutoplay();
}

function setupTimelineControls(): void {
  // Event delegation for timeline phase buttons
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const button = target.closest('[data-action="show-timeline-phase"]') as HTMLElement;
    
    if (!button) return;

    const phase = button.dataset.phase;
    if (phase) {
      showTimelinePhase(phase);
    }
  });
}

function setupTimelineAutoplay(): void {
  let currentPhase = 0;
  const phases = ['before', 'during', 'after'];
  const autoplayInterval = 8000; // 8 seconds
  
  // Auto-advance timeline phases
  setInterval(() => {
    if (isTimelineInView()) {
      currentPhase = (currentPhase + 1) % phases.length;
      showTimelinePhase(phases[currentPhase]);
    }
  }, autoplayInterval);
}

function showTimelinePhase(phase: string): void {
  console.log(`⏰ Showing timeline phase: ${phase}`);
  
  // Update timeline markers
  const markers = document.querySelectorAll('.marker');
  markers.forEach(marker => {
    const markerElement = marker as HTMLElement;
    if (markerElement.dataset.phase === phase) {
      markerElement.classList.add('active');
    } else {
      markerElement.classList.remove('active');
    }
  });
  
  // Update timeline buttons
  const buttons = document.querySelectorAll('.timeline-btn');
  buttons.forEach(button => {
    const buttonElement = button as HTMLElement;
    if (buttonElement.dataset.phase === phase) {
      buttonElement.classList.add('active');
    } else {
      buttonElement.classList.remove('active');
    }
  });
  
  // Update office scenes
  const scenes = document.querySelectorAll('.office-scene');
  scenes.forEach(scene => {
    scene.classList.remove('active');
  });
  
  const activeScene = document.getElementById(`office${capitalize(phase)}`);
  if (activeScene) {
    activeScene.classList.add('active');
  }
  
  // Animate timeline progress
  updateTimelineProgress(phase);
}

function updateTimelineProgress(phase: string): void {
  const progressBar = document.querySelector('.timeline-progress-bar .progress-fill') as HTMLElement;
  
  if (!progressBar) return;

  const phaseProgress = {
    before: '0%',
    during: '50%',
    after: '100%'
  };
  
  progressBar.style.width = phaseProgress[phase as keyof typeof phaseProgress] || '0%';
}

function isTimelineInView(): boolean {
  const timelineElement = document.querySelector('.transformation-timeline-container');
  
  if (!timelineElement) return false;

  const rect = timelineElement.getBoundingClientRect();
  const viewHeight = window.innerHeight;
  
  // Check if timeline is at least 50% visible
  return rect.top < viewHeight * 0.5 && rect.bottom > viewHeight * 0.5;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export for global access (backwards compatibility)
(window as any).showTimelinePhase = showTimelinePhase;
