export type AuthUserProfileUploadEventParams = {
    imageRef: string;
    accountId: number
}

export type AuthPasswordHistoryUpdateEventParams = {
    passwordHash: string;
    userId: number
}