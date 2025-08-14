import type { CardType } from '../types';

// N8N Webhook Configuration
const N8N_CONFIG = {
    webhookUrl: 'https://myworkforceagents.app.n8n.cloud/webhook/9b1f2c34-5a67-4d89-8e0f-b2c3d4e5f607',
    timeout: 10000, // 10 seconds
    retryAttempts: 2
};

export function initializeCards(): void {
    console.log('🃏 Initializing Card Experience...');
    
    // Add click handlers to card backs
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const cardBack = card.querySelector('.card-back');
        
        // Click on card back to flip
        cardBack?.addEventListener('click', () => {
            const cardType = (card as HTMLElement).dataset.card as CardType;
            flipCard(cardType);
        });
    });
    
    // Add event listeners for all action buttons
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const button = target.closest('[data-action]') as HTMLElement;
        
        if (!button) return;
        
        const action = button.dataset.action;
        const cardType = button.dataset.card as CardType;
        
        switch(action) {
            case 'flip-back':
                flipCardBack(cardType);
                break;
            case 'select-card':
                selectCard(cardType);
                break;
        }
    });
    
    // Add global functions for HTML onclick handlers
    (window as any).flipCard = flipCard;
    (window as any).flipCardBack = flipCardBack;
    (window as any).selectCard = selectCard;
}

function flipCard(cardType: CardType): void {
    console.log(`🃏 Flipping card: ${cardType}`);
    
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    
    // Add flip animation - only to the game card container
    gameCard?.classList.add('flipped');
    
    // Add sound effect (optional)
    playCardFlipSound();
    
    // Add special effects
    createCardFlipParticles(gameCard as HTMLElement);
}

function flipCardBack(cardType: CardType): void {
    console.log(`🃏 Flipping card back: ${cardType}`);
    
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    
    // Remove flip animation
    gameCard?.classList.remove('flipped');
    
    // Remove selection state
    gameCard?.classList.remove('selected');
    
    // Add sound effect
    playCardFlipSound();
}

function selectCard(cardType: CardType): void {
    console.log(`🃏 Card selected: ${cardType}`);
    
    const gameCard = document.querySelector(`[data-card="${cardType}"]`);
    
    // Add selection state
    gameCard?.classList.add('selected');
    
    // Create dramatic effect
    createCardSelectionEffect(gameCard as HTMLElement);
    
    // Start infinity zoom transition after a brief moment
    setTimeout(() => {
        startInfinityToHourglassTransition(cardType);
    }, 1200);
}

// Enhanced infinity-to-hourglass transition with real estate themed cinematic effects
function startInfinityToHourglassTransition(cardType: CardType): void {
    console.log(`🎯 Starting real estate themed cinematic transition for: ${cardType}`);
    
    // SAFETY: Clean up any existing overlays or states first
    cleanupAllWarpElements();
    
    // Get the hero infinity symbol
    const infinitySymbol = document.querySelector('.hero-infinity-symbol');
    if (!infinitySymbol) {
        console.error('❌ Hero infinity symbol not found');
        return;
    }
    
    // Create real estate themed overlay with enhanced visuals
    const overlay = createRealEstateTransitionOverlay();
    document.body.appendChild(overlay);
    
    // Hide original content and start real estate themed sequence
    hideOriginalContent();
    
    // REAL ESTATE THEMED TRANSITION SEQUENCE
    executeRealEstateTransitionSequence(infinitySymbol, overlay, cardType);
}

function createRealEstateTransitionOverlay(): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'real-estate-transition-overlay';
    overlay.innerHTML = `
        <div class="transition-container">
            <div class="real-estate-elements">
                <!-- House Keys Animation -->
                <div class="house-keys-animation">
                    <div class="key-ring">
                        <div class="key key-1">🗝️</div>
                        <div class="key key-2">🔑</div>
                        <div class="key key-3">🏠</div>
                    </div>
                </div>
                
                <!-- Property Sign -->
                <div class="property-sign">
                    <div class="sign-post"></div>
                    <div class="sign-board">
                        <div class="sign-text">AI TRANSFORMATION</div>
                        <div class="sign-subtext">Ready to Deploy</div>
                    </div>
                </div>
                
                <!-- Blueprint Grid -->
                <div class="blueprint-grid">
                    <div class="grid-line horizontal"></div>
                    <div class="grid-line vertical"></div>
                    <div class="grid-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
                
                <!-- Loading Indicator -->
                <div class="loading-indicator">
                    <div class="loading-spinner"></div>
                    <p class="transition-message">Preparing your AI transformation...</p>
                </div>
            </div>
        </div>
    `;
    
    return overlay;
}

