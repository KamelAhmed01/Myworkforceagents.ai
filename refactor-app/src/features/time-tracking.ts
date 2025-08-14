import type { TimeTrackingData, CardType } from '../types';

// Global time tracking state
let globalTimeData: TimeTrackingData = {
    startTime: 0,
    pageLoadTime: 0
};

export function startGlobalTimeTracking(): void {
    console.log('⏱️ Starting global time tracking...');
    
    // Record page load time
    globalTimeData.pageLoadTime = performance.now();
    globalTimeData.startTime = Date.now();
    
    // Track page visibility
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    console.log('✅ Global time tracking initialized');
}

function handleVisibilityChange(): void {
    if (document.visibilityState === 'visible') {
        console.log('👁️ Page became visible');
    } else {
        console.log('🙈 Page became hidden');
    }
}

export function recordInteractionTime(cardType: CardType): void {
    globalTimeData.interactionTime = Date.now();
    globalTimeData.cardSelected = cardType;
    
    console.log(`🎯 Interaction recorded for: ${cardType} at ${globalTimeData.interactionTime}`);
}

export function recordFormCompletion(): void {
    globalTimeData.completionTime = Date.now();
    globalTimeData.formCompleted = true;
    
    const totalTime = globalTimeData.completionTime - globalTimeData.startTime;
    console.log(`✅ Form completed in ${totalTime}ms`);
    
    // Show form completion modal
    showFormCompletion();
}

export function showFormCompletion(): void {
    console.log('🎉 Showing form completion...');
    
    // Calculate timing metrics
    const totalTime = globalTimeData.completionTime ? 
        globalTimeData.completionTime - globalTimeData.startTime : 
        Date.now() - globalTimeData.startTime;
    
    const interactionTime = globalTimeData.interactionTime ? 
        globalTimeData.interactionTime - globalTimeData.startTime : 0;
    
    // Create completion modal
    const modal = createCompletionModal(totalTime, interactionTime);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('modal-active');
    }, 100);
    
    // Auto-hide after delay
    setTimeout(() => {
        hideCompletionModal(modal);
    }, 5000);
}

function createCompletionModal(totalTime: number, interactionTime: number): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'form-completion-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="completion-header">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Experience Complete!</h2>
                    <p>Thank you for exploring MWA.AI</p>
                </div>
                
                <div class="timing-stats">
                    <div class="stat">
                        <div class="stat-value">${Math.round(totalTime / 1000)}s</div>
                        <div class="stat-label">Total Time</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${Math.round(interactionTime / 1000)}s</div>
                        <div class="stat-label">To First Interaction</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${globalTimeData.cardSelected || 'N/A'}</div>
                        <div class="stat-label">Experience Selected</div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="primary-btn" onclick="hideCompletionModal(this.closest('.form-completion-modal'))">
                        <i class="fas fa-rocket"></i>
                        Continue Journey
                    </button>
                    <button class="secondary-btn" onclick="restartExperience()">
                        <i class="fas fa-redo"></i>
                        Try Another Experience
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function hideCompletionModal(modal: HTMLElement): void {
    modal.classList.remove('modal-active');
    modal.classList.add('modal-closing');
    
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 500);
}

function restartExperience(): void {
    // Hide any completion modals
    const modals = document.querySelectorAll('.form-completion-modal');
    modals.forEach(modal => modal.remove());
    
    // Reset time tracking
    globalTimeData = {
        startTime: Date.now(),
        pageLoadTime: performance.now()
    };
    
    // Close any form interfaces
    (window as any).closeFormInterface?.();
    
    // Scroll back to experiences
    (window as any).scrollToExperiences?.();
    
    console.log('🔄 Experience restarted');
}

// Create hourglass timer for visual time tracking
export function createHourglassTimer(duration: number = 30000): HTMLElement {
    const timer = document.createElement('div');
    timer.className = 'hourglass-timer';
    timer.innerHTML = `
        <div class="hourglass-container">
            <div class="hourglass">
                <div class="hourglass-top">
                    <div class="sand-top"></div>
                </div>
                <div class="hourglass-middle"></div>
                <div class="hourglass-bottom">
                    <div class="sand-bottom"></div>
                </div>
            </div>
            <div class="timer-label">Processing your journey...</div>
        </div>
    `;
    
    // Start sand animation
    const sandTop = timer.querySelector('.sand-top') as HTMLElement;
    const sandBottom = timer.querySelector('.sand-bottom') as HTMLElement;
    
    if (sandTop && sandBottom) {
        sandTop.style.animation = `sandFall ${duration}ms linear forwards`;
        sandBottom.style.animation = `sandGather ${duration}ms linear forwards`;
    }
    
    return timer;
}

// Show time revelation modal (used in original code)
export function showTimeRevelationModal(): void {
    const totalTime = Date.now() - globalTimeData.startTime;
    const modal = createTimeRevelationModal(totalTime);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('modal-active');
    }, 100);
}

function createTimeRevelationModal(totalTime: number): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'time-revelation-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="time-revelation-header">
                    <div class="clock-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h2>Time Revelation</h2>
                    <p>Discover how you spent your time with MWA.AI</p>
                </div>
                
                <div class="time-breakdown">
                    <div class="time-segment">
                        <div class="segment-bar">
                            <div class="segment-fill" style="width: 40%"></div>
                        </div>
                        <div class="segment-label">Exploration: ${Math.round(totalTime * 0.4 / 1000)}s</div>
                    </div>
                    <div class="time-segment">
                        <div class="segment-bar">
                            <div class="segment-fill" style="width: 35%"></div>
                        </div>
                        <div class="segment-label">Interaction: ${Math.round(totalTime * 0.35 / 1000)}s</div>
                    </div>
                    <div class="time-segment">
                        <div class="segment-bar">
                            <div class="segment-fill" style="width: 25%"></div>
                        </div>
                        <div class="segment-label">Decision: ${Math.round(totalTime * 0.25 / 1000)}s</div>
                    </div>
                </div>
                
                <div class="revelation-insights">
                    <h3>Your Journey Insights</h3>
                    <ul>
                        <li><i class="fas fa-lightbulb"></i> You explored ${globalTimeData.cardSelected || 'multiple'} experience paths</li>
                        <li><i class="fas fa-chart-line"></i> Your engagement shows strong interest in AI automation</li>
                        <li><i class="fas fa-target"></i> Time spent indicates thoughtful consideration</li>
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <button class="primary-btn" onclick="closeTimeRevelation()">
                        <i class="fas fa-forward"></i>
                        Continue to Results
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function closeTimeRevelation(): void {
    const modal = document.querySelector('.time-revelation-modal');
    if (modal) {
        modal.remove();
    }
    
    // Continue to next phase of experience
    console.log('⏭️ Time revelation closed, continuing journey...');
}

// Export current time tracking data
export function getTimeTrackingData(): TimeTrackingData {
    return { ...globalTimeData };
}

// Make functions globally available
(window as any).hideCompletionModal = hideCompletionModal;
(window as any).restartExperience = restartExperience;
(window as any).closeTimeRevelation = closeTimeRevelation;
(window as any).showTimeRevelationModal = showTimeRevelationModal;
