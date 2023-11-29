export const workBacklogDefaultContext = {
    workGroups: [],
    workGroupInfo: {
        workGroupId: null,
        title: null,
        startDate: null,
        endDate: null
    },
    workLog: [],
    filter: {
        workGroupId: localStorage.getItem('workGroupId'),
        searchText: null,
        projectType: null,
        projectStatus: null,
    }
}