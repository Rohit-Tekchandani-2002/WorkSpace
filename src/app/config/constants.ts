export class Constants {
    static API_ENDPOINT: string = 'https://localhost:7268/';
}
export enum systemType {
    Motherboard,
    Keyboard,
    Mouse,
    SMPS,
    HardDisk,
    Processor,
    RAM,
    Monitor,
    "Head Phone"
}
export enum AttendanceOption {
    P,
    A,
    H,
    ""
}
// export enum holidayList {
//     '14/01/2023',
//     '26/01/2023',
//     '08/03/2023',
//     '15/08/2023',
//     '30/08/2023',
//     '07/09/2023',
//     '02/10/2023',
//     '25/10/2023',
//     '12/11/2023',
//     '13/11/2023',
//     '14/11/2023'
// }
export enum ProjectStatus {
    'New',
    'In-Progress',
    'Dev. Completed',
    'Ready for Testing',
    'Closed',
}
export enum ProjectType {
    'Fixed Cost',
    'Hourly',
    'Monthly'
}
export enum WorkFlowType {
    'Defect',
    'Enhancement',
    'Module',
    'Requirement',
    'Task'
}
export const environment = {
    showProject: false,
};