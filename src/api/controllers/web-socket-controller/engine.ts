import { Server, Socket } from "socket.io"
import { Engine } from "../../../classes/engine/engine.class"
import { config } from "dotenv"
import { MeetingRoomHandler } from "./rooms/meeting-room/meeting-room.handler"
import { WebRoomHandler } from "./classes/web-room-handler.class"
import Joi from "joi"
import { JWTConfigurator } from "../../classes/jwt-configurator.class"

config()

const { MAIN_DOMAIN_ORIGIN_URL } = process.env

class WebSockectCTRLEngine extends Engine {
    private declare SocketIO: Server 

    private jwtConfig = new JWTConfigurator()

    private rooms: WebRoomHandler[] = [
        MeetingRoomHandler
    ]

    BeforeInitialise(): void | Promise<void> {
        this.SocketIO = new Server(this.server, {
            cors: {
                origin: MAIN_DOMAIN_ORIGIN_URL,
                credentials: true
            }
        })

        this.SocketIO.use(async (socket, next) => {
            try {
                await this.clientAuthentication(socket)

                next()
            } catch (err: any) {
                next(err)
            }
        })
    }
 
    AfterInitialise(): void | Promise<void> {

        this.SocketIO.on("connection", (socket) => { 

            for (const roomHandler of this.rooms) {
                const {name} = roomHandler

                socket.on(name, args => roomHandler.onEnter(socket, args))
            }

            socket.emit("connection", "connected")
        })
    }

    private async clientAuthentication (socket: Socket) {
        const {value: token, error: tokenValErr} = Joi.string().not('').required().validate(socket.handshake.auth.token)

        console.log(token, tokenValErr)

        if(tokenValErr) throw tokenValErr

        socket.data.user = await this.jwtConfig.verifyToken(token, "access")
    }
}

export const WebSocketController = new WebSockectCTRLEngine("Engine: WebSocketController")