
export enum ArticleStatus {
    draft = "Draft",
    published = "Published",
    archived = "Archived"
}

export interface Article {
    id: number,
    title: string,
    description: string,
    tags: string[]
    author: string,
    publicationDate: string,
    lastUpdateDate: string,
    status: ArticleStatus,
}