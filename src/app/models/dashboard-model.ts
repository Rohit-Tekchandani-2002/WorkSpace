export interface userNameResponce {
    profileImage : string,
    firstName : string,
    lastName : string
}
export interface userProjectResponce{
    projectId : bigint,
    projectName : string
}
export interface newsAndUpdatesResponce{
    newsId : bigint,
    newsTitle : string,
    newsDescription : string,
    newsDate : Date,
    documentPath : string,
    updatedAt : Date
}