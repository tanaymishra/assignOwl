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
    answers: Record<string, string>;
    messages: Message[];
    inputLocked: boolean;
    isLoading: boolean;
    update: (update: {key: string, value: any}) => void;
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
    update: ({key, value}) => {
        set((state) => ({
            ...state,
            [key]: value
        }));
    }
}));

export default useAssignmentQuestionnaireStore;