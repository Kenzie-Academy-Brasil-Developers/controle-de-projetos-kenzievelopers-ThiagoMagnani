export interface developers {
    id: number,
    email: string,
    name: string,
}

export interface developerInfos {
    id: number,
    developerSince: number,
    preferredOS: string,
    developerId: number,
}

export interface dprojects {
    id: number,
    name: string,
    description: string,
    repository: string,
    startDate: number,
    endDate: number,
    deveporId: number,
}