function executeRealEstateTransitionSequence(infinitySymbol: Element, overlay: HTMLElement, cardType: CardType): void {
    console.log('🏠 Executing real estate themed transition...');
    
    // Phase 1: Keys animation (0-1s)
    setTimeout(() => {
        animateHouseKeys();
    }, 100);
    
    // Phase 2: Property sign reveal (1-2s)
    setTimeout(() => {
        animatePropertySign();
    }, 1000);
    
    // Phase 3: Blueprint grid activation (2-3s)
    setTimeout(() => {
        animateBlueprintGrid();
    }, 2000);
    
    // Phase 4: Complete transition (3-4s)
    setTimeout(() => {
        console.log('✨ Transitioning to interface...');
        completeRealEstateTransition(overlay, cardType);
    }, 3000);
}

function animateHouseKeys(): void {
    const keys = document.querySelectorAll('.key');
    const keyRing = document.querySelector('.key-ring');
    
    // Animate key ring entrance
    if (keyRing) {
        (keyRing as HTMLElement).style.animation = 'keyRingFloat 2s ease-out forwards';
    }
    
    // Play key jingling sound effect
    playKeyJinglingSound();
    
    // Stagger key animations
    keys.forEach((key, index) => {
        setTimeout(() => {
            (key as HTMLElement).style.animation = `keySpin ${1.5}s ease-out forwards`;
            (key as HTMLElement).style.transform = `rotateY(${360 * (index + 1)}deg) scale(1.2)`;
        }, index * 300);
    });
}

function animatePropertySign(): void {
    const signPost = document.querySelector('.sign-post');
    const signBoard = document.querySelector('.sign-board');
    const signText = document.querySelector('.sign-text');
    const signSubtext = document.querySelector('.sign-subtext');
    
    // Animate sign post growing from ground
    if (signPost) {
        (signPost as HTMLElement).style.animation = 'signPostGrow 1.5s ease-out forwards';
    }
    
    // Animate sign board appearing
    setTimeout(() => {
        if (signBoard) {
            (signBoard as HTMLElement).style.animation = 'signBoardAppear 1s ease-out forwards';
        }
    }, 500);
    
    // Animate text appearing
    setTimeout(() => {
        if (signText) {
            (signText as HTMLElement).style.animation = 'textTypewriter 1s ease-out forwards';
        }
    }, 1000);
    
    setTimeout(() => {
        if (signSubtext) {
            (signSubtext as HTMLElement).style.animation = 'textTypewriter 0.8s ease-out forwards';
        }
    }, 1500);
}

function animateBlueprintGrid(): void {
    const gridLines = document.querySelectorAll('.grid-line');
    const dots = document.querySelectorAll('.dot');
    
    // Animate grid lines drawing
    gridLines.forEach((line, index) => {
        setTimeout(() => {
            (line as HTMLElement).style.animation = 'gridLineDraw 1s ease-out forwards';
        }, index * 200);
    });
    
    // Animate dots appearing
    dots.forEach((dot, index) => {
        setTimeout(() => {
            (dot as HTMLElement).style.animation = 'dotPulse 0.5s ease-out forwards';
        }, 800 + index * 100);
    });
}

function completeRealEstateTransition(overlay: HTMLElement, cardType: CardType): void {
    // Add completion effect
    const loadingSpinner = overlay.querySelector('.loading-spinner');
    const transitionMessage = overlay.querySelector('.transition-message');
    
    if (loadingSpinner) {
        (loadingSpinner as HTMLElement).style.animation = 'spinnerComplete 0.5s ease-out forwards';
    }
    if (transitionMessage) {
        transitionMessage.textContent = 'AI System Ready!';
        (transitionMessage as HTMLElement).style.animation = 'textGlow 0.5s ease-out forwards';
    }
    
    // Complete transition after brief pause
    setTimeout(() => {
        navigateToFormInterface(cardType, overlay);
    }, 800);
}

