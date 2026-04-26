import bcrypt from 'bcrypt'

export class Hasher {
    private readonly Salt = 10

    hash(value: string) {
        return bcrypt.hash(value, this.Salt)
    }

    compare = (value: string, hashedValue: string) => bcrypt.compare(value, hashedValue)
}