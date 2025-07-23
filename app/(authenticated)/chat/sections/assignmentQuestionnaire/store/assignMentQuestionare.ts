import {create} from 'zustand';
import { questions } from '../questions';

interface Message {
    id: string;
    type: 'bot' | 'user';
    text: string;
    timestamp: Date;
}

interface AssignmentFormData {
    currentQuesion:number;
    answers: Record<string, any>;
    messages: Message[];
    inputLocked: boolean;
    isLoading: boolean;
    isInitialized: boolean;
    update: (update: {key: string, value: any}) => void;
    reset: () => void;
    initializeFromStatus: (currentQuestionIndex: number, answers: Record<string, any>, messages: Message[]) => void;
}
const useAssignmentQuestionnaireStore = create<AssignmentFormData>((set, get) => ({
    currentQuesion: 0,
    answers: {},
    messages: [
        {
            id: '1',
            type: 'bot',
            text: questions[0]?.text || 'Loading...',
            timestamp: new Date()
        }
    ],
    inputLocked: false,
    isLoading: false,
    isInitialized: false,
    update: ({key, value}) => {
        set((state) => ({
            ...state,
            [key]: value
        }));
    },
    reset: () => {
        set({
            currentQuesion: 0,
            answers: {},
            messages: [
                {
                    id: '1',
                    type: 'bot',
                    text: questions[0]?.text || 'Loading...',
                    timestamp: new Date()
                }
            ],
            inputLocked: false,
            isLoading: false,
            isInitialized: false
        });
    },
    initializeFromStatus: (currentQuestionIndex: number, answers: Record<string, any>, messages: Message[]) => {
        set({
            currentQuesion: currentQuestionIndex,
            answers,
            messages,
            inputLocked: false,
            isLoading: false,
            isInitialized: true
        });
    }
}));

export default useAssignmentQuestionnaireStore;