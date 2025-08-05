import { useMessagesStore } from "../store/store";
import { useSocketStore } from "@/app/socket";

export function fetchAssignmentDetails() {
    const socket = useSocketStore.getState().socket;
    const { update } = useMessagesStore.getState();

    if (!socket) { return; }

    socket.emit("assignment:description");

    const handleAssignmentDetails = (data: any) => {
        if (data.success) {
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