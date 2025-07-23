import { useSocketStore } from '@/app/socket/socketStore';

interface AssignmentMessage {
  questionId: string;
  answer: any;
}

interface AssignmentStatusResponse {
  success: boolean;
  assignment?: {
    id: number;
    title: string;
    status: string;
    current_question_index: number;
    previous_messages: AssignmentMessage[];
    total_questions: number;
    created_at: string;
    updated_at: string;
  };
  error?: string;
}

interface AssignmentStatusService {
  fetchAssignmentStatus: (assignmentId: number, socket?: any, isConnected?: boolean) => Promise<AssignmentStatusResponse>;
  onStatusUpdate: (callback: (response: AssignmentStatusResponse) => void) => void;
  removeStatusListener: () => void;
}

class AssignmentStatusServiceImpl implements AssignmentStatusService {
  private statusCallback: ((response: AssignmentStatusResponse) => void) | null = null;

  private getSocket() {
    return useSocketStore.getState().socket;
  }

  private isConnected() {
    return useSocketStore.getState().isConnected;
  }

  fetchAssignmentStatus(assignmentId: number, socket?: any, isConnected?: boolean): Promise<AssignmentStatusResponse> {
    return new Promise((resolve, reject) => {
      // Early guard clause - fundamental check
      if (!socket) {
        console.log('No socket provided to fetchAssignmentStatus');
        reject(new Error('No socket provided'));
        return;
      }
      
      // Use passed parameters or fallback to store
      const currentSocket = socket || this.getSocket();
      const currentIsConnected = isConnected !== undefined ? isConnected : this.isConnected();

      if (!currentSocket || !currentIsConnected) {
        console.log('Socket not connected in fetchAssignmentStatus');
        reject(new Error('Socket not connected'));
        return;
      }

      // Set up one-time listener for this specific request
      const timeout = setTimeout(() => {
        currentSocket.off('assignment:status_update', handleResponse);
        reject(new Error('Request timeout'));
      }, 10000); // 10 second timeout

      const handleResponse = (response: AssignmentStatusResponse) => {
        clearTimeout(timeout);
        currentSocket.off('assignment:status_update', handleResponse);
        resolve(response);
      };

      // Listen for response
      currentSocket.on('assignment:status_update', handleResponse);

      // Send request
      currentSocket.emit('assignment:status', { assignment_id: assignmentId });
    });
  }

  onStatusUpdate(callback: (response: AssignmentStatusResponse) => void) {
    this.statusCallback = callback;
    const socket = this.getSocket();

    if (socket) {
      socket.on('assignment:status_update', callback);
    }
  }

  removeStatusListener() {
    const socket = this.getSocket();

    if (socket && this.statusCallback) {
      socket.off('assignment:status_update', this.statusCallback);
    }

    this.statusCallback = null;
  }
}

// Create singleton instance
export const assignmentStatusService = new AssignmentStatusServiceImpl();

// Helper function to restore questionnaire state
export const restoreQuestionnaireState = (response: AssignmentStatusResponse) => {
  if (!response.success || !response.assignment) {
    throw new Error(response.error || 'Failed to fetch assignment status');
  }

  const { current_question_index, previous_messages } = response.assignment;

  // Convert previous messages to answers format
  const restoredAnswers: Record<string, any> = {};
  const restoredMessages: Array<{
    id: string;
    type: 'bot' | 'user';
    text: string;
    timestamp: Date;
  }> = [];

  // Process previous messages
  previous_messages.forEach(({ questionId, answer }, index) => {
    restoredAnswers[questionId] = answer;

    // Add bot question message (you'll need to import questions here)
    // For now, we'll handle this in the component

    // Add user answer message
    let displayAnswer = answer;
    if (Array.isArray(answer)) {
      displayAnswer = `📎 ${answer.length} file${answer.length > 1 ? 's' : ''} uploaded`;
    } else if (typeof answer === 'boolean') {
      displayAnswer = answer ? 'Yes' : 'No';
    }

    restoredMessages.push({
      id: `restored_user_${index}`,
      type: 'user',
      text: displayAnswer,
      timestamp: new Date(response.assignment!.updated_at)
    });
  });

  return {
    currentQuestionIndex: current_question_index,
    restoredAnswers,
    restoredMessages,
    isCompleted: current_question_index >= response.assignment.total_questions
  };
};

