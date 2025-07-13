export type Priority = 'medium' | 'high' | 'urgent';

export type Status = 'pending' | 'in-progress' | 'done';

export interface Task {
    id: number;
    title: string;
    description?: string;
    deadline: Date;
    priority: Priority;
    status: Status
}