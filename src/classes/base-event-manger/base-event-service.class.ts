import EventEmitter from "events";

type EventTypes = "absolute" | "queue"

type EventPaylod = {
    type: EventTypes,
    args: any
}

export abstract class BaseEventManager {
    protected event = new EventEmitter()

    private WorkingEventsMap: Map<string, boolean> = new Map()

    private EventsInQueueMap: Map<string, any[]> = new Map()

    constructor () {
        setTimeout(() => this.ListenAll(), 1)
    }

    protected abstract ListenAll(): void

    protected Trigger(key: string, args: any = undefined, type: EventTypes = "queue") {
        if(type == "queue") {
            if(this.WorkingEventsMap.has(key))
                this.addToQueue(key, args)
            else {
                this.WorkingEventsMap.set(key, true)

                this.event.emit(key, {type, args})
            }
        } else {
            this.event.emit(key, {type, args})
        }
    }

    protected ListenFor(key: string, action: (args: any) => Promise<void> | void){

        this.event.on(key, async payload => {
            const {type, args} = payload as EventPaylod

            try {
            
                await action(args);
            
            } catch (error: any) {

                this.handleEventErrors(key, error)
            
            } finally {
                if(type != "queue") return

                const queue = this.EventsInQueueMap.get(key)

                if(queue && queue.length > 0) {
                    const nextArgs = queue.shift()

                    if(queue.length === 0) this.EventsInQueueMap.delete(key)

                    this.event.emit(key, nextArgs)

                } else this.WorkingEventsMap.delete(key)
            }
        })
    }

    private addToQueue (key: string, args: any) {
        if(!this.EventsInQueueMap.has(key))
            this.EventsInQueueMap.set(key, [args])
        else
            this.EventsInQueueMap.get(key)?.push(args)
    }

    private handleEventErrors (key: string, error: any) {

    }
}