// Assignment update functionality
interface AssignmentUpdateResponse {
  success: boolean;
  assignment?: {
    id: number;
    updated_fields: string[];
    updated_at: string;
  };
  error?: string;
  validation_errors?: Record<string, string>;
}

// Field mapping from question IDs to database fields
export const questionToFieldMap: Record<string, string> = {
  'assignmentType': 'assignment_type',
  'subject': 'subject',
  'course': 'course',
  'level': 'level',
  'referencingStyle': 'referencing_style',
  'numberOfReferences': 'number_of_references',
  'sampleAssignment': 'sample_assignments',
  'lectureNotes': 'lecture_notes',
  'wordCount': 'word_count',
  'lineSpacing': 'line_spacing',
  'fontStyle': 'font_style',
  'fontSize': 'font_size',
  'includeDiagrams': 'include_diagrams_pictures',
  'otherInstructions': 'special_instructions'
};

// Assignment update service
export const updateAssignmentField = (
  assignmentId: number,
  questionId: string,
  answer: any,
  socket?: any,
  isConnected?: boolean
): Promise<AssignmentUpdateResponse> => {
  return new Promise((resolve, reject) => {
    // Early guard clause - fundamental check
    if (!socket) {
      console.log('No socket provided to updateAssignmentField');
      reject(new Error('No socket provided'));
      return;
    }
    
    // Use passed parameters or fallback to store
    const currentSocket = socket || useSocketStore.getState().socket;
    const currentIsConnected = isConnected !== undefined ? isConnected : useSocketStore.getState().isConnected;

    if (!currentSocket || !currentIsConnected) {
      console.log('Socket not connected in updateAssignmentField');
      reject(new Error('Socket not connected'));
      return;
    }

    const dbField = questionToFieldMap[questionId];
    if (!dbField) {
      reject(new Error(`Unknown question ID: ${questionId}`));
      return;
    }

    // Set up one-time listener for this specific request
    const timeout = setTimeout(() => {
      currentSocket.off('assignment:updated', handleResponse);
      reject(new Error('Update request timeout'));
    }, 10000); // 10 second timeout

    const handleResponse = (response: AssignmentUpdateResponse) => {
      clearTimeout(timeout);
      currentSocket.off('assignment:updated', handleResponse);
      resolve(response);
    };

    // Listen for response
    currentSocket.on('assignment:updated', handleResponse);

    // Prepare the update data
    let updateValue = answer;

    // Handle special cases for different field types
    if (questionId === 'numberOfReferences' || questionId === 'wordCount' || questionId === 'fontSize') {
      updateValue = parseInt(answer) || 0;
    } else if (questionId === 'includeDiagrams') {
      updateValue = Boolean(answer);
    } else if (questionId === 'sampleAssignment' || questionId === 'lectureNotes') {
      // File fields should be arrays
      updateValue = Array.isArray(answer) ? answer : (answer ? [answer] : []);
    }

    // Send update request
    currentSocket.emit('assignment:update', {
      assignment_id: assignmentId,
      updates: {
        [dbField]: updateValue
      }
    });
  });
};

// Question ID mapping for reference
export const questionIds = [
  'assignmentType',     // 0
  'subject',           // 1
  'course',            // 2
  'level',             // 3
  'referencingStyle',  // 4
  'numberOfReferences', // 5
  'sampleAssignment',  // 6
  'lectureNotes',      // 7
  'wordCount',         // 8
  'lineSpacing',       // 9
  'fontStyle',         // 10
  'fontSize',          // 11
  'includeDiagrams',   // 12
  'otherInstructions'  // 13
];