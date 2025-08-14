// Core types for the MWA.AI application

export type CardType = 'click' | 'type' | 'voice';

export interface FormData {
    industry?: string;
    businessType?: string;
    teamSize?: string;
    currentChallenges?: string[];
    automationGoals?: string[];
    timeline?: string;
    budget?: string;
    contactInfo?: {
        name?: string;
        email?: string;
        phone?: string;
        company?: string;
    };
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface N8NResponse {
    message?: string;
    output?: string;
    context?: any;
}

export interface AudioGlobeConfig {
    canvas: HTMLCanvasElement;
    size: number;
    segments: number;
    rings: number;
    color: string;
    opacity: number;
}

export interface VAPIConfig {
    shareKey: string;
    assistantId: string;
    demo: boolean;
    embed: boolean;
    theme: 'dark' | 'light';
}

export interface TimeTrackingData {
    startTime: number;
    pageLoadTime: number;
    interactionTime?: number;
    completionTime?: number;
    cardSelected?: CardType;
    formCompleted?: boolean;
}
