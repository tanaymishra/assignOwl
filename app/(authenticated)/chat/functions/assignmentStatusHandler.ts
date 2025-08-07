import { useSocketStore } from "@/app/socket"
import useAssignmentQuestionnaireStore from "../sections/assignmentQuestionnaire/store/assignMentQuestionare"
import { useMessagesStore } from "../sections/chatMessages/store/store"
export function fetchAssignmentStatus(assignmentId: string) {
    const socket = useSocketStore.getState().socket
    const { update: updateQuestionnaire, reset } = useAssignmentQuestionnaireStore.getState()
    const { update: updateMessages } = useMessagesStore.getState()
    
    console.log(socket, "Socket Check")
    if (!socket || !assignmentId) return

    console.log("Fetching assignment status for ID:", assignmentId)

    // Request assignment status from server
    socket.emit("assignment:description", {
        assignment_id: Number(assignmentId)
    })

    const handleAssignmentDetails = (data: any) => {
        console.log("Assignment details received:", data)

        if (data.success) {
            // Update both stores with assignment data
            Object.keys(data).forEach(key => {
                updateQuestionnaire({ key: key, value: data[key] })
                updateMessages(key as any, data[key])
            })

            // Check if questionnaire is needed
            // If assignment has no description or is new, show questionnaire
            if (!data.description || data.status === 'new') {
                console.log("New assignment detected, showing questionnaire")
                reset()
            }
        }
    }

    // Listen for assignment details (matching the emit event)
    socket.on("assignment:details", handleAssignmentDetails)

    // Return cleanup function
    return () => {
        socket.off("assignment:details", handleAssignmentDetails)
    }
}