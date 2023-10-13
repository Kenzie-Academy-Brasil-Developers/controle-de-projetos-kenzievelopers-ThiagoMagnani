export interface projects {
    id: number,
    name: string,
    description: string,
    repository: string,
    startDate: number,
    endDate: number,
    developerId: number,
}
export type projectsBody = Omit<projects, "id">;
