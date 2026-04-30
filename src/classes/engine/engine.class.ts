import { Logger } from "../logger/logger.class"
import { Express } from 'express'
import { Server } from 'http'
import { EngineInitalizerFunctionsPriorityTypes, InitializerConfig } from "./types"

export abstract class Engine {
    protected app!: Express;
    
    protected server!: Server; 
    
    private logger!: Logger

    name!: string
    
    protected initializers: InitializerConfig[]

    BeforeInitialise?(): void | Promise<void>

    AfterInitialise?(): void | Promise<void>

    DailyJob?(): void | Promise<void>

    MonthlyJob?(): void | Promise<void>

    constructor(engineName: string) {
        this.name = engineName

        this.logger = new Logger(this.name)
    }

    injectCore(app: Express, server: Server) {
        this.app = app

        this.server = server
    }

    async Initialize () {
        if(this.BeforeInitialise) await this.BeforeInitialise()

        for (const initConfig of this.initializers ?? []) {
            const {name, priority} = initConfig

            if(priority == 'ignore') {
                this.logger.warn(`Skipped Execution of [${name}] intialization process`)
                continue;
            };

            try {
                this.logger.info(`Executing [${name}] intialization process`)

                await initConfig.initFunc()
                
                this.logger.success(`"${name}" initialization complete!`)
            } catch (error: any) {
                this.logError(error, priority, name)
                
                if(priority == 'top') throw Error(error.message)
            }
        }

        this.coreCheck()
        
        if(this.AfterInitialise) await this.AfterInitialise()

        this.logger.info(`Engine fully initialized`)
    }

    private logError(error: any, prio: EngineInitalizerFunctionsPriorityTypes, initName: string){
        const msg = `initializer: "${initName}" of "${prio.toUpperCase()}" priority has failed cause "${error.message ?? 'unknown error'}"`
        switch(prio){
            case "top": this.logger.error(msg)
            break
            case "low": this.logger.warn(msg)
            break
        }
    }

    private coreCheck () {
        if(!this.app) throw Error('engines express reference cannot be found')
        
        if(!this.server) throw Error('engines sever reference cannot be found')
    }
}