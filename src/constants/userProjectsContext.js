export const userProjectsContext = {
    projectId: localStorage.getItem('projectId') ?? null,
    projectName: localStorage.getItem('projectName') ?? null,
    projects: []
}

export const workGroupContext = {
    workGroupList: []
}