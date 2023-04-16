export interface IProject {
    _id: string,
    username: string,
    title: string,
    text: string,
    imgUrl: string,
    views: number
    author: any,
    comments: Array<any>,
    team: string, 
    downdloadLink: string,
    createdAt: string,
    // evaluation: string,
    phase1: string
    phase2: string
    phase3: string
}

export interface ICreateProject {
    project: IProject,
    message: string | null
}

export interface IGetAllProjects {
    projects: Array<IProject>,
    popularProjects: Array<IProject>
}