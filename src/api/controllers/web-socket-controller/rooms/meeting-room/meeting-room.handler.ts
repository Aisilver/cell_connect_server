import { Socket, DefaultEventsMap } from "socket.io";
import { WebRoomHandler } from "../../classes/web-room-handler.class";


class MeetingRoomWebSocketHandler extends WebRoomHandler<any> {
    name: "meeting";

    onEnter(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, args: any): void {
        socket.emit("hello", "i am here")
    }

}

export const MeetingRoomHandler = new MeetingRoomWebSocketHandler()