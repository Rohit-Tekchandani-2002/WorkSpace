export const authUserContext = {
    employeeId: localStorage.getItem('emlpoyeeId') ?? null,
    userName: localStorage.getItem('userName') ?? '',
    firstName: '',
    lastName: ''
};