function navigateToFormInterface(cardType: CardType, overlay: HTMLElement): void {
    // Remove warp overlay
    overlay.style.transition = 'opacity 1s ease-out';
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        overlay.remove();
        
        // Restore background but keep it dimmed
        restoreBackgroundForForm();
        
        // Create and show the specific form interface
        createFormInterface(cardType);
        
        // Note: Global time tracking already started on page load
        
    }, 1000);
}

function restoreBackgroundForForm(): void {
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const meetSection = document.querySelector('#meet-section');
    const aiStorySection = document.querySelector('#ai-story');
    const resultsSection = document.querySelector('.results-section');
    const formSection = document.querySelector('.form-section');
    const finalCta = document.querySelector('.final-cta');
    
    const elementsToRestore = [hero, navbar, footer, meetSection, aiStorySection, resultsSection, formSection, finalCta];
    
    elementsToRestore.forEach(element => {
        if (element) {
            (element as HTMLElement).style.transition = 'filter 1s ease-out, opacity 1s ease-out';
            (element as HTMLElement).style.filter = 'blur(3px)';
            (element as HTMLElement).style.opacity = '0.1';
        }
    });
}

function createFormInterface(cardType: CardType): void {
    const formInterface = document.createElement('div');
    formInterface.className = `form-interface ${cardType}-interface`;
    formInterface.id = 'activeFormInterface';
    
    switch(cardType) {
        case 'click':
            formInterface.innerHTML = createClickInterface();
            break;
        case 'type':
            formInterface.innerHTML = createTypeInterface();
            break;
        case 'voice':
            formInterface.innerHTML = createVoiceInterface();
            break;
    }
    
    document.body.appendChild(formInterface);
    
    // Animate interface entrance
    setTimeout(() => {
        formInterface.classList.add('interface-active');
        initializeFormInterface(cardType);
    }, 100);
}

