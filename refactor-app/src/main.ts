import './styles/main.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { initializeScrollProgress } from './features/scroll-progress';
import { initializeNavigation } from './features/navigation';
import { initializeCards } from './features/card-interactions';
import { initializeTimeline } from './features/timeline';
import { initializeJourney } from './features/journey';
import { initializeAnimations } from './features/animations';
import { VapiService } from './features/vapi-service';
import { initVoiceInterface } from './features/voice-interface';
import { startGlobalTimeTracking } from './features/time-tracking';

class App {
  private vapiService: VapiService;

  constructor() {
    this.vapiService = new VapiService();
    this.init();
  }

  private async init(): Promise<void> {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100,
      anchorPlacement: 'top-bottom',
    });

    // Initialize all features
    this.initializeFeatures();

    // Setup global error handling
    this.setupErrorHandling();

    console.log('🚀 MWA.AI Website Loaded Successfully');
  }

  private initializeFeatures(): void {
    try {
      // Start time tracking first
      startGlobalTimeTracking();
      
      initializeScrollProgress();
      initializeNavigation();
      initializeCards();
      initializeTimeline();
      initializeJourney();
      initializeAnimations();
      
      // Make voice interface available globally for card interactions
      (window as any).initVoiceInterface = initVoiceInterface;
      
      // Make scroll functions globally available for HTML onclick handlers
      (window as any).scrollToExperiences = function() {
        const experiencesSection = document.getElementById('meet-section');
        if (experiencesSection) {
          experiencesSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      (window as any).scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      
      (window as any).goBackToExperiences = function() {
        const experiencesSection = document.getElementById('meet-section');
        if (experiencesSection) {
          experiencesSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
    } catch (error) {
      console.error('❌ Error initializing features:', error);
    }
  }

  private setupErrorHandling(): void {
    window.addEventListener('error', (event) => {
      console.error('❌ Global Error:', event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('❌ Unhandled Promise Rejection:', event.reason);
    });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// Export for debugging in development
if (import.meta.env.DEV) {
  (window as any).__MWA_APP__ = App;
}
