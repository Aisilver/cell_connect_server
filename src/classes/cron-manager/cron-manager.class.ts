import nodeCron, { ScheduledTask } from "node-cron";

interface CronJobConfig {
  key: string;
  schedule: string;
  timezone?: string;
  task: () => Promise<void> | void;
}

export class CronManager  {
    private jobs: Map<string, ScheduledTask> = new Map()

    addJob(config: CronJobConfig){
        const {key, timezone} = config

        if(this.jobs.has(key)) throw Error(`cron with this name "${key}" already exists`)
        
        //@ts-ignore     
        const job = nodeCron.schedule(config.schedule, async () => await config.task(), {timezone: timezone})

        this.jobs.set(key, job)
    }
}