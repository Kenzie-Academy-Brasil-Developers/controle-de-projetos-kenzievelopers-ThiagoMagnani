export interface developerInfos {
    id: number,
    developerSince: number,
    preferredOS: string,
    developerId: number,
}
export type developerInfosBody = Omit<developerInfos, "id">;
