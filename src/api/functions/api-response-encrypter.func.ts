import crypto from 'crypto'
import { EncryptedData } from "@shared/common";

export function APIResponseEncrypter(body: any, public64Key: string): EncryptedData {
    const aesKey = crypto.randomBytes(32),
    
    iv = crypto.randomBytes(16),

    cipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv)

    let encrypted = cipher.update(JSON.stringify(body), "utf-8", "base64")

    encrypted += cipher.final("base64")

    const publicPem = `-----BEGIN PUBLIC KEY-----\n${public64Key.match(/.{1,64}/g)?.join("\n")}\n-----END PUBLIC KEY-----`,
    
    encryptedKey = crypto.publicEncrypt({
        key: publicPem,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, aesKey).toString('base64')

    return {key: encryptedKey, iv: iv.toString("base64"), data: encrypted}
}