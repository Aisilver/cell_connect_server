import { DefaultEventsMap, Socket } from "socket.io"
import { WebSocketRoomNameTypes } from "../rooms/types"

export abstract class WebRoomHandler <args = unknown> {
    abstract name: WebSocketRoomNameTypes
    
    abstract onEnter (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, args: args): void
}