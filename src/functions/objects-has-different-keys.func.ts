export function HasDifferentKeys (left: Object, right: Object) {
    const leftKeys = Object.keys(left),

    rightKeys = Object.keys(right)

    return ( leftKeys.length !== rightKeys.length || !leftKeys.every(key => rightKeys.includes(key)) );
}

export function getNonExistingKeyAndValueOfSource <T extends object> (target: T, source: Record<string, any>): {key: string, value: any} | null {
    
    for (const key of Object.keys(source)) {
        if(!Object.hasOwn(target, key)) {
            return {
                key,
                value: source[key]
            }
        }
    }
    
    return null
}