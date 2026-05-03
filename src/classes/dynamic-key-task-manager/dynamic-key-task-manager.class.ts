import { dateToCronExpression } from "../../functions/date-to-cron.func";
import { CronTaskManager } from "../../services/cron-manager/cron-manager.class";

export class DynamicKeyTaskManager<TaskRunnerNeed = unknown, PartialKey = number> {
    private taskManger = new CronTaskManager();

    private declare baseKey: string

    private declare taskRunner: (args: TaskRunnerNeed) => void | Promise<void>

    constructor (baseKey: string, taskRunner: (args: TaskRunnerNeed) => void | Promise<void>) {
        this.baseKey = baseKey

        this.taskRunner = taskRunner
    }

    addTask(dynamicKeyPart: PartialKey, jobParam: TaskRunnerNeed, whenToRun: Date) {
        this.taskManger.addJob({
            key: `${this.baseKey}:${dynamicKeyPart}`,

            schedule: dateToCronExpression(whenToRun),
            
            task: async () => {
                await this.taskRunner(jobParam)
            },

            maxExecutions: 1
        })
    }

    addTaskWithSameKeyAndJobParam (dynamicKeyPart: PartialKey, whenToRun: Date){
        this.addTask(dynamicKeyPart, dynamicKeyPart as any, whenToRun)
    }

    async killTask (dynamicKeyPart: PartialKey) {
        const jobKey = `${this.baseKey}:${dynamicKeyPart}`

        await this.taskManger.killJob(jobKey)
    }
}