export interface ICreateComment {
    comment: IComment,
    projectId: string
}

export interface IComment {
    _id: string,
    comment: string,
    author: any,
    createdAt : string,
    updatedAt: string
}