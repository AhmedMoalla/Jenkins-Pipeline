import { Flow } from './flow';

export interface State {
    counter: number;
    allflows: Flow[];
    currentFlow: Flow;
}