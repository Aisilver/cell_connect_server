export function SlugTextDeserializer (slug: string) {
    return slug.replace("_", " ")
}