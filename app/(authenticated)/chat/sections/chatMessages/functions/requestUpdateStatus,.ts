import { useMessagesStore } from "../store/store";
import { useSocketStore } from "@/app/socket";

export function fetchAssignmentDetails(assignmentId:string | null) {
    const socket = useSocketStore.getState().socket;
    const { update } = useMessagesStore.getState();

    if (!socket || !assignmentId) { return; }
    socket.emit("assignment:description",{
        assignment_id :Number(assignmentId)
    });

    const handleAssignmentDetails = (data: any) => {
        console.log("Fucntion call",data)
        if (data.success) {
            console.log("Data true")
            // Save all the data to the store
            Object.keys(data).forEach(key => {
                update(key as any, data[key]);
            });
        }
    };

    socket.on("assignment:details", handleAssignmentDetails);

    // Return cleanup function to remove the event listener
    return () => {
        socket.off("assignment:details", handleAssignmentDetails);
    };
}