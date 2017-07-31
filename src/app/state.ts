import { Flow } from './flow';
import { Stats } from './stats';

export interface State {
    url: string;
    user: string;
    counter: number;
    allflows: Flow[];
    currentFlow: Flow;
    socket: any;
    currentFlowStats: Stats;
    currentFlowBuild: any;
}