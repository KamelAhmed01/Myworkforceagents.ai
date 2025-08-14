export function initializeJourney(): void {
  console.log('🚀 Initializing Journey Timeline...');
  
  setupJourneyStages();
  setupJourneyProgress();
  setupJourneyInteractions();
}

function setupJourneyStages(): void {
  const stages = document.querySelectorAll('.journey-stage');
  
  // Initialize first stage as active
  if (stages.length > 0) {
    stages[0].classList.add('active');
  }
}

function setupJourneyProgress(): void {
  window.addEventListener('scroll', updateJourneyProgress, { passive: true });
  updateJourneyProgress(); // Initial update
}

function updateJourneyProgress(): void {
  const journeyTimeline = document.getElementById('journeyTimeline');
  const progressFill = document.getElementById('journeyProgressFill');
  
  if (!journeyTimeline || !progressFill) return;

  const rect = journeyTimeline.getBoundingClientRect();
  const viewHeight = window.innerHeight;
  
  // Calculate how much of the journey is visible
  let progress = 0;
  
  if (rect.top < viewHeight && rect.bottom > 0) {
    const visibleHeight = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
    const totalHeight = rect.height;
    progress = Math.min((visibleHeight / totalHeight) * 100, 100);
  }
  
  progressFill.style.height = `${progress}%`;
  
  // Update active stage based on scroll
  updateActiveStage(progress);
}

function updateActiveStage(progress: number): void {
  const stages = document.querySelectorAll('.journey-stage');
  const dots = document.querySelectorAll('.timeline-dot');
  
  // Calculate which stage should be active based on progress
  const stageProgress = progress / 100;
  const activeStageIndex = Math.min(Math.floor(stageProgress * stages.length), stages.length - 1);
  
  // Update stage visibility
  stages.forEach((stage, index) => {
    const stageElement = stage as HTMLElement;
    if (index === activeStageIndex) {
      stageElement.classList.add('active');
    } else {
      stageElement.classList.remove('active');
    }
  });
  
  // Update timeline dots
  dots.forEach((dot, index) => {
    const dotElement = dot as HTMLElement;
    if (index <= activeStageIndex) {
      dotElement.classList.add('active');
    } else {
      dotElement.classList.remove('active');
    }
  });
}

function setupJourneyInteractions(): void {
  // Click on timeline dots to jump to stages
  const dots = document.querySelectorAll('.timeline-dot');
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      jumpToStage(index + 1);
    });
  });
}

function jumpToStage(stageNumber: number): void {
  console.log(`🎯 Jumping to stage: ${stageNumber}`);
  
  const stageElement = document.getElementById(`stage${stageNumber}`);
  
  if (!stageElement) return;

  // Scroll to stage with smooth animation
  const offsetTop = stageElement.offsetTop - 100; // Account for header
  
  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
  
  // Highlight the stage temporarily
  stageElement.style.transform = 'scale(1.02)';
  stageElement.style.transition = 'transform 0.3s ease';
  
  setTimeout(() => {
    stageElement.style.transform = '';
    stageElement.style.transition = '';
  }, 500);
}

// Enhanced animations for stage transitions
function animateStageTransition(fromStage: number, toStage: number): void {
  const fromElement = document.getElementById(`stage${fromStage}`);
  const toElement = document.getElementById(`stage${toStage}`);
  
  if (!fromElement || !toElement) return;

  // Fade out current stage
  fromElement.style.opacity = '0.5';
  fromElement.style.transform = 'translateY(20px)';
  
  // Fade in new stage
  setTimeout(() => {
    fromElement.style.opacity = '';
    fromElement.style.transform = '';
    
    toElement.style.opacity = '1';
    toElement.style.transform = 'translateY(0)';
  }, 200);
}

// Export for global access
(window as any).jumpToJourneyStage = jumpToStage;
