import { Task } from "./task";

export const TASKS: Task[] = [
    {
        id: 1,
        title: 'Buy groceries',
        description: 'Bread, onions, and potatos',
        deadline: new Date('2025-07-12'),
        priority: 'medium',
        status: 'pending'
    },
    {
        id: 2,
        title: 'Take the car to the mechanic',
        description: 'Annual inspection and oil change',
        deadline: new Date('2025-07-13'),
        priority: 'high',
        status: 'in-progress'
    },
    {
        id: 3,
        title: 'Fix the kitchen sink',
        description: 'Leaking under the counter',
        deadline: new Date('2025-07-15'),
        priority: 'urgent',
        status: 'pending'
    },
    {
        id: 4,
        title: 'Pick up prescription from pharmacy',
        deadline: new Date('2025-07-11'),
        priority: 'medium',
        status: 'done'
    },
    {
        id: 5,
        title: 'Water the plants',
        description: 'Especially the balcony flowers',
        deadline: new Date('2025-07-11'),
        priority: 'medium',
        status: 'done'
    },
    {
        id: 6,
        title: 'Call the internet company',
        description: 'Ask about the connection issues',
        deadline: new Date('2025-07-14'),
        priority: 'high',
        status: 'pending'
    },
    {
        id: 7,
        title: 'Go to IKEA to buy a bookshelf',
        description: 'Looking for a white KALLAX unit with 4 cubes.',
        deadline: new Date('2025-07-14'),
        priority: 'high',
        status: 'pending'
    }
]