export default interface PostDto {
    id?: number
    title?: string
    content?: string
    isActived?: boolean;
    isBlocked?: boolean;
    category?: string
    createdAt?: Date
    updatedAt?: Date
}