import { Engine } from "../engine/engine.class";

export abstract class CarrierEngine extends Engine {
    protected abstract engines: Engine[]

    /** Initialize all child engines */
    async AfterInitialise(): Promise<void> {
        for (const engine of this.engines) {
            engine.injectCore(this.app, this.server)

            await engine.Initialize()
        }
    }

    /** Run Daily jobs of child engines */
    DailyJob(): void | Promise<void> {
        //@ts-expect-error
        Promise.all(this.engines.map(e => {try{e.DailyJob()}catch{}}))
    }

    /** Run Monthly jobs of child engines */
    MonthlyJob(): void | Promise<void> {
        //@ts-expect-error
        Promise.all(this.engines.map(e => {try{e.MonthlyJob()}catch{}}))
    }
}