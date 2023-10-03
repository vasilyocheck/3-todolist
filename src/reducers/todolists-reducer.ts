import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionsType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionType =
    RemoveTodolistActionsType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType

export const todolistsReducer = (state: TodolistType[], action: ActionType):TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':{
            const newTodolistItem:TodolistType = {id: v1(), title: action.title, filter: 'all'}
            return [...state, newTodolistItem];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        }

        default:
            throw new Error('I don\'t understand this type');
    }
}

export const removeTodolist = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}

export const addTodolist = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title
    } as const
}

export const changeTodolistTitle = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const
}