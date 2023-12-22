import { adjustDateTime } from '../config/utility';
const initialFunction = () => {};
export const modalDefaultContext = {
    modalType: '',
    modalProps: {
        addRemoveWidget: {}
    },
    title: null,
    body: null,
    data: null,
    show: false,
    handleClose: initialFunction,
    handleConfirm: initialFunction,
    handleCancle: initialFunction
};

export const addRemoveWidgetContext = {
    myRecentProjectsWidget: false,
    activeWorkGroupWidget: false,
    teamWorkItemWidget: false,
    pendingTraningFeedbackWidget: false
};

export const addWorkLogDefaultContext = {
    workDoneOn: adjustDateTime(new Date()),
    workTimeHours: 0,
    workTimeMinutes: 0,
    description: null,
    updateRemaningEst: false,
    remainingEstHours: 0,
    remainingEstMinutes: 0,
    originalEst: 0,
    remainingEst: 0,
    totalWorkDone: 0,
    progressBarValue: 0
};

export const editWorkLogDefaultContext = {
    workDoneOn: adjustDateTime(new Date()),
    workTimeHours: 0,
    workTimeMinutes: 0,
    description: null
};