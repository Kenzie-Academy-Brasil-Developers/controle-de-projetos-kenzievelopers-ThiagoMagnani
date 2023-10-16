export interface developers {
    id: number,
    email: string,
    name: string,
}
export type developersBody = Omit<developers, "id">;
