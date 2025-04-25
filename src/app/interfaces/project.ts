import { Task } from "./task";

export interface Project {
    id: number,
    name: string,
    description: string,
    userId: number,
    tasks?: Task[]
}