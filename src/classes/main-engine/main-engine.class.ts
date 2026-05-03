import express from 'express'
import EventEmitter from "events";
import { Engine } from "../engine/engine.class";
import http from "http"
import { Logger } from "../logger/logger.class";
import { CronTaskManager } from "../../services/cron-manager/cron-manager.class";
import { config } from 'dotenv';

config()

export class MainEngine extends EventEmitter {
    private engines: Engine[] = []

    private logger = new Logger("MainEngine")

    private Express!: any

    private Server!: http.Server

    private cronManager = new CronTaskManager()

    constructor(){
        super()
    
        this.Express = express()

        this.Server = http.createServer(this.Express)

        //@ts-expect-error
        this.on('new-day', () => Promise.all(this.engines.map(e => {try{e.DailyJob()}catch{return}})))

        //@ts-expect-error
        this.on('new-month', () => Promise.all(this.engines.map(e => {try{e.MonthlyJob()}catch{return}})))    
    }

    register (engine: Engine) {
        this.engines.push(engine)
    }

    HandleInjections(){
        for (const engine of this.engines) engine.injectCore(this.Express, this.Server)
        
        this.logger.info("All injections complete")
    }

    async InitializeAll(){
        let index = 0;
        
        for (const engine of this.engines) {            
            try {
                await engine.Initialize()                
            } catch (error: any) {
                if(error.message) this.logger.error(`Engine "${engine.name}" at index "${index}" has failed because "${error.message ?? 'unknown error'}" and has hinderded other engines initialization`)
            
                else this.logger.error(`Engine "${engine.name}" at index "${index}" has failed and has hinderded other engines initialization`)
                return
            }

            index ++
        }

        this.StartJobs()
    }

    private StartJobs () {
        this.cronManager.addJob({key: `new-day-job`, schedule: '0 0 * * *', task: () => {this.emit('new-day')}})

        this.cronManager.addJob({key: `new-month-job`, schedule: '0 0 1 * *', task: () => {this.emit('new-month')}})
    }

    StartServer(cb?: () => void){
        const {PORT} = process.env

        this.Server.listen(PORT, () => {
            this.logger.success(`server listening at port ${PORT}`)

            if(cb) cb()
        })
    }
}