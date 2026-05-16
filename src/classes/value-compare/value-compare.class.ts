export class ValueComparer {
    sameString(left: string, right: string) {
        try {
        
            const leftNormalization = left.trim().toLowerCase(),

            rightNormalization = right.trim().toLowerCase(),
            
            compare = leftNormalization.localeCompare(rightNormalization)

            return compare === 0

        } catch  {
            return false
        }
    }

    hasDifferentKeys (left: Object, right: Object) {
        const leftKeys = Object.keys(left),

        rightKeys = Object.keys(right)

        return ( leftKeys.length !== rightKeys.length || !leftKeys.every(key => rightKeys.includes(key)) );
    }

    getNonExistingKeyAndValueOfSource <T extends object> (target: T, source: Record<string, any>): {key: string, value: any} | null {

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
}