function createClickInterface(): string {
    return `
        <div class="click-form-container">
            <div class="form-header">
                <div class="form-title">
                    <div class="click-icon"><i class="fas fa-mouse-pointer"></i></div>
                    <h2>Interactive Experience Setup</h2>
                    <p>Configure your AI workflow through visual selection</p>
                </div>
            </div>
            
            <div class="visual-form-grid">
                <div class="step-number">01</div>
                <!-- Step 1: Industry Selection -->
                <div class="form-step active" data-step="1">
                    <div class="step-header">
                        <h3>Select Your Industry</h3>
                    </div>
                    <div class="visual-dropdown" data-field="industry">
                        <div class="dropdown-trigger">
                            <span class="selected-text">Choose your real estate focus</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="dropdown-options">
                            <div class="option" data-value="residential-sales"><i class="fas fa-home"></i> Residential Sales</div>
                            <div class="option" data-value="commercial-real-estate"><i class="fas fa-building"></i> Commercial Real Estate</div>
                            <div class="option" data-value="property-management"><i class="fas fa-tools"></i> Property Management</div>
                            <div class="option" data-value="real-estate-investment"><i class="fas fa-chart-line"></i> Real Estate Investment</div>
                            <div class="option" data-value="luxury-real-estate"><i class="fas fa-crown"></i> Luxury Real Estate</div>
                            <div class="option" data-value="new-construction"><i class="fas fa-hammer"></i> New Construction</div>
                        </div>
                    </div>
                </div>
                
                <!-- Additional steps would go here -->
            </div>
            
            <div class="form-navigation">
                <button class="nav-btn prev-btn" onclick="previousStep()" disabled>
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <div class="step-indicator">
                    <span class="current-step">1</span> / <span class="total-steps">4</span>
                </div>
                <button class="nav-btn next-btn" onclick="nextStep()">
                    Next <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

function createTypeInterface(): string {
    return `
        <div class="type-form-container">
            <div class="chat-interface">
                <div class="chat-header">
                    <div class="ai-avatar">
                        <div class="avatar-pulse"></div>
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <div class="chat-info">
                        <h3>MWA.AI Assistant</h3>
                        <span class="status">Ready to help</span>
                    </div>
                    <div class="chat-controls">
                        <button class="minimize-btn"><i class="fas fa-minus"></i></button>
                        <button class="close-btn" onclick="closeFormInterface()"><i class="fas fa-times"></i></button>
                    </div>
                </div>
                
                <div class="chat-messages" id="chatMessages">
                    <div class="message ai-message">
                        <div class="message-avatar">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <div class="message-content">
                            <div class="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-area">
                    <div class="input-container">
                        <input type="text" id="chatInput" placeholder="Type your message..." disabled>
                        <button class="send-btn" id="sendBtn" disabled>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="suggestions" id="chatSuggestions">
                        <button class="suggestion">Tell me about your services</button>
                        <button class="suggestion">How does AI automation work?</button>
                        <button class="suggestion">What industries do you serve?</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createVoiceInterface(): string {
    return `
        <div class="voice-form-container">
            <div class="voice-interface">
                <div class="voice-header">
                    <h2>Voice AI Assistant</h2>
                    <p>Speak naturally with our AI-powered voice agent</p>
                </div>
                
                <div class="voice-layout">
                    <div class="vapi-voice-panel">
                        <div class="voice-controls">
                            <div class="voice-status">
                                <div class="status-indicator">
                                    <div class="status-dot"></div>
                                    <span>Voice Agent Ready</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Side-by-Side Voice AI Interface -->
                        <div class="side-by-side-voice-interface" id="voiceInterface">
                            <div class="voice-interface-header">
                                <h3>AI Voice Assistant</h3>
                                <p>Interactive voice AI with real-time 3D globe visualization</p>
                            </div>
                            
                            <!-- Side-by-side container -->
                            <div class="voice-interface-grid">
                                <!-- 3D Globe Visualizer -->
                                <div class="globe-visualizer-panel">
                                    <div class="visualizer-header">
                                        <h4><i class="fas fa-globe"></i> Audio Globe</h4>
                                        <p>Watch the globe react to conversation</p>
                                    </div>
                                    <div class="globe-canvas-container">
                                        <canvas id="threejs-canvas"></canvas>
                                    </div>
                                    <div class="globe-controls">
                                        <button class="globe-btn active" id="toggleGlobeBtn" onclick="toggleAudioGlobe()">
                                            <i class="fas fa-stop"></i>
                                            <span>Stop Globe</span>
                                        </button>
                                        <p class="globe-info">Wave effects responding to audio</p>
                                    </div>
                                </div>
                                
                                <!-- VAPI Interface Panel -->
                                <div class="vapi-interface-panel">
                                    <div class="vapi-header">
                                        <h4><i class="fas fa-robot"></i> Voice AI Agent</h4>
                                        <p>Click to interact with the AI assistant</p>
                                    </div>
                                    <div class="vapi-container">
                                        <!-- VAPI iframe will be embedded here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function initializeFormInterface(cardType: CardType): Promise<void> {
    console.log(`🎯 Initializing ${cardType} interface...`);
    
    switch(cardType) {
        case 'click':
            initializeClickInterface();
            break;
        case 'type':
            initializeTypeInterface();
            break;
        case 'voice':
            await initializeVoiceInterface();
            break;
    }
}

function initializeClickInterface(): void {
    // Reset to step 1 and ensure proper initial state
    (window as any).currentStep = 1;
    
    // Hide all steps except the first one
    const allSteps = document.querySelectorAll('.form-step');
    allSteps.forEach((step, index) => {
        if (index === 0) {
            step.classList.add('active');
            (step as HTMLElement).style.visibility = 'visible';
            (step as HTMLElement).style.opacity = '1';
            (step as HTMLElement).style.zIndex = '10';
        } else {
            step.classList.remove('active');
            (step as HTMLElement).style.visibility = 'hidden';
            (step as HTMLElement).style.opacity = '0';
            (step as HTMLElement).style.zIndex = '1';
        }
    });
    
    // Initialize dropdown interactions
    const dropdowns = document.querySelectorAll('.visual-dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const options = dropdown.querySelector('.dropdown-options');
        
        trigger?.addEventListener('click', () => {
            // Close all other dropdowns first
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });
        
        options?.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => {
                const text = option.textContent;
                const value = (option as HTMLElement).dataset.value;
                
                const selectedText = dropdown.querySelector('.selected-text');
                if (selectedText && text) {
                    selectedText.textContent = text;
                }
                dropdown.classList.remove('open');
                if (value) {
                    (dropdown as HTMLElement).dataset.selected = value;
                }
                
                // Auto-advance to next step
                setTimeout(() => (window as any).nextStep(), 500);
            });
        });
    });
}

function initializeTypeInterface(): void {
    // Simulate AI initialization
    setTimeout(() => {
        showAIMessage("Hello! I'm your AI assistant. I'm here to help you set up your AI transformation journey. What would you like to know about our services?");
        enableChatInput();
    }, 2000);
}

async function initializeVoiceInterface(): Promise<void> {
    console.log('🎤 Initializing Voice Interface (called from card selection)...');
    
    // Initialize our proper voice interface with 3D globe and VAPI
    console.log('🚀 Calling initVoiceInterface for full setup...');
    (window as any).initVoiceInterface();
    
    // Setup VAPI interface
    setTimeout(() => {
        setupVAPIInterface();
    }, 1000);
    
    console.log('✅ Voice interface initialization completed');
}

// Chat functions for type interface
function showAIMessage(message: string): void {
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.querySelector('.typing-indicator');
    
    // Remove typing indicator
    if (typingIndicator) {
        typingIndicator.parentElement?.parentElement?.remove();
    }
    
    // Create AI message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-tie"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages?.appendChild(messageDiv);
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function enableChatInput(): void {
    const chatInput = document.getElementById('chatInput') as HTMLInputElement;
    const sendBtn = document.getElementById('sendBtn') as HTMLButtonElement;
    const suggestions = document.querySelectorAll('.suggestion');
    
    if (chatInput) chatInput.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    
    // Handle input
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    sendBtn?.addEventListener('click', sendMessage);
    
    // Handle suggestions
    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            if (chatInput) {
                chatInput.value = suggestion.textContent || '';
                sendMessage();
            }
        });
    });
}

function sendMessage(): void {
    const chatInput = document.getElementById('chatInput') as HTMLInputElement;
    const message = chatInput?.value.trim();
    
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send message to N8N workflow
    sendMessageToN8N(message);
}

function addUserMessage(message: string): void {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
    `;
    
    chatMessages?.appendChild(messageDiv);
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function showTypingIndicator(): void {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-tie"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages?.appendChild(typingDiv);
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Send message to N8N workflow
async function sendMessageToN8N(userMessage: string): Promise<void> {
    const sessionId = getOrCreateSessionId();
    const timestamp = new Date().toISOString();
    
    const payload = {
        message: userMessage,
        sessionId: sessionId,
        timestamp: timestamp,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        chatContext: getChatContext()
    };
    
    try {
        const response = await fetch(N8N_CONFIG.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Chat-Source': 'MWA-AI-Landing-Page'
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(N8N_CONFIG.timeout)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle successful response - support multiple N8N output formats
        let aiMessage = null;
        
        if (data.message) {
            // Standard format: { message: "text" }
            aiMessage = data.message;
        } else if (Array.isArray(data) && data.length > 0 && data[0].output) {
            // N8N array format: [{ output: "text" }]
            aiMessage = data[0].output;
        } else if (data.output) {
            // Direct output format: { output: "text" }
            aiMessage = data.output;
        }
        
        if (aiMessage) {
            showAIMessage(aiMessage);
        } else {
            throw new Error('No valid message found in response');
        }
        
        // Store conversation context if provided
        if (data.context) {
            updateChatContext(data.context);
        }
        
    } catch (error) {
        console.error('N8N webhook error:', error);
        handleChatError(error as Error, userMessage);
    }
}

// Generate or retrieve session ID for conversation continuity
function getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('mwa-ai-session-id');
    if (!sessionId) {
        sessionId = 'mwa-ai-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('mwa-ai-session-id', sessionId);
    }
    return sessionId;
}

// Get current chat context for continuity
function getChatContext(): Array<{role: string; content: string; timestamp: string}> {
    const chatMessages = document.getElementById('chatMessages');
    const messages: Array<{role: string; content: string; timestamp: string}> = [];
    
    // Get last 5 messages for context
    const messageElements = chatMessages?.querySelectorAll('.message');
    if (messageElements) {
        const recentMessages = Array.from(messageElements).slice(-5);
        
        recentMessages.forEach(messageEl => {
            const isUser = messageEl.classList.contains('user-message');
            const content = messageEl.querySelector('.message-content p')?.textContent || '';
            
            if (content && !content.includes('typing-indicator')) {
                messages.push({
                    role: isUser ? 'user' : 'assistant',
                    content: content,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }
    
    return messages;
}

// Update chat context from N8N response
function updateChatContext(context: any): void {
    // Store context for next message
    sessionStorage.setItem('mwa-ai-chat-context', JSON.stringify(context));
}

// Handle chat errors with fallback responses
function handleChatError(error: Error, userMessage: string): void {
    console.error('Chat error details:', error);
    
    // Remove typing indicator
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.parentElement?.parentElement?.remove();
    }
    
    // Show error message or fallback response
    const fallbackResponse = getFallbackResponse(userMessage);
    showAIMessage(fallbackResponse);
    
    // Optionally show a subtle error indicator
    showErrorIndicator();
}

// Fallback responses when N8N is unavailable
function getFallbackResponse(userMessage: string): string {
    const fallbacks = {
        'services': "I'd love to tell you about our AI automation services! However, I'm experiencing a brief connection issue. Could you please try refreshing the page or contact us directly?",
        'pricing': "I have detailed pricing information to share with you! There seems to be a temporary connectivity issue. Please try again in a moment or reach out to our team directly.",
        'default': "Thanks for your message! I'm experiencing a brief technical issue, but I'd still love to help you. Please try refreshing the page or contact our team directly at your convenience."
    };
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
        return fallbacks.services;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        return fallbacks.pricing;
    } else {
        return fallbacks.default;
    }
}

// Show subtle error indicator
function showErrorIndicator(): void {
    const chatHeader = document.querySelector('.chat-info .status');
    if (chatHeader) {
        const originalText = chatHeader.textContent;
        chatHeader.textContent = 'Reconnecting...';
        (chatHeader as HTMLElement).style.color = '#ff6b35';
        
        setTimeout(() => {
            if (chatHeader && originalText) {
                chatHeader.textContent = originalText;
                (chatHeader as HTMLElement).style.color = '';
            }
        }, 3000);
    }
}

function setupVAPIInterface(): void {
    console.log('📞 Starting VAPI iframe embedding setup...');
    
    const container = document.querySelector('.vapi-container');
    
    if (!container) {
        console.error('❌ VAPI container (.vapi-container) not found');
        return;
    }
    
    console.log('✅ VAPI container found, setting up embedded iframe...');
    
    // Create iframe for VAPI demo
    const iframe = document.createElement('iframe');
    iframe.id = 'vapiEmbeddedFrame';
    iframe.src = 'https://vapi.ai?demo=true&shareKey=e84ab93f-6b83-4994-9e1a-1ab3cda12a23&assistantId=518c4706-c417-4d19-9e2d-9b2171b0cf9f&embed=true&theme=dark';
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 10px;
        background: transparent;
    `;
    iframe.allow = 'microphone; camera; autoplay; clipboard-write; encrypted-media; fullscreen';
    iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-microphone allow-camera allow-autoplay';
    
    // Clear container and add iframe directly
    container.innerHTML = '';
    container.appendChild(iframe);
    
    console.log('✅ VAPI iframe embedding setup complete');
}

// Utility functions
function hideOriginalContent(): void {
    // Smoothly hide hero content and apply blur to background elements only
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const meetSection = document.querySelector('#meet-section');
    const aiStorySection = document.querySelector('#ai-story');
    const resultsSection = document.querySelector('.results-section');
    const formSection = document.querySelector('.form-section');
    const finalCta = document.querySelector('.final-cta');
    
    // List of elements to blur (everything except the warp overlay)
    const elementsToBlur = [hero, navbar, footer, meetSection, aiStorySection, resultsSection, formSection, finalCta];
    
    elementsToBlur.forEach(element => {
        if (element) {
            // Use will-change for performance and clean transitions
            (element as HTMLElement).style.willChange = 'filter, opacity';
            (element as HTMLElement).style.transition = 'filter 1s ease-out, opacity 1s ease-out';
            (element as HTMLElement).style.filter = 'blur(8px)';
            (element as HTMLElement).style.opacity = '0.3';
        }
    });
}

function cleanupAllWarpElements(): void {
    // Remove any remaining warp or form elements
    const elementsToRemove = [
        '.cinematic-warp-overlay',
        '.real-estate-transition-overlay',
        '.form-interface',
        '.form-completion-modal',
        '.hourglass-timer'
    ];
    
    elementsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => element.remove());
    });
    
    // Restore ALL page elements to original state
    restoreOriginalPageState();
}

function restoreOriginalPageState(): void {
    // Get ALL main page elements
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const meetSection = document.querySelector('#meet-section');
    const aiStorySection = document.querySelector('#ai-story');
    const resultsSection = document.querySelector('.results-section');
    const formSection = document.querySelector('.form-section');
    const finalCta = document.querySelector('.final-cta');
    const main = document.querySelector('main');
    const body = document.body;
    
    const allElements = [hero, navbar, footer, meetSection, aiStorySection, resultsSection, formSection, finalCta, main, body];
    
    // Reset ALL styles to original state
    allElements.forEach(element => {
        if (element) {
            // Complete style reset - remove ALL possible inline styles
            const htmlElement = element as HTMLElement;
            htmlElement.style.filter = '';
            htmlElement.style.opacity = '';
            htmlElement.style.transform = '';
            htmlElement.style.transition = '';
            htmlElement.style.background = '';
            htmlElement.style.backgroundColor = '';
            htmlElement.style.backdropFilter = '';
            htmlElement.style.willChange = '';
            htmlElement.style.zIndex = '';
            htmlElement.style.position = '';
            htmlElement.style.visibility = '';
            htmlElement.style.display = '';
            htmlElement.style.pointerEvents = '';
            
            // Force a repaint to ensure styles are cleared
            htmlElement.offsetHeight;
        }
    });
    
    console.log('🧹 Page state fully restored - all styles cleared');
}

function createCardFlipParticles(container: HTMLElement): void {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'flip-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            animation: particleExplode 1s ease-out forwards;
            left: 50%;
            top: 50%;
            z-index: 1000;
        `;
        
        const angle = (i / 8) * 360;
        particle.style.animationDelay = `${i * 0.1}s`;
        particle.style.setProperty('--angle', `${angle}deg`);
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

function createCardSelectionEffect(container: HTMLElement): void {
    // Create glowing ring effect
    const ring = document.createElement('div');
    ring.className = 'selection-ring';
    ring.style.cssText = `
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border: 3px solid var(--accent-color);
        border-radius: 25px;
        animation: selectionPulse 2s ease-in-out infinite;
        pointer-events: none;
        z-index: 5;
    `;
    
    container.appendChild(ring);
    
    setTimeout(() => {
        if (ring.parentNode) {
            ring.parentNode.removeChild(ring);
        }
    }, 2000);
}

function playCardFlipSound(): void {
    // Create audio context for card flip sound effect
    if (typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined') {
        try {
            const audioContext = new (AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Silent fail if audio context not supported
        }
    }
}

function playKeyJinglingSound(): void {
    // Create audio context for key jingling sound effect
    if (typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined') {
        try {
            const audioContext = new (AudioContext || (window as any).webkitAudioContext)();
            
            // Create multiple oscillators for jingling effect
            for (let i = 0; i < 3; i++) {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Different frequencies for each key
                const baseFreq = 600 + (i * 200);
                oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, audioContext.currentTime + 0.2);
                
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime + (i * 0.1));
                oscillator.stop(audioContext.currentTime + 0.2 + (i * 0.1));
            }
        } catch (error) {
            // Silent fail if audio context not supported
        }
    }
}

// Make functions globally available for HTML onclick handlers
(window as any).closeFormInterface = function() {
    const formInterface = document.getElementById('activeFormInterface');
    if (formInterface) {
        formInterface.classList.remove('interface-active');
        
        setTimeout(() => {
            // Complete cleanup of everything
            cleanupAllWarpElements();
        }, 500);
    } else {
        // If no form interface found, still do cleanup
        cleanupAllWarpElements();
    }
};
