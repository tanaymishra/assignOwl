import { useSocketStore } from "@/app/socket"
import useAssignmentQuestionnaireStore from "../sections/assignmentQuestionnaire/store/assignMentQuestionare"
export function fetchAssignmentStatus(assignmentId:string) {
    const socket = useSocketStore.getState().socket
    const {update,reset} = useAssignmentQuestionnaireStore.getState()
    console.log(socket,"Socket Check")
    if (!socket || !assignmentId) return

    console.log("Fetching assignment status for ID:", assignmentId)

    // Request assignment status from serveruseAssignmentQuestionnaireStore
    socket.emit("assignment:description", {
        assignment_id: Number(assignmentId)
    })

    const handleAssignmentDetails = (data: any) => {
        console.log("Assignment details received:", data)

        if (data.success) {
            // Update messages store with assignment data
            Object.keys(data).forEach(key => {
                update({key:key,value:data[key]})
            })

            // Check if questionnaire is needed
            // If assignment has no description or is new, show questionnaire
            if (!data.description || data.status === 'new') {
                console.log("New assignment detected, showing questionnaire")
                reset()
            }
        }
    }

    // Listen for assignment details
    socket.on("assignment:details", handleAssignmentDetails)

    // Return cleanup function
    return () => {
        socket.off("assignment:details", handleAssignmentDetails)
    }
}