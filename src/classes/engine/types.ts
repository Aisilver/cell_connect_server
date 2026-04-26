export type EngineInitalizerFunctionsPriorityTypes = "top" | "low"

export type InitializerConfig = {
    name: string,
    priority: EngineInitalizerFunctionsPriorityTypes,
    initFunc(): void | Promise<any> 
}