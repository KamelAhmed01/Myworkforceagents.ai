export class VapiService {
  private apiKey: string;
  private assistantId: string;
  private isInitialized: boolean = false;

  constructor() {
    this.apiKey = import.meta.env.VITE_VAPI_PUBLIC_KEY || '';
    this.assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || '';
    
    if (!this.apiKey) {
      console.warn('🎙️ VAPI API key not found in environment variables');
    }
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log('🎙️ Initializing VAPI Service...');
      
      // Load VAPI SDK dynamically
      await this.loadVapiSDK();
      
      this.isInitialized = true;
      console.log('✅ VAPI Service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize VAPI Service:', error);
    }
  }

  private async loadVapiSDK(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if VAPI is already loaded
      if ((window as any).Vapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
      script.async = true;
      
      script.onload = () => {
        console.log('📦 VAPI SDK loaded successfully');
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load VAPI SDK'));
      };
      
      document.head.appendChild(script);
    });
  }

  async startCall(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.apiKey || !this.assistantId) {
      console.error('❌ VAPI configuration incomplete');
      return;
    }

    try {
      console.log('📞 Starting VAPI call...');
      
      const Vapi = (window as any).Vapi;
      
      if (!Vapi) {
        throw new Error('VAPI SDK not loaded');
      }

      const vapi = new Vapi(this.apiKey);
      
      await vapi.start({
        assistantId: this.assistantId,
        transcriber: {
          provider: 'deepgram',
          model: 'nova-2',
          language: 'en-US'
        }
      });
      
      console.log('✅ VAPI call started successfully');
    } catch (error) {
      console.error('❌ Failed to start VAPI call:', error);
    }
  }

  async endCall(): Promise<void> {
    try {
      const Vapi = (window as any).Vapi;
      
      if (Vapi && (window as any).vapiInstance) {
        await (window as any).vapiInstance.stop();
        console.log('📵 VAPI call ended');
      }
    } catch (error) {
      console.error('❌ Failed to end VAPI call:', error);
    }
  }

  isAvailable(): boolean {
    return this.isInitialized && !!this.apiKey && !!this.assistantId;
  }

  getStatus(): string {
    if (!this.apiKey) return 'Missing API key';
    if (!this.assistantId) return 'Missing Assistant ID';
    if (!this.isInitialized) return 'Not initialized';
    return 'Ready';
  }
}

// Initialize voice interface functions for backwards compatibility
export function initVoiceInterface(): void {
  console.log('🎙️ Initializing Voice Interface...');
  
  const vapiService = new VapiService();
  
  // Make globally available
  (window as any).vapiService = vapiService;
  (window as any).startVoiceCall = () => vapiService.startCall();
  (window as any).endVoiceCall = () => vapiService.endCall();
  
  // Initialize the service
  vapiService.initialize().catch(error => {
    console.error('❌ Voice interface initialization failed:', error);
  });
}
