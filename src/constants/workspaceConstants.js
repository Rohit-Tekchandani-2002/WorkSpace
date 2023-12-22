export const attendanceDefaultContext = {
    attendanceData: [],
    holidayList: [],
    filter: {
        month: (new Date()).getMonth() + 1,
        year: (new Date()).getFullYear()
    }
}

export const projectsDefaultContext = {
    projectTech: [],
    projectRequest: {
        employeeId: localStorage.getItem('employeeId'),
        projectStatus: '',
        projectName: '',
        projectType: '',
        projectTechId: '',
        pageNumber: 1,
        pageSize: 5,
        expression: 'projectCode',
        isSortByAsc: true
    },
    projectList: []
}

export const workItemsDefautContext = {
    workItems: [],
    filter: {
        projectId: '',
        assignedPersonId: localStorage.getItem('employeeId'),
        expression: "title",
        isSortByAsc: true
    }
}

export const timeLogsDefaultContext = {
    monthlyTimeLogs: [],
    yearlyTimeLogs: [],
    holidayList: [],
    filter: {
        type: 'monthly',
        month: (new Date()).getMonth() + 1,
        year: (new Date()).getFullYear()
    }
}

export const timesheetDefaultContext = {
    timesheet: [],
    monthlyTimeSheet: [],
    holidayList: [],
    filter: {
        employeeId: localStorage.getItem('employeeId'),
        month: (new Date()).getMonth() + 1,
        year: (new Date()).getFullYear()
    }
}

export const leaveRequestDefaultContext = {
    leaveRequestList: [],
    totalRecords: 0,
    filter: {
        employeeId: localStorage.getItem('employeeId'),
        leaveStartDate: '',
        leaveEndDate: '',
        leaveRequestStatus: 'Pending',
        pageNumber: 1,
        pageSize: 5,
        sortColumn: "leaveStartDate",
        sortOrder: true
    }
}

export const serviceDetailsDefaultContext = {
    serviceRequestList: [],
    totalRecords: 0,
    filter: {
        employeeId: localStorage.getItem('employeeId'),
        ticketNumber: '',
        requestStatus: '',
        pageNumber: 1,
        pageSize: 5,
        sortColumn: "ticket",
        sortOrder: true
    }
}

export const serviceDefaultContext = {
    serviceGroupList: [],
    categoriList: [],
    subCategoriList: [],
    updateServiceRequestData: [],
    addServiceRequest: {
        employeeId: localStorage.getItem('employeeId'),
        serviceGroupId: '',
        categoryId: '',
        subCategoryId: '',
        serviceRequestPriority: 'Low',
        serviceDetails: ''
    },
    updateServiceRequest: {
        serviceRequestId: '',
        requestedDate: new Date(),
        status: 2,
        serviceGroupId: '',
        categoryId: '',
        subCategoryId: '',
        serviceRequestPriority: 'Low',
        serviceDetails: '',
        comments: ''
    }
}