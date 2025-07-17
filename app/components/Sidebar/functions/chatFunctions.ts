'use client';

import { useSocketStore } from '@/app/socket/socketStore';
import { useRouter } from 'next/navigation';

interface AssignmentCreateResponse {
  success: boolean;
  assignment?: {
    id: number;
    title: string;
    status: string;
    created_at: string;
  };
  conversation?: {
    id: number;
    title: string;
    status: string;
    created_at: string;
  };
  error?: string;
  validation_errors?: Record<string, string>;
}

export const useCreateNewChat = () => {
  const { socket, isConnected } = useSocketStore();
  const router = useRouter();

  const createNewChat = () => {
    if (!socket || !isConnected) {
      console.error('Socket not connected');
      return;
    }

    console.log('Creating new assignment...');
    
    // Emit assignment:create event with empty payload
    socket.emit('assignment:create', {});

    // Listen for the response
    socket.once('assignment:created', (response: AssignmentCreateResponse) => {
      console.log('Assignment create response:', response);

      if (response.success && response.assignment?.id) {
        // Navigate to chat page with the assignment ID
        router.push(`/chat?id=${response.assignment.id}`);
      } else {
        console.error('Failed to create assignment:', response.error);
        // Handle error - could show a toast notification
      }
    });
  };

  return { createNewChat };
};
