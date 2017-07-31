export class Stats {
    name: string;
    execDurations: any[];
    latestFailedBuild: number;
    latestSuccessfulBuild: number;
    latestFiveBuilds: any[];
    mostFailingJob: string;
    mostSuccessfulJob: string;
    nbFailedBuilds: number;
    nbSuccessfulBuilds: number;
}
