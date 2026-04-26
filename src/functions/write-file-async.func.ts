import fs from 'fs'

export function writeFileAsync (path: string, buffer: Buffer){
    return new Promise<void>((res, rej) => {
        fs.writeFile(path, buffer, err => rej(err))
        res()
    })
}