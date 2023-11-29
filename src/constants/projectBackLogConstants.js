import { projectBackLogFilters } from "../services/Project/projectConstants";
export const projectBackLogTableDefaultContext = {
    apiData: {
        projectBackLogs: {}
    },
    projectFilter: projectBackLogFilters,
    totalTableEntry: 0
};
export const exportProjectBacklogContext = {
    isSelectedAll: false,
    selectedoptions: []
};