export type EngineInitalizerFunctionsPriorityTypes = "top" | "low" | "ignore"

export type InitializerConfig = {
    name: string,
    priority: EngineInitalizerFunctionsPriorityTypes,
    initFunc(): void | Promise<any> 
}