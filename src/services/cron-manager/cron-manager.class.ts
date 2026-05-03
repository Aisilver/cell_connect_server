import nodeCron, { ScheduledTask } from "node-cron";

interface CronJobConfig {
  key: string;
  schedule: string;
  timezone?: string;
  maxExecutions?: number;
  task: () => Promise<void> | void;
}

export class CronTaskManager {
    private jobs: Map<string, ScheduledTask> = new Map()

    addJob(config: CronJobConfig){
        const {key, timezone, schedule, maxExecutions, task} = config

        if(this.jobs.has(key)) throw Error(`cron with this name "${key}" already exists`)
        
        const job = nodeCron.schedule(schedule, async () => await task(), {
            timezone: timezone ?? 'UTC',
            ...(maxExecutions && {
                maxExecutions
            })
        })

        this.jobs.set(key, job)
    }

    async killJob (key: string) {
        const job = this.jobs.get(key)

        await job?.destroy()

        this.jobs.delete(key)
    }
}