export class Alert {
    id: string = 'default-alert';
    type!: AlertType;
    message: string = "";
    autoClose: boolean = true;
    keepAfterRouteChange?: boolean = true;
    fade: boolean = false;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}