import { RedisCacheManager } from "src/services/cache-manger/cache-manager.services"

export abstract class BaseCacheManager {
    protected abstract CacheClient: RedisCacheManager

    protected abstract namespace: string

    protected SingleItem <Item> (cache_item_key: string, ttl: number) {
        const collection_key = this.CacheClient.makeGroupedKey(this.namespace, cache_item_key)

        return {
            get: () => this.CacheClient.get<Item>(collection_key),

            set: (item: Item) => this.CacheClient.set(collection_key, item, ttl),

            exists: () => this.CacheClient.hasKey(collection_key)
        }
    }

    protected Collection <Item>(collection_cache_key_name: string, ttl: number) {
        const collection_key = this.CacheClient.makeGroupedKey(this.namespace, collection_cache_key_name)

        return {
            set: (items: Item[]) => this.CacheClient.set(collection_key, items, ttl),
            
            get: () => this.CacheClient.get<Item[]>(collection_key),
            
            add: async (item: Item) => {
                const savedItems = await this.CacheClient.get<Item[]>(collection_key) ?? []
                    
                savedItems.push(item)

                await this.CacheClient.set(collection_key, savedItems, ttl)
            },

            findAndPop: async (predicate: (item: Item) => boolean) => {
                const savedItems = await this.CacheClient.get<Item[]>(collection_key)

                if(!savedItems) return undefined

                const searchItemIndex = savedItems.findIndex(item => predicate(item))

                if(searchItemIndex < 0) return undefined

                const foundItem = savedItems[searchItemIndex]

                savedItems.splice(searchItemIndex, 1)

                await this.CacheClient.set(collection_key, savedItems, ttl)

                return foundItem
            },

            find: async (predicate: (item: Item) => boolean) => {
                const list = await this.CacheClient.get<Item[]>(collection_key) ?? []
                
                for (const element of list) {
                    if(predicate(element)) return element
                }

                return null
            },

            exists: () => this.CacheClient.hasKey(collection_key),

            delete: () => this.CacheClient.delete(collection_key)
        }
    }
}