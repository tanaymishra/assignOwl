import {create} from 'zustand';
interface AssignmentFormData {
    currentQuesion:number;
    answers: Record<string, string>;
    inputLocked: boolean;
    isLoading: boolean;
    update: (update: {key: string, value: any}) => void;
}
const useAssignmentQuestionnaireStore = create<AssignmentFormData>((set, get) => ({
    currentQuesion: 0,
    answers: {},
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