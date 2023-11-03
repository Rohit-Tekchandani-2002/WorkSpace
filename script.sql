USE [master]
GO
/****** Object:  Database [WorkSpaceDb]    Script Date: 03-11-2023 10:37:32 ******/
CREATE DATABASE [WorkSpaceDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'WorkSpaceDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQL2017\MSSQL\DATA\WorkSpaceDb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'WorkSpaceDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQL2017\MSSQL\DATA\WorkSpaceDb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [WorkSpaceDb] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [WorkSpaceDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [WorkSpaceDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [WorkSpaceDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [WorkSpaceDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [WorkSpaceDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET  ENABLE_BROKER 
GO
ALTER DATABASE [WorkSpaceDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [WorkSpaceDb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [WorkSpaceDb] SET  MULTI_USER 
GO
ALTER DATABASE [WorkSpaceDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [WorkSpaceDb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [WorkSpaceDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [WorkSpaceDb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [WorkSpaceDb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [WorkSpaceDb] SET QUERY_STORE = OFF
GO
USE [WorkSpaceDb]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [WorkSpaceDb]
GO
/****** Object:  Table [dbo].[AttendanceInformation]    Script Date: 03-11-2023 10:37:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AttendanceInformation](
	[AttendanceInfoId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[AttendanceOption] [int] NOT NULL,
	[AttendanceDate] [datetime] NOT NULL,
	[IsApproved] [bit] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK__Attendan__8A024EBCD65323A1] PRIMARY KEY CLUSTERED 
(
	[AttendanceInfoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 03-11-2023 10:37:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[ServiceGroupId] [bigint] NOT NULL,
	[CategoryName] [varchar](64) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CountryVisaInformation]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CountryVisaInformation](
	[VisaInfoId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[CountryName] [varchar](255) NULL,
	[VisaType] [varchar](128) NULL,
	[VisaValidFor] [date] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[VisaInfoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[DepartmentId] [bigint] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](255) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[EmployeeId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](255) NOT NULL,
	[FirstName] [nvarchar](126) NOT NULL,
	[LastName] [nvarchar](126) NULL,
	[Email] [nvarchar](255) NOT NULL,
	[EmployeePassword] [nvarchar](255) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeDetails]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeDetails](
	[EmployeeDeatilId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[ProfileImage] [varchar](max) NULL,
	[Experience] [nvarchar](255) NULL,
	[JoiningDate] [date] NOT NULL,
	[ReportingPersonId] [bigint] NULL,
	[CardNo] [bigint] NOT NULL,
	[Grade] [int] NULL,
	[DepartmentId] [bigint] NOT NULL,
	[Designation] [nvarchar](255) NOT NULL,
	[SittingPlace] [nvarchar](255) NOT NULL,
	[NotificationTypeResolutionChanged] [bit] NOT NULL,
	[NotificationOnAssignedWorkItemChangeByTeamMember] [bit] NOT NULL,
	[NotificationCommnetOnWork] [bit] NOT NULL,
	[NotificationAssignedWork] [bit] NOT NULL,
	[NotificationDailyAlertEmail] [bit] NOT NULL,
	[NotificationOnCreatedWorkItemChangeByTeamMember] [bit] NOT NULL,
	[PcOrLaptopNumber] [varchar](32) NULL,
	[IsPrimaryPC] [bit] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeDeatilId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeInOutTimeLog]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeInOutTimeLog](
	[LogId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeLog] [bigint] NULL,
	[EmployeeId] [bigint] NULL,
	[InTime] [float] NOT NULL,
	[OutTime] [float] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeShift]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeShift](
	[EmployeeShiftId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[ShiftCode] [varchar](128) NOT NULL,
	[ShiftStartTime] [float] NOT NULL,
	[ShiftEndTime] [float] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeShiftId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeTimeLog]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeTimeLog](
	[EmployeeTimeLogId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[LogDate] [date] NOT NULL,
	[LateComer] [bit] NULL,
	[FirstInTime] [float] NOT NULL,
	[LastOutTime] [float] NOT NULL,
	[TotalOutHours] [float] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeTimeLogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Holidays]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Holidays](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NULL,
	[Date] [date] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeaveRequest]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeaveRequest](
	[LeaveRequestId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[ReportingPersonId] [bigint] NOT NULL,
	[ReasonForLeave] [nvarchar](255) NOT NULL,
	[LeaveStartDate] [date] NOT NULL,
	[LeaveEndDate] [date] NOT NULL,
	[StartDateAttendanceOption] [int] NULL,
	[EndDateAttendanceOption] [int] NULL,
	[IsAdhocLeave] [bit] NULL,
	[AdhocLeaveStatus] [varchar](128) NULL,
	[PhoneNumber] [bigint] NULL,
	[AlternatePhoneNumber] [bigint] NULL,
	[AvailibiltyOnPhone] [bit] NOT NULL,
	[AvailibiltyInCity] [bit] NOT NULL,
	[LeaveRequestStatus] [varchar](128) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
	[ApprovedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[LeaveRequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NewsAndDetails]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewsAndDetails](
	[NewsId] [bigint] IDENTITY(1,1) NOT NULL,
	[NewsTitle] [varchar](128) NULL,
	[NewsDescription] [nvarchar](max) NULL,
	[NewsDate] [date] NOT NULL,
	[DocumentPath] [varchar](255) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK__NewsAndD__954EBDF362B36C20] PRIMARY KEY CLUSTERED 
(
	[NewsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonalDetails]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonalDetails](
	[EmployeeInfoId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[DateOfBirth] [date] NULL,
	[Gender] [bit] NULL,
	[MaritalStatus] [bit] NULL,
	[BloodGroup] [varchar](16) NULL,
	[AnyDiseases] [nvarchar](255) NULL,
	[ContactNumber] [bigint] NULL,
	[AlternateNumber] [bigint] NULL,
	[AccountNumber] [nvarchar](255) NULL,
	[PanCardNumber] [nvarchar](255) NULL,
	[PresentAddress] [nvarchar](255) NULL,
	[PermanentAddress] [nvarchar](255) NULL,
	[ProvidentFundNumber] [bigint] NOT NULL,
	[NSRNumber] [bigint] NOT NULL,
	[CompanyMail] [nvarchar](128) NULL,
	[PersonalMail] [nvarchar](128) NULL,
	[Messengers] [nvarchar](255) NULL,
	[PassportNumber] [nvarchar](64) NULL,
	[DateOfIssue] [date] NULL,
	[PlaceOfIssue] [varchar](128) NULL,
	[NameInPassport] [varchar](128) NULL,
	[ValidUpto] [date] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeInfoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectDescription]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectDescription](
	[ProjectId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProjectCode] [varchar](128) NOT NULL,
	[ProjectName] [nvarchar](255) NOT NULL,
	[ProjectType] [int] NULL,
	[ProjectStatus] [int] NULL,
	[ProjectTechId] [bigint] NOT NULL,
	[DueDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[TotalHours] [bigint] NOT NULL,
	[AssignedHours] [bigint] NOT NULL,
	[WorkHours] [bigint] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectTech]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectTech](
	[ProjectTechId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProjectTechName] [varchar](128) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProjectTechId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectWorkitems]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectWorkitems](
	[ProjectWorkId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NULL,
	[ProjectId] [bigint] NOT NULL,
	[SubProjectId] [bigint] NULL,
	[Title] [varchar](128) NOT NULL,
	[WorkGroupId] [bigint] NOT NULL,
	[WorkFlow] [bigint] NOT NULL,
	[ProjectWorkitemsPriority] [varchar](16) NOT NULL,
	[ProjectStatusId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[OriginalEstTime] [float] NOT NULL,
	[RemainingEstTime] [float] NOT NULL,
	[TotalWorkDone] [float] NOT NULL,
	[AssignedEmployeeId] [bigint] NOT NULL,
	[ReportedEmployeeId] [bigint] NOT NULL,
	[ReleasedToProduction] [bit] NULL,
	[RSI] [float] NOT NULL,
	[Description] [varchar](max) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK__ProjectW__0B0D250A3D70F0CA] PRIMARY KEY CLUSTERED 
(
	[ProjectWorkId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceGroup]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceGroup](
	[ServiceGroupId] [bigint] IDENTITY(1,1) NOT NULL,
	[ServiceGroupIdtName] [varchar](64) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceGroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceRequest]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceRequest](
	[ServiceRequestId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[ReportingPersonId] [bigint] NOT NULL,
	[ServiceGroupId] [bigint] NOT NULL,
	[CategoryId] [bigint] NOT NULL,
	[SubCategoryId] [bigint] NOT NULL,
	[ServiceRequetPriority] [varchar](16) NOT NULL,
	[ServiceDetails] [varchar](255) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
	[Comments] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceRequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceRequestHistory]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceRequestHistory](
	[ServiceRequestHistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[ServiceRequestId] [bigint] NOT NULL,
	[ServiceEmployeeId] [bigint] NOT NULL,
	[Comments] [varchar](128) NULL,
	[AttachmentsDocumentPath] [varchar](255) NULL,
	[RequestStatus] [int] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceRequestHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubCategory]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubCategory](
	[SubCategoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[CategoryId] [bigint] NOT NULL,
	[SubCategoryName] [varchar](64) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
	[ServicePersonId] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SubCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubProject]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubProject](
	[SubProjectId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProjectId] [bigint] NOT NULL,
	[SubProjectName] [varchar](128) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[SubProjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SystemConfigurationDetails]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SystemConfigurationDetails](
	[SystemConfigurationDetailsID] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[SystemType] [int] NOT NULL,
	[SystemItemModel] [nvarchar](255) NULL,
	[SystemQuantity] [bigint] NULL,
	[HasTakenHome] [bit] NOT NULL,
	[SerailId] [bigint] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[SystemConfigurationDetailsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TraineeFeedback]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TraineeFeedback](
	[FeedbackId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[TraningId] [bigint] NOT NULL,
	[Attended] [bit] NOT NULL,
	[IsFeedBackGiven] [bit] NOT NULL,
	[FeedbackCourseCourseCoverage] [int] NOT NULL,
	[FeedbackCourseDelivery] [int] NOT NULL,
	[FeedbackCourseMaterial] [int] NOT NULL,
	[FeedbackCourseQuality] [int] NOT NULL,
	[FeedbackCourseAvailability] [int] NOT NULL,
	[FeedbackCourseManagements] [int] NOT NULL,
	[FeedbackFacultyKnowleage] [int] NOT NULL,
	[FeedbackFacultyPresentation] [int] NOT NULL,
	[FeedbackFacultyCoverage] [int] NOT NULL,
	[FeedbackFacultyExamples] [int] NOT NULL,
	[FeedbackFacultyLevel] [int] NOT NULL,
	[FeedbackSelfGain] [int] NOT NULL,
	[FeedbackSelfApplicability] [int] NOT NULL,
	[FeedbackOverallConduct] [int] NOT NULL,
	[SuggestionImprovements] [varchar](1024) NULL,
	[SuggestionCoverage] [varchar](1024) NULL,
 CONSTRAINT [PK__TraineeF__6A4BEDD67E1DEC8A] PRIMARY KEY CLUSTERED 
(
	[FeedbackId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TraineeTraning]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TraineeTraning](
	[TraningId] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](256) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Time] [float] NOT NULL,
	[Duration] [float] NULL,
	[faculties] [varchar](256) NULL,
	[category] [varchar](64) NOT NULL,
	[subCategory] [varchar](64) NULL,
	[Type] [varchar](64) NOT NULL,
	[Status] [varchar](64) NOT NULL,
	[Location] [varchar](256) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TraningId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserCurrentProjectInformation]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserCurrentProjectInformation](
	[UserCurrentProjectInformationId] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[HoursAllocated] [float] NOT NULL,
	[ProjectId] [bigint] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK__UserCurr__41726C0B3CE36B4C] PRIMARY KEY CLUSTERED 
(
	[UserCurrentProjectInformationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkGroup]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkGroup](
	[WorkGroupId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProjectId] [bigint] NOT NULL,
	[WorkGroupName] [varchar](128) NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[Notes] [varchar](256) NULL,
 CONSTRAINT [PK__WorkGrou__2FA45567273DAABE] PRIMARY KEY CLUSTERED 
(
	[WorkGroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkItemAttachments]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkItemAttachments](
	[WorkItemAttachmentsId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProjectWorkId] [bigint] NOT NULL,
	[FileName] [nvarchar](256) NULL,
	[FilePath] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](256) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
	[filetype] [varchar](32) NOT NULL,
 CONSTRAINT [PK__WorkItem__DE28094157A52690] PRIMARY KEY CLUSTERED 
(
	[WorkItemAttachmentsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkItemHistory]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkItemHistory](
	[WorkItemHistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProjectWorkId] [bigint] NOT NULL,
	[Field] [varchar](128) NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[OldValue] [varchar](128) NOT NULL,
	[NewValue] [varchar](128) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[WorkItemHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkitemsComments]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkitemsComments](
	[WorkItemCommentId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProjectWorkId] [bigint] NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[COMMENTS] [varchar](256) NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[WorkItemCommentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkItemState]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkItemState](
	[WorkItemStateId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProjectWorkId] [bigint] NOT NULL,
	[EmployeeId] [bigint] NOT NULL,
	[ProjectStatusId] [int] NOT NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[WorkItemStateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkLog]    Script Date: 03-11-2023 10:37:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkLog](
	[WorkLogId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProjectWorkId] [bigint] NOT NULL,
	[WorkDoneOn] [date] NOT NULL,
	[WorkTime] [float] NOT NULL,
	[Description] [varchar](256) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdateAt] [datetime] NULL,
	[IsDeleted] [bit] NULL,
 CONSTRAINT [PK__WorkLog__FE542C22E80605E6] PRIMARY KEY CLUSTERED 
(
	[WorkLogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[AttendanceInformation] ON 

INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 1, 1, CAST(N'2023-07-14T00:00:00.000' AS DateTime), 1, CAST(N'2023-07-14T14:12:11.660' AS DateTime), CAST(N'2023-07-17T14:12:40.277' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 1, 1, CAST(N'2023-07-17T00:00:00.000' AS DateTime), 0, CAST(N'2023-07-17T14:12:56.133' AS DateTime), CAST(N'2023-07-17T14:22:30.030' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (5, 1, 1, CAST(N'2023-08-17T00:00:00.000' AS DateTime), 0, CAST(N'2023-08-17T15:06:24.640' AS DateTime), CAST(N'2023-08-17T17:57:18.233' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (11, 1, 1, CAST(N'2023-08-18T00:00:00.000' AS DateTime), 0, CAST(N'2023-08-18T11:00:28.450' AS DateTime), CAST(N'2023-08-18T18:25:17.790' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (12, 1, 1, CAST(N'2023-08-21T00:00:00.000' AS DateTime), 1, CAST(N'2023-08-21T09:56:27.407' AS DateTime), CAST(N'2023-08-21T17:23:01.647' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (13, 1, 1, CAST(N'2023-08-22T00:00:00.000' AS DateTime), 1, CAST(N'2023-08-22T11:49:46.300' AS DateTime), CAST(N'2023-08-22T11:51:44.387' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (14, 1, 1, CAST(N'2023-08-25T00:00:00.000' AS DateTime), 0, CAST(N'2023-08-25T14:57:46.450' AS DateTime), CAST(N'2023-08-25T14:57:46.453' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (15, 1, 1, CAST(N'2023-08-29T00:00:00.000' AS DateTime), 0, CAST(N'2023-08-29T16:47:45.050' AS DateTime), CAST(N'2023-08-29T16:58:40.197' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (16, 1, 1, CAST(N'2023-08-31T00:00:00.000' AS DateTime), 0, CAST(N'2023-08-31T18:31:41.310' AS DateTime), CAST(N'2023-08-31T18:31:41.310' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (17, 1, 1, CAST(N'2023-09-04T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-04T09:38:26.267' AS DateTime), CAST(N'2023-09-04T09:38:26.270' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (18, 1, 1, CAST(N'2023-09-08T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-08T09:25:50.740' AS DateTime), CAST(N'2023-09-08T09:25:50.743' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (19, 1, 1, CAST(N'2023-09-13T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-13T15:02:51.420' AS DateTime), CAST(N'2023-09-13T15:02:51.423' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (20, 1, 1, CAST(N'2023-09-14T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-14T18:18:34.107' AS DateTime), CAST(N'2023-09-14T18:18:34.107' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (21, 1, 1, CAST(N'2023-09-20T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-20T17:50:31.553' AS DateTime), CAST(N'2023-09-20T17:50:31.557' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (22, 1, 1, CAST(N'2023-09-21T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-21T14:20:17.247' AS DateTime), CAST(N'2023-09-21T14:20:17.250' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (23, 1, 1, CAST(N'2023-09-22T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-22T14:11:37.203' AS DateTime), CAST(N'2023-09-22T16:24:39.943' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (24, 1, 1, CAST(N'2023-09-26T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-26T13:21:28.187' AS DateTime), CAST(N'2023-09-26T13:21:28.190' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (25, 1, 1, CAST(N'2023-09-28T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-28T10:34:29.167' AS DateTime), CAST(N'2023-09-28T10:34:29.170' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (26, 1, 3, CAST(N'2023-09-29T00:00:00.000' AS DateTime), 0, CAST(N'2023-09-29T13:23:16.237' AS DateTime), CAST(N'2023-09-29T17:27:44.743' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (27, 1, 3, CAST(N'2023-10-05T00:00:00.000' AS DateTime), 0, CAST(N'2023-10-05T15:53:38.613' AS DateTime), CAST(N'2023-10-09T15:32:09.000' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (28, 1, 2, CAST(N'2023-10-06T00:00:00.000' AS DateTime), 0, CAST(N'2023-10-06T17:35:38.517' AS DateTime), CAST(N'2023-10-09T15:32:02.653' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (29, 1, 2, CAST(N'2023-10-09T00:00:00.000' AS DateTime), 0, CAST(N'2023-10-09T15:10:18.200' AS DateTime), CAST(N'2023-10-09T18:30:18.813' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (30, 1, 1, CAST(N'2023-10-10T00:00:00.000' AS DateTime), 0, CAST(N'2023-10-10T09:49:03.617' AS DateTime), CAST(N'2023-10-10T09:49:03.620' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (31, 1, 1, CAST(N'2023-10-04T00:00:00.000' AS DateTime), 0, CAST(N'2023-10-11T09:27:45.650' AS DateTime), CAST(N'2023-10-11T14:49:46.147' AS DateTime), NULL)
INSERT [dbo].[AttendanceInformation] ([AttendanceInfoId], [EmployeeId], [AttendanceOption], [AttendanceDate], [IsApproved], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (32, 1, 1, CAST(N'2023-10-12T00:00:00.000' AS DateTime), 0, CAST(N'2023-10-12T11:34:58.530' AS DateTime), CAST(N'2023-10-12T11:34:58.530' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[AttendanceInformation] OFF
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 1, N'General', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 2, N'General', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (3, 3, N'Installation', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (4, 3, N'HardwareIssue', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (5, 3, N'NetworkIssue', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (6, 3, N'SpecialRequest', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (7, 3, N'Rights', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (8, 3, N'General', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (9, 3, N'NeworupgradeH/Wreq', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10, 4, N'General', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (11, 4, N'Other', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (12, 5, N'Architectural Guidance', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (13, 5, N'Technical Guidance', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (14, 5, N'Knowledge Sharing(Technical)', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (15, 5, N'Other', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
INSERT [dbo].[Category] ([CategoryId], [ServiceGroupId], [CategoryName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (16, 6, N'WorkSpace', CAST(N'2023-09-28T17:48:24.580' AS DateTime), CAST(N'2023-09-28T17:48:24.583' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[Department] ON 

INSERT [dbo].[Department] ([DepartmentId], [DepartmentName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, N'Microsoft', CAST(N'2023-07-11T15:29:03.150' AS DateTime), CAST(N'2023-07-11T15:29:03.153' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Department] OFF
SET IDENTITY_INSERT [dbo].[Employee] ON 

INSERT [dbo].[Employee] ([EmployeeId], [UserName], [FirstName], [LastName], [Email], [EmployeePassword], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, N'rohit.tekchandani', N'Rohit', N'Tekchandani', N'tatva_pci243@outlook.com', N'0786', CAST(N'2023-07-10T18:12:27.243' AS DateTime), CAST(N'2023-09-29T16:43:01.560' AS DateTime), NULL)
INSERT [dbo].[Employee] ([EmployeeId], [UserName], [FirstName], [LastName], [Email], [EmployeePassword], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, N'dipak.Patel', N'Dipak', N'Patel', N'dipak.patel@internal.mail', N'dipakpatel', CAST(N'2023-07-11T15:08:34.763' AS DateTime), CAST(N'2023-09-05T14:32:54.400' AS DateTime), NULL)
INSERT [dbo].[Employee] ([EmployeeId], [UserName], [FirstName], [LastName], [Email], [EmployeePassword], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (3, N'string', N'string', N'string', N'string', N'string', CAST(N'2023-07-12T16:30:59.457' AS DateTime), CAST(N'2023-07-13T10:47:48.500' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Employee] OFF
SET IDENTITY_INSERT [dbo].[EmployeeDetails] ON 

INSERT [dbo].[EmployeeDetails] ([EmployeeDeatilId], [EmployeeId], [ProfileImage], [Experience], [JoiningDate], [ReportingPersonId], [CardNo], [Grade], [DepartmentId], [Designation], [SittingPlace], [NotificationTypeResolutionChanged], [NotificationOnAssignedWorkItemChangeByTeamMember], [NotificationCommnetOnWork], [NotificationAssignedWork], [NotificationDailyAlertEmail], [NotificationOnCreatedWorkItemChangeByTeamMember], [PcOrLaptopNumber], [IsPrimaryPC], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 1, N'https://img.freepik.com/free-photo/portrait-young-man-with-dark-curly-hair_176532-8137.jpg', N'0', CAST(N'2023-07-03' AS Date), 2, 1600, 5, 1, N'Trainee Software Engineer', N'TatvaSoft House - Third Floor - OL-1', 0, 1, 1, 1, 1, 0, N'PCI243', 1, CAST(N'2023-07-11T15:29:08.940' AS DateTime), CAST(N'2023-09-29T16:53:31.290' AS DateTime), NULL)
INSERT [dbo].[EmployeeDetails] ([EmployeeDeatilId], [EmployeeId], [ProfileImage], [Experience], [JoiningDate], [ReportingPersonId], [CardNo], [Grade], [DepartmentId], [Designation], [SittingPlace], [NotificationTypeResolutionChanged], [NotificationOnAssignedWorkItemChangeByTeamMember], [NotificationCommnetOnWork], [NotificationAssignedWork], [NotificationDailyAlertEmail], [NotificationOnCreatedWorkItemChangeByTeamMember], [PcOrLaptopNumber], [IsPrimaryPC], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (5, 2, NULL, N'9', CAST(N'2012-07-01' AS Date), 2, 1500, 5, 1, N'Seniour software engineer', N'TatvaSoft House - Third Floor - OL-2', 0, 0, 0, 0, 0, 0, N'PCA27', 0, CAST(N'2023-09-05T14:31:28.207' AS DateTime), CAST(N'2023-09-05T14:31:28.210' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[EmployeeDetails] OFF
SET IDENTITY_INSERT [dbo].[EmployeeShift] ON 

INSERT [dbo].[EmployeeShift] ([EmployeeShiftId], [EmployeeId], [ShiftCode], [ShiftStartTime], [ShiftEndTime], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 1, N'GEN_0900_1830', 9.5, 6.5, CAST(N'2023-09-26T14:05:28.667' AS DateTime), CAST(N'2023-09-26T14:05:28.667' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[EmployeeShift] OFF
SET IDENTITY_INSERT [dbo].[EmployeeTimeLog] ON 

INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 1, CAST(N'2023-07-17' AS Date), 0, 9, 18.5, 0, CAST(N'2023-07-17T14:07:37.953' AS DateTime), CAST(N'2023-07-17T14:22:30.033' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 1, CAST(N'2023-07-17' AS Date), 0, 9, 18.5, 0, CAST(N'2023-07-17T14:12:56.143' AS DateTime), CAST(N'2023-07-17T14:22:30.033' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (3, 1, CAST(N'2023-07-17' AS Date), 0, 9, 18.5, 0, CAST(N'2023-07-17T14:13:21.497' AS DateTime), CAST(N'2023-07-17T14:22:30.033' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (4, 1, CAST(N'2023-07-17' AS Date), 0, 9, 18.5, 0, CAST(N'2023-07-17T14:13:32.597' AS DateTime), CAST(N'2023-07-17T14:22:30.033' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (7, 1, CAST(N'2023-08-17' AS Date), NULL, 9, 18.5, 0, CAST(N'2023-08-17T15:06:24.647' AS DateTime), CAST(N'2023-09-20T16:51:25.870' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (13, 1, CAST(N'2023-08-18' AS Date), 0, 9, 18.5, 0, CAST(N'2023-08-18T11:00:28.457' AS DateTime), CAST(N'2023-08-18T18:25:17.790' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (14, 1, CAST(N'2023-08-21' AS Date), 0, 9, 18.5, 0, CAST(N'2023-08-21T09:56:27.410' AS DateTime), CAST(N'2023-08-21T16:57:11.547' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (15, 1, CAST(N'2023-08-22' AS Date), 0, 9, 18.5, 0, CAST(N'2023-08-22T11:49:46.307' AS DateTime), CAST(N'2023-08-22T11:49:46.310' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (16, 1, CAST(N'2023-08-25' AS Date), 0, 9, 18.5, 0, CAST(N'2023-08-25T14:57:46.460' AS DateTime), CAST(N'2023-08-25T14:57:46.463' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (17, 1, CAST(N'2023-08-29' AS Date), 0, 9, 18.5, 0, CAST(N'2023-08-29T16:47:45.057' AS DateTime), CAST(N'2023-08-29T16:58:40.200' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (18, 1, CAST(N'2023-08-31' AS Date), 0, 9, 18.5, 0, CAST(N'2023-08-31T18:31:41.313' AS DateTime), CAST(N'2023-08-31T18:31:41.317' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (19, 1, CAST(N'2023-09-04' AS Date), 0, 9, 18.5, 0, CAST(N'2023-09-04T09:38:26.273' AS DateTime), CAST(N'2023-09-04T09:38:26.277' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (20, 1, CAST(N'2023-09-08' AS Date), 0, 9, 18.5, 0, CAST(N'2023-09-08T09:25:50.750' AS DateTime), CAST(N'2023-09-08T09:25:50.750' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (21, 1, CAST(N'2023-09-13' AS Date), 0, 9, 18.5, 0, CAST(N'2023-09-13T15:02:51.427' AS DateTime), CAST(N'2023-09-13T15:02:51.430' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (22, 1, CAST(N'2023-09-14' AS Date), 0, 9, 18.5, 0, CAST(N'2023-09-14T18:18:34.110' AS DateTime), CAST(N'2023-09-14T18:18:34.113' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (23, 1, CAST(N'2023-09-20' AS Date), 0, 9, 18.5, 0, CAST(N'2023-09-20T17:50:31.563' AS DateTime), CAST(N'2023-09-20T17:50:31.567' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (24, 1, CAST(N'2023-09-21' AS Date), 0, 9, 12.5, 1, CAST(N'2023-09-21T14:20:17.267' AS DateTime), CAST(N'2023-09-26T18:33:19.493' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (25, 1, CAST(N'2023-09-21' AS Date), 0, 13.5, 18.5, 0, CAST(N'2023-09-22T14:11:37.210' AS DateTime), CAST(N'2023-09-26T18:29:43.780' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (26, 1, CAST(N'2023-09-26' AS Date), 0, 9, 18.5, 0, CAST(N'2023-09-26T13:21:28.193' AS DateTime), CAST(N'2023-09-26T17:15:35.090' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (27, 1, CAST(N'2023-09-28' AS Date), 0, 9, 18.5, 0, CAST(N'2023-09-28T10:34:29.173' AS DateTime), CAST(N'2023-09-28T10:34:29.177' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (28, 1, CAST(N'2023-09-29' AS Date), 0, 0, 0, 0, CAST(N'2023-09-29T13:23:16.240' AS DateTime), CAST(N'2023-09-29T17:27:44.750' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (29, 1, CAST(N'2023-10-05' AS Date), 0, 9, 18.5, 0, CAST(N'2023-10-05T15:53:38.620' AS DateTime), CAST(N'2023-10-05T15:53:38.620' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (30, 1, CAST(N'2023-10-06' AS Date), 0, 9, 18.5, 0, CAST(N'2023-10-06T17:35:38.520' AS DateTime), CAST(N'2023-10-06T17:35:38.523' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (31, 1, CAST(N'2023-10-09' AS Date), 0, 9, 13, 0, CAST(N'2023-10-09T15:10:18.207' AS DateTime), CAST(N'2023-10-09T18:30:18.820' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (32, 1, CAST(N'2023-10-10' AS Date), 0, 9, 18.5, 0, CAST(N'2023-10-10T09:49:03.623' AS DateTime), CAST(N'2023-10-10T09:49:03.627' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (33, 1, CAST(N'2023-10-11' AS Date), 0, 9, 18.5, 0, CAST(N'2023-10-11T09:27:45.660' AS DateTime), CAST(N'2023-10-11T09:27:45.660' AS DateTime), NULL)
INSERT [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId], [EmployeeId], [LogDate], [LateComer], [FirstInTime], [LastOutTime], [TotalOutHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (34, 1, CAST(N'2023-10-12' AS Date), 0, 9, 18.5, 0, CAST(N'2023-10-12T11:34:58.540' AS DateTime), CAST(N'2023-10-12T11:34:58.540' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[EmployeeTimeLog] OFF
SET IDENTITY_INSERT [dbo].[Holidays] ON 

INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (1, N'Uttrayan', CAST(N'2023-01-14' AS Date), CAST(N'2023-08-22T10:26:21.580' AS DateTime), CAST(N'2023-08-22T10:26:21.583' AS DateTime), NULL)
INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (2, N'Republic Day', CAST(N'2023-01-26' AS Date), CAST(N'2023-08-22T10:26:50.657' AS DateTime), CAST(N'2023-08-22T10:26:50.660' AS DateTime), NULL)
INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (3, N'Dhuleti', CAST(N'2023-03-08' AS Date), CAST(N'2023-08-22T10:27:17.087' AS DateTime), CAST(N'2023-08-22T10:27:17.087' AS DateTime), NULL)
INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (4, N'Independence Day', CAST(N'2023-08-15' AS Date), CAST(N'2023-08-22T10:28:18.150' AS DateTime), CAST(N'2023-08-22T10:28:18.153' AS DateTime), NULL)
INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (5, N'Rakshabandhan', CAST(N'2023-08-30' AS Date), CAST(N'2023-08-22T10:28:39.737' AS DateTime), CAST(N'2023-08-22T10:28:39.740' AS DateTime), NULL)
INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (6, N'Janmashtami', CAST(N'2023-09-07' AS Date), CAST(N'2023-08-22T10:29:21.257' AS DateTime), CAST(N'2023-08-22T10:29:21.260' AS DateTime), NULL)
INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (7, N'Gandhi Jayanti ', CAST(N'2023-10-02' AS Date), CAST(N'2023-08-22T10:29:55.093' AS DateTime), CAST(N'2023-08-22T10:29:55.093' AS DateTime), NULL)
INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (8, N'Dusshera', CAST(N'2023-10-24' AS Date), CAST(N'2023-08-22T10:30:39.863' AS DateTime), CAST(N'2023-08-22T10:37:33.260' AS DateTime), NULL)
INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (9, N'Gujarati New Year', CAST(N'2023-11-13' AS Date), CAST(N'2023-08-22T10:35:48.763' AS DateTime), CAST(N'2023-08-22T10:35:48.767' AS DateTime), NULL)
INSERT [dbo].[Holidays] ([Id], [Name], [Date], [CreatedAt], [UpdatedAt], [IsDeleted]) VALUES (10, N'Bhai Dooj', CAST(N'2023-11-14' AS Date), CAST(N'2023-08-22T10:36:12.103' AS DateTime), CAST(N'2023-08-22T10:36:12.103' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Holidays] OFF
SET IDENTITY_INSERT [dbo].[LeaveRequest] ON 

INSERT [dbo].[LeaveRequest] ([LeaveRequestId], [EmployeeId], [ReportingPersonId], [ReasonForLeave], [LeaveStartDate], [LeaveEndDate], [StartDateAttendanceOption], [EndDateAttendanceOption], [IsAdhocLeave], [AdhocLeaveStatus], [PhoneNumber], [AlternatePhoneNumber], [AvailibiltyOnPhone], [AvailibiltyInCity], [LeaveRequestStatus], [CreatedAt], [UpdateAt], [IsDeleted], [ApprovedDate]) VALUES (3, 1, 2, N'Vacation', CAST(N'2023-09-10' AS Date), CAST(N'2023-09-11' AS Date), 1, 1, 1, N'InformByTm', 7046545956, NULL, 1, 1, N'Approved', CAST(N'2023-09-28T17:04:38.603' AS DateTime), CAST(N'2023-09-28T17:05:32.950' AS DateTime), NULL, NULL)
INSERT [dbo].[LeaveRequest] ([LeaveRequestId], [EmployeeId], [ReportingPersonId], [ReasonForLeave], [LeaveStartDate], [LeaveEndDate], [StartDateAttendanceOption], [EndDateAttendanceOption], [IsAdhocLeave], [AdhocLeaveStatus], [PhoneNumber], [AlternatePhoneNumber], [AvailibiltyOnPhone], [AvailibiltyInCity], [LeaveRequestStatus], [CreatedAt], [UpdateAt], [IsDeleted], [ApprovedDate]) VALUES (4, 1, 2, N'Sick', CAST(N'2023-09-28' AS Date), CAST(N'2023-09-29' AS Date), 1, 1, 0, N'InformByTm', 7046545956, 7046024812, 0, 0, N'Cancelled', CAST(N'2023-09-28T17:07:49.823' AS DateTime), CAST(N'2023-10-04T17:21:25.900' AS DateTime), NULL, NULL)
INSERT [dbo].[LeaveRequest] ([LeaveRequestId], [EmployeeId], [ReportingPersonId], [ReasonForLeave], [LeaveStartDate], [LeaveEndDate], [StartDateAttendanceOption], [EndDateAttendanceOption], [IsAdhocLeave], [AdhocLeaveStatus], [PhoneNumber], [AlternatePhoneNumber], [AvailibiltyOnPhone], [AvailibiltyInCity], [LeaveRequestStatus], [CreatedAt], [UpdateAt], [IsDeleted], [ApprovedDate]) VALUES (5, 1, 2, N'Sick Leave', CAST(N'2023-10-04' AS Date), CAST(N'2023-10-04' AS Date), 1, 1, 0, N'Inform', 7046545956, 9662374514, 1, 1, N'Pending', CAST(N'2023-10-04T11:52:05.910' AS DateTime), CAST(N'2023-10-06T17:37:58.890' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[LeaveRequest] OFF
SET IDENTITY_INSERT [dbo].[NewsAndDetails] ON 

INSERT [dbo].[NewsAndDetails] ([NewsId], [NewsTitle], [NewsDescription], [NewsDate], [DocumentPath], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, N'Holiday List - 2023
', NULL, CAST(N'2022-12-15' AS Date), N'http://web2.anasource.com/workspace/document/office-documents/Holiday%20List%202023.pdf', CAST(N'2023-07-13T18:28:22.250' AS DateTime), CAST(N'2023-07-13T18:28:22.250' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[NewsAndDetails] OFF
SET IDENTITY_INSERT [dbo].[PersonalDetails] ON 

INSERT [dbo].[PersonalDetails] ([EmployeeInfoId], [EmployeeId], [DateOfBirth], [Gender], [MaritalStatus], [BloodGroup], [AnyDiseases], [ContactNumber], [AlternateNumber], [AccountNumber], [PanCardNumber], [PresentAddress], [PermanentAddress], [ProvidentFundNumber], [NSRNumber], [CompanyMail], [PersonalMail], [Messengers], [PassportNumber], [DateOfIssue], [PlaceOfIssue], [NameInPassport], [ValidUpto], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 1, CAST(N'2002-08-29' AS Date), 1, 0, N'B+', N'NILL', 7046545956, 9662374514, N'01234567890', N'3CJDKJL1256', N'Ahmedabad, Gujrat', N'Ahmedabad, Gujrat', 0, 0, N'tatva_pci243@outlook.com', N'tatva_pci243@outlook.com', N'skype', N'2sd35s', CAST(N'2021-04-29' AS Date), N'Ahmedabad', N'Rohit Tekchandani', CAST(N'2022-03-21' AS Date), CAST(N'2023-07-12T09:54:27.250' AS DateTime), CAST(N'2023-09-29T13:22:21.677' AS DateTime), NULL)
INSERT [dbo].[PersonalDetails] ([EmployeeInfoId], [EmployeeId], [DateOfBirth], [Gender], [MaritalStatus], [BloodGroup], [AnyDiseases], [ContactNumber], [AlternateNumber], [AccountNumber], [PanCardNumber], [PresentAddress], [PermanentAddress], [ProvidentFundNumber], [NSRNumber], [CompanyMail], [PersonalMail], [Messengers], [PassportNumber], [DateOfIssue], [PlaceOfIssue], [NameInPassport], [ValidUpto], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 2, CAST(N'2023-08-13' AS Date), 1, 1, N'string', N'string', 0, 0, N'string', N'string', N'string', N'string', 0, 0, N'tatva_pci243@outlook.com', N'tatva_pci243@outlook.com', N'string', N'string', CAST(N'2023-07-13' AS Date), N'string', N'string', CAST(N'2023-07-13' AS Date), CAST(N'2023-07-13T14:21:56.887' AS DateTime), CAST(N'2023-08-10T10:38:52.970' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[PersonalDetails] OFF
SET IDENTITY_INSERT [dbo].[ProjectDescription] ON 

INSERT [dbo].[ProjectDescription] ([ProjectId], [ProjectCode], [ProjectName], [ProjectType], [ProjectStatus], [ProjectTechId], [DueDate], [EndDate], [TotalHours], [AssignedHours], [WorkHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, N'7fvdvs548', N'WorkSpace', 1, 1, 1, CAST(N'2023-07-31' AS Date), CAST(N'2023-08-10' AS Date), 52, 15, 12, CAST(N'2023-07-11T17:27:38.233' AS DateTime), CAST(N'2023-07-11T17:27:38.233' AS DateTime), NULL)
INSERT [dbo].[ProjectDescription] ([ProjectId], [ProjectCode], [ProjectName], [ProjectType], [ProjectStatus], [ProjectTechId], [DueDate], [EndDate], [TotalHours], [AssignedHours], [WorkHours], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, N'87dfdfg12', N'Bench', 1, 1, 1, CAST(N'2023-07-31' AS Date), CAST(N'2023-08-12' AS Date), 45, 15, 12, CAST(N'2023-07-17T09:51:21.407' AS DateTime), CAST(N'2023-07-17T09:51:21.407' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[ProjectDescription] OFF
SET IDENTITY_INSERT [dbo].[ProjectTech] ON 

INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, N'.NET', CAST(N'2023-07-11T17:26:45.703' AS DateTime), CAST(N'2023-08-18T12:29:07.200' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, N'Android', CAST(N'2023-08-18T12:29:11.963' AS DateTime), CAST(N'2023-08-18T12:29:11.963' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (3, N'BizTalk', CAST(N'2023-08-18T12:29:18.360' AS DateTime), CAST(N'2023-08-18T12:29:18.360' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (4, N'BlackBerry', CAST(N'2023-08-18T12:29:24.783' AS DateTime), CAST(N'2023-08-18T12:29:24.783' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (5, N'Classic ASP', CAST(N'2023-08-18T12:29:29.063' AS DateTime), CAST(N'2023-08-18T12:29:29.067' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (6, N'Database', CAST(N'2023-08-18T12:29:35.753' AS DateTime), CAST(N'2023-08-18T12:29:35.753' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (7, N'Designing', CAST(N'2023-08-18T12:29:41.777' AS DateTime), CAST(N'2023-08-18T12:29:41.777' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (8, N'Flex', CAST(N'2023-08-18T12:29:48.993' AS DateTime), CAST(N'2023-08-18T12:29:48.993' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (9, N'iPhone', CAST(N'2023-08-18T12:29:54.617' AS DateTime), CAST(N'2023-08-18T12:29:54.617' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10, N'Java', CAST(N'2023-08-18T12:30:00.260' AS DateTime), CAST(N'2023-08-18T12:30:00.260' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (11, N'LAMP', CAST(N'2023-08-18T12:30:05.583' AS DateTime), CAST(N'2023-08-18T12:30:05.583' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (12, N'MEAN', CAST(N'2023-08-18T12:30:12.663' AS DateTime), CAST(N'2023-08-18T12:30:12.663' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (13, N'Stack', CAST(N'2023-08-18T12:30:18.423' AS DateTime), CAST(N'2023-08-18T12:30:18.423' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (14, N'Mobile', CAST(N'2023-08-18T12:30:24.140' AS DateTime), CAST(N'2023-08-18T12:30:24.140' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (15, N'PHP', CAST(N'2023-08-18T12:30:29.353' AS DateTime), CAST(N'2023-08-18T12:30:29.353' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (16, N'SEO', CAST(N'2023-08-18T12:30:35.487' AS DateTime), CAST(N'2023-08-18T12:30:35.490' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (17, N'SharePoint', CAST(N'2023-08-18T12:30:42.200' AS DateTime), CAST(N'2023-08-18T12:30:42.200' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (18, N'Silverlight', CAST(N'2023-08-18T12:30:48.453' AS DateTime), CAST(N'2023-08-18T12:30:48.453' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (19, N'Testing', CAST(N'2023-08-18T12:30:54.700' AS DateTime), CAST(N'2023-08-18T12:30:54.700' AS DateTime), NULL)
INSERT [dbo].[ProjectTech] ([ProjectTechId], [ProjectTechName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (20, N'Xamarin', CAST(N'2023-08-18T12:30:58.300' AS DateTime), CAST(N'2023-08-18T12:30:58.300' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[ProjectTech] OFF
SET IDENTITY_INSERT [dbo].[ProjectWorkitems] ON 

INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (15, 1, 1, NULL, N'Test Title', 1, 5, N'High', 3, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 50, 5, 50, 1, 2, 1, 1, N'Sample Description', CAST(N'2023-07-17T17:29:42.603' AS DateTime), CAST(N'2023-11-02T18:20:49.923' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (16, 1, 1, NULL, N'WorkItem1', 1, 1, N'Medium', 3, CAST(N'2023-07-16T00:00:00.000' AS DateTime), CAST(N'2023-07-16T00:00:00.000' AS DateTime), 8.5, 8.5, 0, 1, 2, 0, 1, NULL, CAST(N'2023-07-17T17:30:36.577' AS DateTime), CAST(N'2023-11-02T18:32:28.757' AS DateTime), 1)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (17, 1, 1, NULL, N'Work Item', 1, 1, N'High', 5, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 10.5, 5.5, 5, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:10.137' AS DateTime), CAST(N'2023-11-02T18:20:59.080' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (18, 1, 1, NULL, N'Unassigned Work Items', 1, 3, N'Medium', 4, CAST(N'2023-07-13T00:00:00.000' AS DateTime), CAST(N'2023-07-14T00:00:00.000' AS DateTime), 10.5, 10.5, 4, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:10.850' AS DateTime), CAST(N'2023-11-02T18:20:59.850' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (19, 1, 1, NULL, N'Work Item', 1, 1, N'High', 1, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 10.5, 5.5, 5, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:19.067' AS DateTime), CAST(N'2023-11-02T18:21:00.493' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (20, 1, 1, NULL, N'Work Item', 1, 1, N'High', 1, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 10.5, 5.5, 5, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:23.060' AS DateTime), CAST(N'2023-11-02T18:21:02.240' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (21, 1, 1, NULL, N'Work Item', 1, 1, N'High', 5, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 10.5, 5.5, 5, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:23.433' AS DateTime), CAST(N'2023-11-02T18:21:02.853' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (22, 1, 1, NULL, N'Work Items', 1, 1, N'High', 1, CAST(N'2023-07-16T00:00:00.000' AS DateTime), CAST(N'2023-07-17T00:00:00.000' AS DateTime), 10.5, 10.5, 10.5, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:23.867' AS DateTime), CAST(N'2023-11-02T18:16:23.453' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (23, 1, 1, NULL, N'Work Item', 1, 1, N'High', 5, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 10.5, 8, 2.5, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:28.483' AS DateTime), CAST(N'2023-11-02T18:18:05.830' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (24, 1, 1, NULL, N'Work Item', 1, 1, N'High', 5, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 11.5, 5.5, 5, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:28.933' AS DateTime), CAST(N'2023-11-02T18:17:06.913' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (25, 1, 1, NULL, N'Updated Work Item1', 1, 2, N'Low', 5, CAST(N'2023-12-13T00:00:00.000' AS DateTime), CAST(N'2023-12-14T00:00:00.000' AS DateTime), 10.5, 10.5, 4, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:32.040' AS DateTime), CAST(N'2023-11-02T18:21:23.637' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (26, 1, 1, NULL, N'Work Item', 1, 1, N'High', 5, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 10.5, 5.5, 5, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:36.760' AS DateTime), CAST(N'2023-11-02T18:16:12.700' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (27, 1, 1, NULL, N'Work Item', 1, 1, N'High', 5, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 10.5, 6.5, 4, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:37.270' AS DateTime), CAST(N'2023-11-02T18:16:16.970' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (28, 1, 1, NULL, N'Work Item', 1, 1, N'High', 5, CAST(N'2023-07-17T00:00:00.000' AS DateTime), CAST(N'2023-07-18T00:00:00.000' AS DateTime), 10.5, 8.5, 2, 1, 2, 0, 1, N'Sample Description', CAST(N'2023-07-17T17:31:37.773' AS DateTime), CAST(N'2023-11-02T18:16:20.303' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (36, 1, 1, NULL, N'Working with api for workspace', 1, 1, N'Medium', 5, CAST(N'2023-07-19T05:52:28.343' AS DateTime), CAST(N'2023-07-19T05:52:28.343' AS DateTime), 8.5, 8.5, 0, 1, 1, 0, 0, N'', CAST(N'2023-07-19T11:25:08.997' AS DateTime), CAST(N'2023-11-02T18:32:31.867' AS DateTime), 1)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (50, 1, 1, NULL, N'Working on frontend angular for workspace project', 1, 1, N'Medium', 2, CAST(N'2023-09-04T08:01:47.937' AS DateTime), CAST(N'2023-09-04T08:01:47.937' AS DateTime), 8, 8, 0, 1, 1, 0, 1, N'<font face="Comic Sans MS" size="5">Project details</font>', CAST(N'2023-09-04T13:33:17.057' AS DateTime), CAST(N'2023-11-02T18:13:20.670' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (51, 1, 1, NULL, N'Working on frontend angular for workspace project', 1, 1, N'Medium', 4, CAST(N'2023-09-06T04:11:20.677' AS DateTime), CAST(N'2023-09-06T04:11:20.677' AS DateTime), 8.5, 0, 8.5, 1, 1, 0, 1, NULL, CAST(N'2023-09-06T09:41:33.830' AS DateTime), CAST(N'2023-11-02T18:13:24.173' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (52, NULL, 1, NULL, N'Working on frontend angular for workspace project', 1, 5, N'Medium', 5, CAST(N'2023-09-06T04:59:23.393' AS DateTime), CAST(N'2023-09-06T04:59:23.393' AS DateTime), 8.5, 3.5, 5, 1, 1, 0, 1, NULL, CAST(N'2023-09-06T10:29:38.293' AS DateTime), CAST(N'2023-11-02T18:13:26.853' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (53, 1, 1, NULL, N'Working on frontend with angular for workspace project', 1, 5, N'Medium', 5, CAST(N'2023-09-14T11:33:26.787' AS DateTime), CAST(N'2023-09-14T11:33:26.787' AS DateTime), 8.5, 8.5, 0, 1, 1, 0, 1, NULL, CAST(N'2023-09-14T17:03:42.847' AS DateTime), CAST(N'2023-11-02T18:32:36.183' AS DateTime), 1)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (54, 1, 1, NULL, N'Working on frontend angular for workspace project', 1, 5, N'Medium', 4, CAST(N'2023-09-14T11:44:13.750' AS DateTime), CAST(N'2023-09-14T11:44:13.750' AS DateTime), 8, 0, 8, 1, 1, 0, 1, N'<font face="Comic Sans MS" size="5">working onit</font>', CAST(N'2023-09-14T17:14:21.083' AS DateTime), CAST(N'2023-11-02T18:13:29.830' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (55, 1, 1, 1, N'some items', 2, 3, N'Low', 3, CAST(N'2023-08-29T00:00:00.000' AS DateTime), CAST(N'2023-08-30T00:00:00.000' AS DateTime), 8.1999998092651367, 8.1999998092651367, 0, 1, 1, 0, 1, N'some discription', CAST(N'2023-09-14T18:22:41.843' AS DateTime), CAST(N'2023-11-02T18:21:19.893' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (56, 1, 1, NULL, N'Working on frontend angular for workspace project', 1, 5, N'Medium', 5, CAST(N'2023-09-18T08:29:02.553' AS DateTime), CAST(N'2023-09-18T08:29:02.553' AS DateTime), 8.5, 0, 8.5, 1, 1, 0, 1, NULL, CAST(N'2023-09-18T13:59:12.683' AS DateTime), CAST(N'2023-11-02T18:13:37.783' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (57, 1, 1, NULL, N'Working on frontend angular for work space project', 1, 5, N'Medium', 5, CAST(N'2023-09-25T10:31:35.137' AS DateTime), CAST(N'2023-09-25T10:31:35.137' AS DateTime), 0, 0, 29, 1, 1, 0, 1, N'<font face="Comic Sans MS" size="5">time sheet competed&nbsp;work items started</font>', CAST(N'2023-09-25T16:02:01.387' AS DateTime), CAST(N'2023-11-02T18:21:13.990' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (58, 1, 1, 2, N'Working on frontend angular for workspace project', 1, 5, N'Medium', 5, CAST(N'2023-09-28T09:29:38.407' AS DateTime), CAST(N'2023-09-28T09:29:38.407' AS DateTime), 8.5, 0, 9, 1, 1, 0, 1, NULL, CAST(N'2023-09-28T14:59:45.553' AS DateTime), CAST(N'2023-11-02T18:11:04.350' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (59, 1, 1, NULL, N'Working on frontend angular for workspace project', 2, 5, N'Medium', 2, CAST(N'2023-10-05T04:35:31.010' AS DateTime), CAST(N'2023-10-05T04:35:31.010' AS DateTime), 8.5, 8.5, 0, 1, 1, 0, 1, NULL, CAST(N'2023-10-05T10:05:46.520' AS DateTime), CAST(N'2023-11-02T18:11:07.270' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (60, 1, 1, NULL, N'Working on frontend angular for workspace project', 1, 5, N'Medium', 1, CAST(N'2023-10-10T07:54:37.430' AS DateTime), CAST(N'2023-10-10T07:54:37.430' AS DateTime), 8.5, 8.5, 0, 1, 1, 0, 1, NULL, CAST(N'2023-10-10T13:24:45.447' AS DateTime), CAST(N'2023-11-02T18:11:12.293' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (61, 1, 1, NULL, N'Working on frontend angular for workspace project', 2, 5, N'Medium', 5, CAST(N'2023-10-12T06:02:48.707' AS DateTime), CAST(N'2023-10-12T06:02:48.707' AS DateTime), 8.5, 0, 8.5, 1, 1, 0, 1, NULL, CAST(N'2023-10-12T11:33:10.663' AS DateTime), CAST(N'2023-11-02T18:11:20.927' AS DateTime), 0)
INSERT [dbo].[ProjectWorkitems] ([ProjectWorkId], [EmployeeId], [ProjectId], [SubProjectId], [Title], [WorkGroupId], [WorkFlow], [ProjectWorkitemsPriority], [ProjectStatusId], [StartDate], [EndDate], [OriginalEstTime], [RemainingEstTime], [TotalWorkDone], [AssignedEmployeeId], [ReportedEmployeeId], [ReleasedToProduction], [RSI], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (77, 1, 1, NULL, N'new item just to delete', 1, 5, N'Medium', 1, CAST(N'2023-11-02T00:00:00.000' AS DateTime), CAST(N'2023-11-02T00:00:00.000' AS DateTime), 8, 8, 0, 1, 1, 0, 1, NULL, CAST(N'2023-11-02T17:21:13.807' AS DateTime), CAST(N'2023-11-02T18:15:46.430' AS DateTime), 0)
SET IDENTITY_INSERT [dbo].[ProjectWorkitems] OFF
SET IDENTITY_INSERT [dbo].[ServiceGroup] ON 

INSERT [dbo].[ServiceGroup] ([ServiceGroupId], [ServiceGroupIdtName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, N'HR', CAST(N'2023-09-28T17:43:23.390' AS DateTime), CAST(N'2023-09-28T17:43:23.393' AS DateTime), NULL)
INSERT [dbo].[ServiceGroup] ([ServiceGroupId], [ServiceGroupIdtName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, N'Accounts', CAST(N'2023-09-28T17:43:23.390' AS DateTime), CAST(N'2023-09-28T17:43:23.393' AS DateTime), NULL)
INSERT [dbo].[ServiceGroup] ([ServiceGroupId], [ServiceGroupIdtName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (3, N'Networking', CAST(N'2023-09-28T17:43:23.390' AS DateTime), CAST(N'2023-09-28T17:43:23.393' AS DateTime), NULL)
INSERT [dbo].[ServiceGroup] ([ServiceGroupId], [ServiceGroupIdtName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (4, N'Admin', CAST(N'2023-09-28T17:43:23.390' AS DateTime), CAST(N'2023-09-28T17:43:23.393' AS DateTime), NULL)
INSERT [dbo].[ServiceGroup] ([ServiceGroupId], [ServiceGroupIdtName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (5, N'Technology CEO', CAST(N'2023-09-28T17:43:23.390' AS DateTime), CAST(N'2023-09-28T17:43:23.393' AS DateTime), NULL)
INSERT [dbo].[ServiceGroup] ([ServiceGroupId], [ServiceGroupIdtName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (6, N'Internal Systems', CAST(N'2023-09-28T17:43:23.390' AS DateTime), CAST(N'2023-09-28T17:43:23.393' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[ServiceGroup] OFF
SET IDENTITY_INSERT [dbo].[ServiceRequest] ON 

INSERT [dbo].[ServiceRequest] ([ServiceRequestId], [EmployeeId], [ReportingPersonId], [ServiceGroupId], [CategoryId], [SubCategoryId], [ServiceRequetPriority], [ServiceDetails], [CreatedAt], [UpdateAt], [IsDeleted], [Comments]) VALUES (46, 1, 2, 2, 2, 5, N'High', N'How Taxation work', CAST(N'2023-10-09T08:27:50.913' AS DateTime), CAST(N'2023-10-09T13:57:51.530' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[ServiceRequest] OFF
SET IDENTITY_INSERT [dbo].[ServiceRequestHistory] ON 

INSERT [dbo].[ServiceRequestHistory] ([ServiceRequestHistoryId], [ServiceRequestId], [ServiceEmployeeId], [Comments], [AttachmentsDocumentPath], [RequestStatus], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (36, 46, 1, NULL, NULL, 2, CAST(N'2023-10-09T12:03:36.897' AS DateTime), CAST(N'2023-10-09T12:03:36.900' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[ServiceRequestHistory] OFF
SET IDENTITY_INSERT [dbo].[SubCategory] ON 

INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (2, 1, N'ShiftChange', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (3, 1, N'Other', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (4, 2, N'PayrollQuery', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (5, 2, N'Other', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (6, 3, N'All Microsoft Products', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (7, 3, N'All Adobe Products', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (8, 3, N'Third Party S/W which needs license', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (9, 3, N'All software which needs license', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (10, 4, N'LCD/LED issue', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (11, 4, N'Keyboard & mouse issue', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (12, 4, N'CPU issue', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (13, 4, N'Headphone issue', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (14, 5, N'LAN issue', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (15, 5, N'Net issue', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (16, 5, N'VPN issue', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (17, 6, N'External Communication', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (18, 6, N'Virtual MAchine', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (19, 6, N'Wifi in personal phone', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (20, 6, N'Network use for client HW', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (21, 6, N'Other', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (22, 6, N'Gmail/Skype/MSN userCreation', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (23, 7, N'Net access', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (24, 7, N'Firewall Rights', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (25, 7, N'Windows rights', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (26, 7, N'SVN rights', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (27, 7, N'SQL rights', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (28, 8, N'Create database', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (29, 8, N'Backup database', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (30, 8, N'Restore database', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (31, 8, N'Downloads', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (32, 8, N'Other', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (33, 8, N'Browser upgrade', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (34, 9, N'laptop', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (35, 9, N'Headphone', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (36, 9, N'Upgrade PC', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (37, 9, N'Other Hardware', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (38, 9, N'Phone & Tablets', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (39, 10, N'Infrastructure issue', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 3)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (40, 10, N'Client Pickup/ drop request', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 1)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (41, 12, N'Microsoft Technologies', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (42, 12, N'Clientside Technologies', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (43, 12, N'PHP', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (44, 12, N'Java', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (45, 12, N'Mobile', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (46, 13, N'Microsoft Technologies', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (47, 13, N'Clientside Technologies', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (48, 13, N'PHP', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (49, 13, N'Java', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (50, 13, N'Mobile', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (51, 13, N'Other', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (52, 14, N'Microsoft Technologies', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (53, 14, N'Clientside Technologie', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (54, 14, N'PHP', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (55, 14, N'Java', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (56, 14, N'Mobile', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (57, 14, N'Other', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (58, 15, N'Microsoft Technologies', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (59, 15, N'Clientside Technologies', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (60, 15, N'PHP', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (61, 15, N'Java', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (62, 15, N'Mobile', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (63, 15, N'Other', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (64, 16, N'Microsoft Technologies', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (65, 16, N'Clientside Technologies', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (66, 16, N'PHP', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (67, 16, N'Java', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (68, 16, N'Mobile', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
INSERT [dbo].[SubCategory] ([SubCategoryId], [CategoryId], [SubCategoryName], [CreatedAt], [UpdateAt], [IsDeleted], [ServicePersonId]) VALUES (69, 16, N'Other', CAST(N'2023-09-28T17:48:44.740' AS DateTime), CAST(N'2023-09-28T17:48:44.740' AS DateTime), NULL, 2)
SET IDENTITY_INSERT [dbo].[SubCategory] OFF
SET IDENTITY_INSERT [dbo].[SubProject] ON 

INSERT [dbo].[SubProject] ([SubProjectId], [ProjectId], [SubProjectName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 1, N'SB1', CAST(N'2023-07-19T14:40:51.607' AS DateTime), CAST(N'2023-07-19T14:40:51.607' AS DateTime), NULL)
INSERT [dbo].[SubProject] ([SubProjectId], [ProjectId], [SubProjectName], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 1, N'SB2', CAST(N'2023-07-19T14:41:03.503' AS DateTime), CAST(N'2023-07-19T14:41:26.913' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[SubProject] OFF
SET IDENTITY_INSERT [dbo].[SystemConfigurationDetails] ON 

INSERT [dbo].[SystemConfigurationDetails] ([SystemConfigurationDetailsID], [EmployeeId], [SystemType], [SystemItemModel], [SystemQuantity], [HasTakenHome], [SerailId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 1, 1, N'DH67BL', 1, 0, 45862235, CAST(N'2023-07-11T17:39:23.647' AS DateTime), CAST(N'2023-08-10T14:26:19.027' AS DateTime), NULL)
INSERT [dbo].[SystemConfigurationDetails] ([SystemConfigurationDetailsID], [EmployeeId], [SystemType], [SystemItemModel], [SystemQuantity], [HasTakenHome], [SerailId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 1, 2, N'USB KB', 1, 0, 48542155, CAST(N'2023-08-10T14:30:13.900' AS DateTime), CAST(N'2023-08-10T14:30:13.900' AS DateTime), NULL)
INSERT [dbo].[SystemConfigurationDetails] ([SystemConfigurationDetailsID], [EmployeeId], [SystemType], [SystemItemModel], [SystemQuantity], [HasTakenHome], [SerailId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (3, 1, 3, N'USB Mouse', 1, 0, 44545454, CAST(N'2023-08-10T14:31:46.180' AS DateTime), CAST(N'2023-08-10T14:31:46.183' AS DateTime), NULL)
INSERT [dbo].[SystemConfigurationDetails] ([SystemConfigurationDetailsID], [EmployeeId], [SystemType], [SystemItemModel], [SystemQuantity], [HasTakenHome], [SerailId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (4, 1, 4, N'400W SMPS', 1, 0, 12154616, CAST(N'2023-08-10T14:32:25.997' AS DateTime), CAST(N'2023-08-10T14:32:25.997' AS DateTime), NULL)
INSERT [dbo].[SystemConfigurationDetails] ([SystemConfigurationDetailsID], [EmployeeId], [SystemType], [SystemItemModel], [SystemQuantity], [HasTakenHome], [SerailId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (5, 1, 5, N'500GB SATA', 1, 0, 55454542, CAST(N'2023-08-10T14:36:49.407' AS DateTime), CAST(N'2023-08-10T14:36:49.407' AS DateTime), NULL)
INSERT [dbo].[SystemConfigurationDetails] ([SystemConfigurationDetailsID], [EmployeeId], [SystemType], [SystemItemModel], [SystemQuantity], [HasTakenHome], [SerailId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (6, 1, 6, N'Intel i5 2500k', 1, 0, 44588789, CAST(N'2023-08-10T14:37:34.380' AS DateTime), CAST(N'2023-08-10T14:37:34.380' AS DateTime), NULL)
INSERT [dbo].[SystemConfigurationDetails] ([SystemConfigurationDetailsID], [EmployeeId], [SystemType], [SystemItemModel], [SystemQuantity], [HasTakenHome], [SerailId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (7, 1, 7, N'Zion 8GB DDR4 2400 MHz', 1, 0, 48484848, CAST(N'2023-08-10T14:38:43.610' AS DateTime), CAST(N'2023-08-10T14:38:43.627' AS DateTime), NULL)
INSERT [dbo].[SystemConfigurationDetails] ([SystemConfigurationDetailsID], [EmployeeId], [SystemType], [SystemItemModel], [SystemQuantity], [HasTakenHome], [SerailId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (8, 1, 8, N'22'''' LED', 1, 0, 54648479, CAST(N'2023-08-10T14:39:06.720' AS DateTime), CAST(N'2023-08-10T14:39:06.720' AS DateTime), NULL)
INSERT [dbo].[SystemConfigurationDetails] ([SystemConfigurationDetailsID], [EmployeeId], [SystemType], [SystemItemModel], [SystemQuantity], [HasTakenHome], [SerailId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (9, 1, 9, N'Frontech HF3448', 1, 0, 54897648, CAST(N'2023-08-10T14:39:49.283' AS DateTime), CAST(N'2023-08-10T14:39:49.287' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[SystemConfigurationDetails] OFF
SET IDENTITY_INSERT [dbo].[TraineeFeedback] ON 

INSERT [dbo].[TraineeFeedback] ([FeedbackId], [EmployeeId], [TraningId], [Attended], [IsFeedBackGiven], [FeedbackCourseCourseCoverage], [FeedbackCourseDelivery], [FeedbackCourseMaterial], [FeedbackCourseQuality], [FeedbackCourseAvailability], [FeedbackCourseManagements], [FeedbackFacultyKnowleage], [FeedbackFacultyPresentation], [FeedbackFacultyCoverage], [FeedbackFacultyExamples], [FeedbackFacultyLevel], [FeedbackSelfGain], [FeedbackSelfApplicability], [FeedbackOverallConduct], [SuggestionImprovements], [SuggestionCoverage]) VALUES (1, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL)
INSERT [dbo].[TraineeFeedback] ([FeedbackId], [EmployeeId], [TraningId], [Attended], [IsFeedBackGiven], [FeedbackCourseCourseCoverage], [FeedbackCourseDelivery], [FeedbackCourseMaterial], [FeedbackCourseQuality], [FeedbackCourseAvailability], [FeedbackCourseManagements], [FeedbackFacultyKnowleage], [FeedbackFacultyPresentation], [FeedbackFacultyCoverage], [FeedbackFacultyExamples], [FeedbackFacultyLevel], [FeedbackSelfGain], [FeedbackSelfApplicability], [FeedbackOverallConduct], [SuggestionImprovements], [SuggestionCoverage]) VALUES (2, 1, 1, 1, 1, 9, 8, 10, 8, 9, 10, 9, 10, 10, 9, 10, 9, 8, 9, N'NILL', N'NILL')
INSERT [dbo].[TraineeFeedback] ([FeedbackId], [EmployeeId], [TraningId], [Attended], [IsFeedBackGiven], [FeedbackCourseCourseCoverage], [FeedbackCourseDelivery], [FeedbackCourseMaterial], [FeedbackCourseQuality], [FeedbackCourseAvailability], [FeedbackCourseManagements], [FeedbackFacultyKnowleage], [FeedbackFacultyPresentation], [FeedbackFacultyCoverage], [FeedbackFacultyExamples], [FeedbackFacultyLevel], [FeedbackSelfGain], [FeedbackSelfApplicability], [FeedbackOverallConduct], [SuggestionImprovements], [SuggestionCoverage]) VALUES (3, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL)
INSERT [dbo].[TraineeFeedback] ([FeedbackId], [EmployeeId], [TraningId], [Attended], [IsFeedBackGiven], [FeedbackCourseCourseCoverage], [FeedbackCourseDelivery], [FeedbackCourseMaterial], [FeedbackCourseQuality], [FeedbackCourseAvailability], [FeedbackCourseManagements], [FeedbackFacultyKnowleage], [FeedbackFacultyPresentation], [FeedbackFacultyCoverage], [FeedbackFacultyExamples], [FeedbackFacultyLevel], [FeedbackSelfGain], [FeedbackSelfApplicability], [FeedbackOverallConduct], [SuggestionImprovements], [SuggestionCoverage]) VALUES (4, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL)
SET IDENTITY_INSERT [dbo].[TraineeFeedback] OFF
SET IDENTITY_INSERT [dbo].[TraineeTraning] ON 

INSERT [dbo].[TraineeTraning] ([TraningId], [Title], [Date], [Time], [Duration], [faculties], [category], [subCategory], [Type], [Status], [Location]) VALUES (1, N'Sql', CAST(N'2023-10-04T00:00:00.000' AS DateTime), 12, 2, N'Harsh Kumar', N'Technical', N'Sql', N'Open Nomination', N'Completed', N'Traning Room')
INSERT [dbo].[TraineeTraning] ([TraningId], [Title], [Date], [Time], [Duration], [faculties], [category], [subCategory], [Type], [Status], [Location]) VALUES (3, N'Angular', CAST(N'2023-10-08T00:00:00.000' AS DateTime), 10, 1, N'Maryur Patel', N'Technical', N'Angular', N'Planned', N'Completed', N'Traning Room')
INSERT [dbo].[TraineeTraning] ([TraningId], [Title], [Date], [Time], [Duration], [faculties], [category], [subCategory], [Type], [Status], [Location]) VALUES (4, N'Soft Skill ', CAST(N'2023-10-23T00:00:00.000' AS DateTime), 10, 2, N'Hamagini Sharma', N'Soft Skill', N'General', N'Open Nomination', N'Ongoing', N'Traning Room')
SET IDENTITY_INSERT [dbo].[TraineeTraning] OFF
SET IDENTITY_INSERT [dbo].[UserCurrentProjectInformation] ON 

INSERT [dbo].[UserCurrentProjectInformation] ([UserCurrentProjectInformationId], [EmployeeId], [HoursAllocated], [ProjectId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 1, 8.5, 1, CAST(N'2023-07-11T17:27:58.937' AS DateTime), CAST(N'2023-09-19T13:42:55.557' AS DateTime), NULL)
INSERT [dbo].[UserCurrentProjectInformation] ([UserCurrentProjectInformationId], [EmployeeId], [HoursAllocated], [ProjectId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 1, 8.5, 2, CAST(N'2023-07-17T09:51:46.007' AS DateTime), CAST(N'2023-09-19T13:43:00.370' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[UserCurrentProjectInformation] OFF
SET IDENTITY_INSERT [dbo].[WorkGroup] ON 

INSERT [dbo].[WorkGroup] ([WorkGroupId], [ProjectId], [WorkGroupName], [StartDate], [EndDate], [Notes]) VALUES (1, 1, N'July - 2023', CAST(N'2023-07-01' AS Date), CAST(N'2023-07-31' AS Date), NULL)
INSERT [dbo].[WorkGroup] ([WorkGroupId], [ProjectId], [WorkGroupName], [StartDate], [EndDate], [Notes]) VALUES (2, 1, N'Oct-2023', CAST(N'2023-10-01' AS Date), CAST(N'2023-10-30' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[WorkGroup] OFF
SET IDENTITY_INSERT [dbo].[WorkItemAttachments] ON 

INSERT [dbo].[WorkItemAttachments] ([WorkItemAttachmentsId], [ProjectWorkId], [FileName], [FilePath], [Description], [CreatedAt], [UpdateAt], [IsDeleted], [filetype]) VALUES (12, 15, N'Custom HtmlHelpers.pdf', N'/assets/Uploads/ProjectWorkItemAttchments/Custom HtmlHelpers-20230913025112.pdf', N'custom html helpers', CAST(N'2023-09-13T14:51:12.917' AS DateTime), CAST(N'2023-09-13T14:51:12.920' AS DateTime), NULL, N'.pdf')
INSERT [dbo].[WorkItemAttachments] ([WorkItemAttachmentsId], [ProjectWorkId], [FileName], [FilePath], [Description], [CreatedAt], [UpdateAt], [IsDeleted], [filetype]) VALUES (14, 50, N'EMS Claim request.pdf', N'/assets/Uploads/ProjectWorkItemAttchments/EMS Claim request-20230915014708.pdf', NULL, CAST(N'2023-09-15T13:47:08.290' AS DateTime), CAST(N'2023-09-15T13:47:08.297' AS DateTime), NULL, N'.pdf')
INSERT [dbo].[WorkItemAttachments] ([WorkItemAttachmentsId], [ProjectWorkId], [FileName], [FilePath], [Description], [CreatedAt], [UpdateAt], [IsDeleted], [filetype]) VALUES (16, 55, N'github_notes.pdf', N'/assets/Uploads/ProjectWorkItemAttchments/github_notes-20231006054218.pdf', N'my GitHub notes', CAST(N'2023-10-06T17:42:18.827' AS DateTime), CAST(N'2023-10-06T17:42:18.830' AS DateTime), NULL, N'.pdf')
INSERT [dbo].[WorkItemAttachments] ([WorkItemAttachmentsId], [ProjectWorkId], [FileName], [FilePath], [Description], [CreatedAt], [UpdateAt], [IsDeleted], [filetype]) VALUES (17, 19, N'github_notes (1).pdf', N'/assets/Uploads/ProjectWorkItemAttchments/github_notes (1)-20231010012543.pdf', NULL, CAST(N'2023-10-10T13:25:43.890' AS DateTime), CAST(N'2023-10-10T13:25:43.890' AS DateTime), NULL, N'.pdf')
INSERT [dbo].[WorkItemAttachments] ([WorkItemAttachmentsId], [ProjectWorkId], [FileName], [FilePath], [Description], [CreatedAt], [UpdateAt], [IsDeleted], [filetype]) VALUES (18, 61, N'Grooming yourself.pdf', N'/assets/Uploads/ProjectWorkItemAttchments/Grooming yourself-20231012113939.pdf', NULL, CAST(N'2023-10-12T11:39:39.057' AS DateTime), CAST(N'2023-10-12T11:39:39.060' AS DateTime), NULL, N'.pdf')
SET IDENTITY_INSERT [dbo].[WorkItemAttachments] OFF
SET IDENTITY_INSERT [dbo].[WorkItemHistory] ON 

INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 36, N'Remaining Time', 1, N'8.5', N'8.5', CAST(N'2023-07-20T17:22:04.703' AS DateTime), CAST(N'2023-07-20T17:22:04.703' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 36, N'Remaining Time', 1, N'6.5', N'6.5', CAST(N'2023-07-20T17:22:10.357' AS DateTime), CAST(N'2023-07-20T17:22:10.357' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (3, 36, N'Remaining Time', 1, N'8.5', N'8.5', CAST(N'2023-07-20T17:22:23.333' AS DateTime), CAST(N'2023-07-20T17:22:23.333' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (4, 25, N'Remaining Time', 1, N'2', N'8.5', CAST(N'2023-07-20T17:26:12.853' AS DateTime), CAST(N'2023-07-20T17:26:12.853' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (5, 25, N'Remaining Time', 1, N'8.5', N'6.5', CAST(N'2023-07-20T17:27:04.390' AS DateTime), CAST(N'2023-07-20T17:27:04.390' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (6, 18, N'Remaining Time', 1, N'5.5', N'6.5', CAST(N'2023-07-20T17:27:43.683' AS DateTime), CAST(N'2023-07-20T17:27:43.683' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (7, 25, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-07-20T17:31:00.860' AS DateTime), CAST(N'2023-07-20T17:31:00.863' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (8, 27, N'Work Flow Step', 1, N'5', N'2', CAST(N'2023-07-20T17:31:02.050' AS DateTime), CAST(N'2023-07-20T17:31:02.050' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (11, 15, N'Remaining Time', 1, N'0', N'70', CAST(N'2023-09-06T17:33:28.020' AS DateTime), CAST(N'2023-09-06T17:33:28.020' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (12, 15, N'Remaining Time', 1, N'70', N'23', CAST(N'2023-09-06T17:43:29.467' AS DateTime), CAST(N'2023-09-06T17:43:29.467' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (13, 15, N'Remaining Time', 1, N'23', N'50', CAST(N'2023-09-06T17:46:23.917' AS DateTime), CAST(N'2023-09-06T17:46:23.917' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (14, 15, N'Remaining Time', 1, N'50', N'2', CAST(N'2023-09-06T18:02:03.630' AS DateTime), CAST(N'2023-09-06T18:02:03.633' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (15, 15, N'Remaining Time', 1, N'2', N'3.5', CAST(N'2023-09-06T18:02:31.867' AS DateTime), CAST(N'2023-09-06T18:02:31.870' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (16, 15, N'Remaining Time', 1, N'3.5', N'8.5', CAST(N'2023-09-11T12:39:36.613' AS DateTime), CAST(N'2023-09-11T12:39:36.617' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (17, 15, N'Remaining Time', 1, N'8.5', N'11.5', CAST(N'2023-09-11T13:40:04.563' AS DateTime), CAST(N'2023-09-11T13:40:04.567' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (18, 15, N'Remaining Time', 1, N'11.5', N'20.5', CAST(N'2023-09-11T13:40:12.273' AS DateTime), CAST(N'2023-09-11T13:40:12.273' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (19, 15, N'Remaining Time', 1, N'20.5', N'24.5', CAST(N'2023-09-11T13:40:17.227' AS DateTime), CAST(N'2023-09-11T13:40:17.227' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (20, 15, N'Remaining Time', 1, N'24.5', N'28', CAST(N'2023-09-11T13:40:25.527' AS DateTime), CAST(N'2023-09-11T13:40:25.527' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (21, 15, N'Remaining Time', 1, N'28', N'50', CAST(N'2023-09-11T14:08:11.903' AS DateTime), CAST(N'2023-09-11T14:08:11.907' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (22, 15, N'Remaining Time', 1, N'50', N'27', CAST(N'2023-09-11T14:08:27.570' AS DateTime), CAST(N'2023-09-11T14:08:27.570' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (23, 15, N'Remaining Time', 1, N'27', N'34', CAST(N'2023-09-11T15:53:20.370' AS DateTime), CAST(N'2023-09-11T15:53:20.370' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (24, 15, N'Remaining Time', 1, N'34', N'38', CAST(N'2023-09-11T15:53:32.177' AS DateTime), CAST(N'2023-09-11T15:53:32.180' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (25, 52, N'Remaining Time', 1, N'8.5', N'3.5', CAST(N'2023-09-11T15:54:10.833' AS DateTime), CAST(N'2023-09-11T15:54:10.837' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (26, 15, N'Remaining Time', 1, N'38', N'41', CAST(N'2023-09-11T15:55:07.247' AS DateTime), CAST(N'2023-09-11T15:55:07.250' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (27, 15, N'Remaining Time', 1, N'41', N'50', CAST(N'2023-09-11T15:55:22.380' AS DateTime), CAST(N'2023-09-11T15:55:22.380' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (28, 15, N'Remaining Time', 1, N'50', N'27', CAST(N'2023-09-13T14:58:12.660' AS DateTime), CAST(N'2023-09-13T14:58:12.660' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (29, 15, N'Remaining Time', 1, N'27', N'33', CAST(N'2023-09-13T15:01:48.060' AS DateTime), CAST(N'2023-09-13T15:01:48.063' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (30, 15, N'Remaining Time', 1, N'33', N'10', CAST(N'2023-09-13T15:04:32.667' AS DateTime), CAST(N'2023-09-13T15:04:32.670' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (31, 15, N'Remaining Time', 1, N'10', N'0', CAST(N'2023-09-13T15:04:46.517' AS DateTime), CAST(N'2023-09-13T15:04:46.517' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (33, 53, N'Work Flow Step', 1, N'2', N'3', CAST(N'2023-09-19T11:11:17.490' AS DateTime), CAST(N'2023-09-19T11:11:17.493' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (34, 28, N'Work Flow Step', 1, N'3', N'2', CAST(N'2023-09-19T11:11:49.200' AS DateTime), CAST(N'2023-09-19T11:11:49.203' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (35, 53, N'Work Flow Step', 1, N'3', N'2', CAST(N'2023-09-19T11:12:12.470' AS DateTime), CAST(N'2023-09-19T11:12:12.470' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (36, 51, N'Work Flow Step', 1, N'2', N'3', CAST(N'2023-09-20T10:30:04.247' AS DateTime), CAST(N'2023-09-20T10:30:04.247' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (37, 53, N'Work Flow Step', 1, N'2', N'3', CAST(N'2023-09-20T10:30:09.877' AS DateTime), CAST(N'2023-09-20T10:30:09.880' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (38, 53, N'Work Flow Step', 1, N'3', N'4', CAST(N'2023-09-21T17:41:26.707' AS DateTime), CAST(N'2023-09-21T17:41:26.710' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (39, 55, N'Work Flow Step', 1, N'5', N'4', CAST(N'2023-09-21T17:59:30.280' AS DateTime), CAST(N'2023-09-21T17:59:30.280' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (40, 28, N'Work Flow Step', 1, N'2', N'3', CAST(N'2023-09-21T18:00:22.983' AS DateTime), CAST(N'2023-09-21T18:00:22.987' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (41, 16, N'Work Flow Step', 1, N'2', N'4', CAST(N'2023-09-21T18:00:35.840' AS DateTime), CAST(N'2023-09-21T18:00:35.840' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (42, 15, N'Work Flow Step', 1, N'2', N'3', CAST(N'2023-09-21T18:00:41.647' AS DateTime), CAST(N'2023-09-21T18:00:41.647' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (43, 51, N'Work Flow Step', 1, N'3', N'2', CAST(N'2023-09-22T14:38:52.643' AS DateTime), CAST(N'2023-09-22T14:38:52.643' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (44, 51, N'Work Flow Step', 1, N'2', N'1', CAST(N'2023-09-22T14:38:59.720' AS DateTime), CAST(N'2023-09-22T14:38:59.720' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (45, 56, N'Work Flow Step', 1, N'1', N'2', CAST(N'2023-09-22T14:39:11.670' AS DateTime), CAST(N'2023-09-22T14:39:11.670' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (46, 56, N'Work Flow Step', 1, N'2', N'3', CAST(N'2023-09-22T14:43:52.200' AS DateTime), CAST(N'2023-09-22T14:43:52.200' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (47, 15, N'Remaining Time', 1, N'0', N'5', CAST(N'2023-09-25T15:59:21.243' AS DateTime), CAST(N'2023-09-25T15:59:21.247' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (48, 57, N'Work Flow Step', 1, N'1', N'2', CAST(N'2023-09-25T16:02:57.807' AS DateTime), CAST(N'2023-09-25T16:02:57.810' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (49, 57, N'Remaining Time', 1, N'0', N'2', CAST(N'2023-09-25T16:47:51.510' AS DateTime), CAST(N'2023-09-25T16:47:51.513' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (50, 57, N'Remaining Time', 1, N'2', N'4', CAST(N'2023-09-25T16:47:54.763' AS DateTime), CAST(N'2023-09-25T16:47:54.763' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (51, 57, N'Remaining Time', 1, N'4', N'9', CAST(N'2023-09-25T16:47:57.617' AS DateTime), CAST(N'2023-09-25T16:47:57.617' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (52, 57, N'Remaining Time', 1, N'9', N'11', CAST(N'2023-09-25T16:48:00.147' AS DateTime), CAST(N'2023-09-25T16:48:00.147' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (53, 57, N'Remaining Time', 1, N'11', N'20', CAST(N'2023-09-25T16:48:06.987' AS DateTime), CAST(N'2023-09-25T16:48:06.990' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (54, 57, N'Remaining Time', 1, N'20', N'18', CAST(N'2023-09-25T16:48:55.820' AS DateTime), CAST(N'2023-09-25T16:48:55.820' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (55, 57, N'Remaining Time', 1, N'18', N'15', CAST(N'2023-09-25T16:51:30.370' AS DateTime), CAST(N'2023-09-25T16:51:30.370' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (56, 57, N'Remaining Time', 1, N'15', N'13', CAST(N'2023-09-25T16:51:48.600' AS DateTime), CAST(N'2023-09-25T16:51:48.600' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (57, 57, N'Remaining Time', 1, N'13', N'8', CAST(N'2023-09-25T16:53:52.660' AS DateTime), CAST(N'2023-09-25T16:53:52.660' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (58, 57, N'Remaining Time', 1, N'8', N'3', CAST(N'2023-09-25T16:55:00.830' AS DateTime), CAST(N'2023-09-25T16:55:00.833' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (59, 56, N'Work Flow Step', 1, N'3', N'4', CAST(N'2023-09-26T13:23:29.777' AS DateTime), CAST(N'2023-09-26T13:23:29.780' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (60, 56, N'Remaining Time', 1, N'8.5', N'0', CAST(N'2023-09-26T13:25:49.310' AS DateTime), CAST(N'2023-09-26T13:25:49.313' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (61, 54, N'Work Flow Step', 1, N'1', N'2', CAST(N'2023-09-26T13:27:22.710' AS DateTime), CAST(N'2023-09-26T13:27:22.713' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (62, 28, N'Work Flow Step', 1, N'3', N'4', CAST(N'2023-09-26T13:27:48.563' AS DateTime), CAST(N'2023-09-26T13:27:48.567' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (63, 20, N'Work Flow Step', 1, N'3', N'4', CAST(N'2023-09-26T13:28:08.407' AS DateTime), CAST(N'2023-09-26T13:28:08.407' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (64, 18, N'Work Flow Step', 1, N'3', N'4', CAST(N'2023-09-26T13:29:00.840' AS DateTime), CAST(N'2023-09-26T13:29:00.843' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (65, 17, N'Work Flow Step', 1, N'3', N'4', CAST(N'2023-09-26T13:29:23.590' AS DateTime), CAST(N'2023-09-26T13:29:23.590' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (66, 56, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-26T13:31:23.083' AS DateTime), CAST(N'2023-09-26T13:31:23.083' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (67, 57, N'Work Flow Step', 1, N'2', N'3', CAST(N'2023-09-26T13:31:31.873' AS DateTime), CAST(N'2023-09-26T13:31:31.873' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (68, 57, N'Work Flow Step', 1, N'3', N'4', CAST(N'2023-09-26T13:31:47.693' AS DateTime), CAST(N'2023-09-26T13:31:47.693' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (69, 57, N'Remaining Time', 1, N'3', N'1', CAST(N'2023-09-26T18:34:22.807' AS DateTime), CAST(N'2023-09-26T18:34:22.807' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (70, 51, N'Work Flow Step', 1, N'1', N'2', CAST(N'2023-09-28T10:27:54.580' AS DateTime), CAST(N'2023-09-28T10:27:54.587' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (71, 57, N'Remaining Time', 1, N'1', N'0', CAST(N'2023-09-28T10:33:46.947' AS DateTime), CAST(N'2023-09-28T10:33:46.950' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (72, 51, N'Remaining Time', 1, N'8.5', N'0', CAST(N'2023-09-28T14:58:04.640' AS DateTime), CAST(N'2023-09-28T14:58:04.640' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (73, 58, N'Work Flow Step', 1, N'1', N'2', CAST(N'2023-09-28T15:00:04.563' AS DateTime), CAST(N'2023-09-28T15:00:04.567' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (74, 58, N'Remaining Time', 1, N'8.5', N'5.5', CAST(N'2023-09-28T15:00:21.203' AS DateTime), CAST(N'2023-09-28T15:00:21.203' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (75, 58, N'Remaining Time', 1, N'5.5', N'1.5', CAST(N'2023-09-28T15:00:34.563' AS DateTime), CAST(N'2023-09-28T15:00:34.563' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (76, 58, N'Total Time Spent', 1, N'7', N'9', CAST(N'2023-09-28T15:20:06.750' AS DateTime), CAST(N'2023-09-28T15:20:06.753' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (77, 58, N'Remaining Time', 1, N'1.5', N'0', CAST(N'2023-09-28T15:20:06.753' AS DateTime), CAST(N'2023-09-28T15:20:06.753' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (78, 55, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-29T13:18:21.917' AS DateTime), CAST(N'2023-09-29T13:18:21.920' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (79, 57, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-29T13:18:26.373' AS DateTime), CAST(N'2023-09-29T13:18:26.373' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (80, 53, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-29T13:18:31.127' AS DateTime), CAST(N'2023-09-29T13:18:31.133' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (81, 28, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-29T13:18:36.230' AS DateTime), CAST(N'2023-09-29T13:18:36.230' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (82, 22, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-29T13:18:41.803' AS DateTime), CAST(N'2023-09-29T13:18:41.810' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (83, 18, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-29T13:18:53.397' AS DateTime), CAST(N'2023-09-29T13:18:53.400' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (84, 20, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-29T13:18:57.960' AS DateTime), CAST(N'2023-09-29T13:18:57.960' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (85, 21, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-29T13:19:02.620' AS DateTime), CAST(N'2023-09-29T13:19:02.620' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (86, 17, N'Work Flow Step', 1, N'4', N'5', CAST(N'2023-09-29T13:19:07.330' AS DateTime), CAST(N'2023-09-29T13:19:07.330' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (87, 18, N'Work Flow Step', 1, N'5', N'3', CAST(N'2023-09-29T13:25:26.040' AS DateTime), CAST(N'2023-09-29T13:25:26.043' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (88, 22, N'Work Flow Step', 1, N'5', N'1', CAST(N'2023-09-29T13:27:27.147' AS DateTime), CAST(N'2023-09-29T13:27:27.153' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (89, 20, N'Work Flow Step', 1, N'5', N'1', CAST(N'2023-09-29T13:27:32.227' AS DateTime), CAST(N'2023-09-29T13:27:32.230' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (90, 19, N'Work Flow Step', 1, N'5', N'1', CAST(N'2023-09-29T13:27:37.377' AS DateTime), CAST(N'2023-09-29T13:27:37.377' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (91, 16, N'Work Flow Step', 1, N'4', N'3', CAST(N'2023-10-04T10:35:15.960' AS DateTime), CAST(N'2023-10-04T10:35:15.960' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (92, 18, N'Work Flow Step', 1, N'3', N'4', CAST(N'2023-10-05T09:43:49.960' AS DateTime), CAST(N'2023-10-05T09:43:49.963' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (93, 58, N'Work Flow Step', 1, N'2', N'4', CAST(N'2023-10-05T09:43:54.973' AS DateTime), CAST(N'2023-10-05T09:43:54.977' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (94, 54, N'Work Flow Step', 1, N'2', N'4', CAST(N'2023-10-05T09:44:00.237' AS DateTime), CAST(N'2023-10-05T09:44:00.240' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (95, 51, N'Work Flow Step', 1, N'2', N'4', CAST(N'2023-10-05T09:44:05.497' AS DateTime), CAST(N'2023-10-05T09:44:05.500' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (96, 16, N'Work Flow Step', 1, N'3', N'2', CAST(N'2023-10-05T10:34:12.663' AS DateTime), CAST(N'2023-10-05T10:34:12.667' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (97, 58, N'Work Flow Step', 1, N'4', N'3', CAST(N'2023-10-05T10:34:17.277' AS DateTime), CAST(N'2023-10-05T10:34:17.277' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (98, 16, N'Work Flow Step', 1, N'2', N'3', CAST(N'2023-10-05T10:42:09.357' AS DateTime), CAST(N'2023-10-05T10:42:09.357' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (99, 59, N'Work Flow Step', 1, N'1', N'2', CAST(N'2023-10-05T11:51:10.800' AS DateTime), CAST(N'2023-10-05T11:51:10.803' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (100, 50, N'Work Flow Step', 1, N'1', N'2', CAST(N'2023-10-06T17:35:23.307' AS DateTime), CAST(N'2023-10-06T17:35:23.310' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (101, 54, N'Total Time Spent', 1, N'0', N'8', CAST(N'2023-10-06T17:58:40.980' AS DateTime), CAST(N'2023-10-06T17:58:40.980' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (102, 54, N'Remaining Time', 1, N'8', N'0', CAST(N'2023-10-06T17:58:40.980' AS DateTime), CAST(N'2023-10-06T17:58:40.980' AS DateTime), NULL)
GO
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (103, 22, N'Total Time Spent', 1, N'6.5', N'10.5', CAST(N'2023-10-09T17:01:45.753' AS DateTime), CAST(N'2023-10-09T17:01:45.757' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (104, 22, N'Remaining Time', 1, N'4', N'0', CAST(N'2023-10-09T17:01:45.757' AS DateTime), CAST(N'2023-10-09T17:01:45.757' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (105, 58, N'Work Flow Step', 1, N'3', N'5', CAST(N'2023-10-10T13:23:41.007' AS DateTime), CAST(N'2023-10-10T13:23:41.007' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (106, 61, N'Work Flow Step', 1, N'1', N'2', CAST(N'2023-10-12T11:33:30.253' AS DateTime), CAST(N'2023-10-12T11:33:30.257' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (107, 61, N'Total Time Spent', 1, N'0', N'8.5', CAST(N'2023-10-12T11:34:03.727' AS DateTime), CAST(N'2023-10-12T11:34:03.730' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (108, 61, N'Remaining Time', 1, N'8.5', N'0', CAST(N'2023-10-12T11:34:03.730' AS DateTime), CAST(N'2023-10-12T11:34:03.730' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (109, 61, N'Work Flow Step', 1, N'2', N'5', CAST(N'2023-10-12T11:34:09.077' AS DateTime), CAST(N'2023-10-12T11:34:09.077' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (110, 18, N'Remaining Time', 1, N'6.5', N'10.5', CAST(N'2023-10-25T16:35:24.847' AS DateTime), CAST(N'2023-10-25T16:35:24.847' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (111, 25, N'Remaining Time', 1, N'6.5', N'10.5', CAST(N'2023-10-25T17:09:51.520' AS DateTime), CAST(N'2023-10-25T17:09:51.520' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (112, 55, N'Work Flow Step', 1, N'5', N'3', CAST(N'2023-10-25T17:10:35.810' AS DateTime), CAST(N'2023-10-25T17:10:35.810' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (113, 55, N'Remaining Time', 1, N'8.5', N'8.2', CAST(N'2023-10-25T17:10:35.810' AS DateTime), CAST(N'2023-10-25T17:10:35.810' AS DateTime), NULL)
INSERT [dbo].[WorkItemHistory] ([WorkItemHistoryId], [ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (114, 22, N'Remaining Time', 1, N'0', N'10.5', CAST(N'2023-10-30T15:01:20.087' AS DateTime), CAST(N'2023-10-30T15:01:20.090' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[WorkItemHistory] OFF
SET IDENTITY_INSERT [dbo].[WorkitemsComments] ON 

INSERT [dbo].[WorkitemsComments] ([WorkItemCommentId], [ProjectWorkId], [EmployeeId], [COMMENTS], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10008, 52, 1, N'New comment added', CAST(N'2023-09-06T14:40:07.697' AS DateTime), CAST(N'2023-09-06T14:40:07.697' AS DateTime), NULL)
INSERT [dbo].[WorkitemsComments] ([WorkItemCommentId], [ProjectWorkId], [EmployeeId], [COMMENTS], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10009, 15, 1, N'New project', CAST(N'2023-09-06T15:56:52.820' AS DateTime), CAST(N'2023-09-06T15:56:52.823' AS DateTime), NULL)
INSERT [dbo].[WorkitemsComments] ([WorkItemCommentId], [ProjectWorkId], [EmployeeId], [COMMENTS], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10011, 57, 1, N'new comment', CAST(N'2023-09-26T10:06:30.760' AS DateTime), CAST(N'2023-09-26T10:06:30.763' AS DateTime), NULL)
INSERT [dbo].[WorkitemsComments] ([WorkItemCommentId], [ProjectWorkId], [EmployeeId], [COMMENTS], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10013, 19, 1, N'new comment', CAST(N'2023-10-10T13:25:37.160' AS DateTime), CAST(N'2023-10-10T13:25:37.160' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[WorkitemsComments] OFF
SET IDENTITY_INSERT [dbo].[WorkItemState] ON 

INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 36, 1, 2, CAST(N'2023-07-20T11:37:07.163' AS DateTime), CAST(N'2023-07-20T11:37:07.163' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 36, 1, 2, CAST(N'2023-07-20T11:37:07.167' AS DateTime), CAST(N'2023-07-20T11:37:07.167' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (3, 36, 1, 1, CAST(N'2023-07-20T11:37:16.840' AS DateTime), CAST(N'2023-07-20T11:37:16.840' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (4, 36, 1, 1, CAST(N'2023-07-20T11:37:16.840' AS DateTime), CAST(N'2023-07-20T11:37:16.840' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (5, 28, 1, 4, CAST(N'2023-07-20T11:40:15.953' AS DateTime), CAST(N'2023-07-20T11:40:15.957' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (6, 28, 1, 5, CAST(N'2023-07-20T11:40:35.493' AS DateTime), CAST(N'2023-07-20T11:40:35.493' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (7, 27, 1, 2, CAST(N'2023-07-20T17:24:48.387' AS DateTime), CAST(N'2023-07-20T17:31:02.047' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (8, 25, 1, 5, CAST(N'2023-07-20T17:26:12.840' AS DateTime), CAST(N'2023-07-20T17:31:00.853' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (9, 18, 1, 1, CAST(N'2023-07-20T17:27:43.683' AS DateTime), CAST(N'2023-07-20T17:27:43.683' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10, 22, 1, 3, CAST(N'2023-08-29T15:25:24.257' AS DateTime), CAST(N'2023-08-29T15:25:24.257' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (11, 22, 1, 2, CAST(N'2023-08-29T15:26:00.563' AS DateTime), CAST(N'2023-08-29T15:26:00.563' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (12, 22, 1, 2, CAST(N'2023-08-29T15:26:58.977' AS DateTime), CAST(N'2023-08-29T15:26:58.980' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (13, 22, 1, 2, CAST(N'2023-08-29T15:27:18.490' AS DateTime), CAST(N'2023-08-29T15:27:18.490' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (14, 22, 1, 2, CAST(N'2023-08-29T15:27:40.713' AS DateTime), CAST(N'2023-08-29T15:27:40.713' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (15, 22, 1, 2, CAST(N'2023-08-29T15:28:37.363' AS DateTime), CAST(N'2023-08-29T15:28:37.367' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (16, 21, 1, 3, CAST(N'2023-08-29T15:28:42.930' AS DateTime), CAST(N'2023-08-29T15:28:42.930' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (17, 21, 1, 3, CAST(N'2023-08-29T15:28:49.450' AS DateTime), CAST(N'2023-08-29T15:28:49.450' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (18, 21, 1, 1, CAST(N'2023-08-29T15:29:36.367' AS DateTime), CAST(N'2023-08-29T15:29:36.370' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (19, 25, 1, 2, CAST(N'2023-08-29T15:29:53.670' AS DateTime), CAST(N'2023-08-29T15:29:53.670' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (20, 20, 1, 1, CAST(N'2023-08-29T15:44:45.410' AS DateTime), CAST(N'2023-08-29T15:44:45.413' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (21, 15, 1, 2, CAST(N'2023-08-29T15:45:37.707' AS DateTime), CAST(N'2023-08-29T15:45:37.710' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (22, 17, 1, 3, CAST(N'2023-08-29T15:45:45.110' AS DateTime), CAST(N'2023-08-29T15:45:45.110' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (23, 18, 1, 3, CAST(N'2023-08-29T15:45:45.990' AS DateTime), CAST(N'2023-08-29T15:45:45.990' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (24, 21, 1, 4, CAST(N'2023-08-29T15:45:46.857' AS DateTime), CAST(N'2023-08-29T15:45:46.857' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (25, 36, 1, 4, CAST(N'2023-08-29T15:45:47.790' AS DateTime), CAST(N'2023-08-29T15:45:47.790' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (26, 22, 1, 3, CAST(N'2023-08-29T15:45:49.177' AS DateTime), CAST(N'2023-08-29T15:45:49.180' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (27, 25, 1, 4, CAST(N'2023-08-29T15:45:50.250' AS DateTime), CAST(N'2023-08-29T15:45:50.250' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (28, 19, 1, 5, CAST(N'2023-08-29T15:45:51.480' AS DateTime), CAST(N'2023-08-29T15:45:51.480' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (29, 22, 1, 2, CAST(N'2023-08-29T15:47:06.970' AS DateTime), CAST(N'2023-08-29T15:47:06.973' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (30, 22, 1, 3, CAST(N'2023-08-29T15:48:12.370' AS DateTime), CAST(N'2023-08-29T15:48:12.373' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (31, 36, 1, 3, CAST(N'2023-08-29T15:48:18.600' AS DateTime), CAST(N'2023-08-29T15:48:18.600' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (32, 22, 1, 4, CAST(N'2023-08-29T15:48:22.487' AS DateTime), CAST(N'2023-08-29T15:48:22.487' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (33, 20, 1, 2, CAST(N'2023-08-29T15:58:54.443' AS DateTime), CAST(N'2023-08-29T15:58:54.447' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (34, 20, 1, 3, CAST(N'2023-08-29T15:59:04.883' AS DateTime), CAST(N'2023-08-29T15:59:04.887' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (35, 25, 1, 5, CAST(N'2023-08-29T16:00:03.020' AS DateTime), CAST(N'2023-08-29T16:00:03.020' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (36, 28, 1, 3, CAST(N'2023-08-29T16:00:21.503' AS DateTime), CAST(N'2023-08-29T16:00:21.503' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (37, 16, 1, 2, CAST(N'2023-08-29T16:00:31.517' AS DateTime), CAST(N'2023-08-29T16:00:31.517' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (38, 16, 1, 1, CAST(N'2023-08-29T16:00:36.320' AS DateTime), CAST(N'2023-08-29T16:00:36.320' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (39, 15, 1, 1, CAST(N'2023-08-29T16:03:31.247' AS DateTime), CAST(N'2023-08-29T16:03:31.250' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (40, 15, 1, 2, CAST(N'2023-08-29T16:03:33.827' AS DateTime), CAST(N'2023-08-29T16:03:33.827' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (41, 27, 1, 4, CAST(N'2023-08-29T16:41:34.770' AS DateTime), CAST(N'2023-08-29T16:41:34.773' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (42, 23, 1, 5, CAST(N'2023-08-29T18:17:10.113' AS DateTime), CAST(N'2023-08-29T18:17:10.113' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (43, 24, 1, 5, CAST(N'2023-08-29T18:17:14.907' AS DateTime), CAST(N'2023-08-29T18:17:14.907' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (44, 26, 1, 5, CAST(N'2023-08-29T18:17:23.397' AS DateTime), CAST(N'2023-08-29T18:17:23.397' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (45, 36, 1, 4, CAST(N'2023-08-31T15:04:31.567' AS DateTime), CAST(N'2023-08-31T15:04:31.570' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (59, 50, 1, 1, CAST(N'2023-09-04T13:33:17.037' AS DateTime), CAST(N'2023-09-04T13:33:17.040' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (60, 36, 1, 5, CAST(N'2023-09-05T15:05:28.667' AS DateTime), CAST(N'2023-09-05T15:05:28.670' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (61, 51, 1, 1, CAST(N'2023-09-06T09:41:33.773' AS DateTime), CAST(N'2023-09-06T09:41:33.777' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10072, 15, 1, 2, CAST(N'2023-09-06T18:17:37.963' AS DateTime), CAST(N'2023-09-06T18:17:37.970' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10073, 36, 1, 4, CAST(N'2023-09-06T18:19:30.320' AS DateTime), CAST(N'2023-09-06T18:19:30.323' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10074, 52, 1, 2, CAST(N'2023-09-06T18:23:05.800' AS DateTime), CAST(N'2023-09-06T18:23:05.803' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10075, 52, 1, 1, CAST(N'2023-09-11T15:33:22.790' AS DateTime), CAST(N'2023-09-11T15:33:22.790' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10076, 15, 1, 1, CAST(N'2023-09-11T15:33:25.287' AS DateTime), CAST(N'2023-09-11T15:33:25.287' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10077, 15, 1, 2, CAST(N'2023-09-11T15:33:28.243' AS DateTime), CAST(N'2023-09-11T15:33:28.243' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10078, 15, 1, 1, CAST(N'2023-09-11T15:55:46.733' AS DateTime), CAST(N'2023-09-11T15:55:46.737' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10079, 15, 1, 2, CAST(N'2023-09-11T15:55:48.133' AS DateTime), CAST(N'2023-09-11T15:55:48.133' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10080, 15, 1, 2, CAST(N'2023-09-13T13:57:17.947' AS DateTime), CAST(N'2023-09-13T13:57:17.950' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10081, 15, 1, 3, CAST(N'2023-09-13T14:58:33.333' AS DateTime), CAST(N'2023-09-13T14:58:33.340' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10082, 15, 1, 2, CAST(N'2023-09-13T15:04:08.983' AS DateTime), CAST(N'2023-09-13T15:04:08.987' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10083, 52, 1, 5, CAST(N'2023-09-13T15:06:11.573' AS DateTime), CAST(N'2023-09-13T15:06:11.577' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10084, 52, 1, 1, CAST(N'2023-09-13T15:06:14.900' AS DateTime), CAST(N'2023-09-13T15:06:14.900' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10085, 15, 1, 2, CAST(N'2023-09-13T15:07:23.677' AS DateTime), CAST(N'2023-09-13T15:07:23.680' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10086, 15, 1, 2, CAST(N'2023-09-13T18:09:04.013' AS DateTime), CAST(N'2023-09-13T18:09:04.017' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10087, 15, 1, 2, CAST(N'2023-09-13T18:12:33.610' AS DateTime), CAST(N'2023-09-13T18:12:33.617' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10088, 15, 1, 2, CAST(N'2023-09-14T10:04:15.313' AS DateTime), CAST(N'2023-09-14T10:04:15.317' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10089, 52, 1, 2, CAST(N'2023-09-14T10:30:15.303' AS DateTime), CAST(N'2023-09-14T10:30:15.303' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10090, 52, 1, 1, CAST(N'2023-09-14T10:30:19.260' AS DateTime), CAST(N'2023-09-14T10:30:19.260' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10091, 51, 1, 2, CAST(N'2023-09-14T10:30:38.623' AS DateTime), CAST(N'2023-09-14T10:30:38.623' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10092, 51, 1, 1, CAST(N'2023-09-14T10:30:43.523' AS DateTime), CAST(N'2023-09-14T10:30:43.523' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10093, 28, 1, 3, CAST(N'2023-09-14T10:33:32.287' AS DateTime), CAST(N'2023-09-14T10:33:32.290' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10094, 52, 1, 2, CAST(N'2023-09-14T10:33:40.613' AS DateTime), CAST(N'2023-09-14T10:33:40.613' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10095, 52, 1, 3, CAST(N'2023-09-14T10:53:33.240' AS DateTime), CAST(N'2023-09-14T10:53:33.240' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10096, 51, 1, 2, CAST(N'2023-09-14T11:04:25.540' AS DateTime), CAST(N'2023-09-14T11:04:25.543' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10097, 52, 1, 4, CAST(N'2023-09-14T11:19:03.573' AS DateTime), CAST(N'2023-09-14T11:19:03.573' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10098, 52, 1, 3, CAST(N'2023-09-14T11:19:31.507' AS DateTime), CAST(N'2023-09-14T11:19:31.507' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10099, 16, 1, 2, CAST(N'2023-09-14T17:03:02.513' AS DateTime), CAST(N'2023-09-14T17:03:02.520' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10100, 53, 1, 2, CAST(N'2023-09-14T17:04:04.433' AS DateTime), CAST(N'2023-09-14T17:04:04.440' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10101, 54, 1, 2, CAST(N'2023-09-14T18:18:57.957' AS DateTime), CAST(N'2023-09-14T18:18:57.960' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10102, 54, 1, 2, CAST(N'2023-09-14T18:18:57.967' AS DateTime), CAST(N'2023-09-14T18:18:57.967' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10103, 53, 1, 2, CAST(N'2023-09-14T18:19:13.920' AS DateTime), CAST(N'2023-09-14T18:19:13.920' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10104, 53, 1, 2, CAST(N'2023-09-14T18:19:13.920' AS DateTime), CAST(N'2023-09-14T18:19:13.920' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10105, 55, 1, 1, CAST(N'2023-09-14T18:22:41.830' AS DateTime), CAST(N'2023-09-14T18:22:41.833' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10106, 55, 1, 2, CAST(N'2023-09-14T18:23:13.367' AS DateTime), CAST(N'2023-09-14T18:23:13.370' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10107, 55, 1, 3, CAST(N'2023-09-14T18:35:37.790' AS DateTime), CAST(N'2023-09-14T18:35:37.790' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10108, 55, 1, 4, CAST(N'2023-09-14T18:36:33.483' AS DateTime), CAST(N'2023-09-14T18:36:33.483' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10109, 55, 1, 3, CAST(N'2023-09-14T18:38:03.820' AS DateTime), CAST(N'2023-09-14T18:38:03.827' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10110, 55, 1, 4, CAST(N'2023-09-14T18:39:58.393' AS DateTime), CAST(N'2023-09-14T18:39:58.397' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10111, 54, 1, 1, CAST(N'2023-09-14T18:42:20.950' AS DateTime), CAST(N'2023-09-14T18:42:20.957' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10112, 55, 1, 5, CAST(N'2023-09-14T18:47:01.730' AS DateTime), CAST(N'2023-09-14T18:47:01.733' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10113, 52, 1, 4, CAST(N'2023-09-15T10:10:35.510' AS DateTime), CAST(N'2023-09-15T10:10:35.513' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10114, 52, 1, 5, CAST(N'2023-09-15T10:11:11.000' AS DateTime), CAST(N'2023-09-15T10:11:11.000' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10115, 36, 1, 5, CAST(N'2023-09-15T10:11:18.887' AS DateTime), CAST(N'2023-09-15T10:11:18.887' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10116, 27, 1, 5, CAST(N'2023-09-15T10:11:26.580' AS DateTime), CAST(N'2023-09-15T10:11:26.580' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10117, 56, 1, 1, CAST(N'2023-09-18T13:59:12.667' AS DateTime), CAST(N'2023-09-18T13:59:12.670' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10118, 53, 1, 3, CAST(N'2023-09-19T11:11:17.453' AS DateTime), CAST(N'2023-09-19T11:11:17.457' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10119, 28, 1, 2, CAST(N'2023-09-19T11:11:49.170' AS DateTime), CAST(N'2023-09-19T11:11:49.170' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10120, 53, 1, 2, CAST(N'2023-09-19T11:12:12.447' AS DateTime), CAST(N'2023-09-19T11:12:12.450' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10121, 51, 1, 3, CAST(N'2023-09-20T10:30:04.193' AS DateTime), CAST(N'2023-09-20T10:30:04.197' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10122, 53, 1, 3, CAST(N'2023-09-20T10:30:09.817' AS DateTime), CAST(N'2023-09-20T10:30:09.820' AS DateTime), NULL)
GO
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10123, 53, 1, 4, CAST(N'2023-09-21T17:41:26.670' AS DateTime), CAST(N'2023-09-21T17:41:26.677' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10124, 55, 1, 4, CAST(N'2023-09-21T17:59:30.270' AS DateTime), CAST(N'2023-09-21T17:59:30.270' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10125, 28, 1, 3, CAST(N'2023-09-21T18:00:22.940' AS DateTime), CAST(N'2023-09-21T18:00:22.940' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10126, 16, 1, 4, CAST(N'2023-09-21T18:00:35.830' AS DateTime), CAST(N'2023-09-21T18:00:35.830' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10127, 15, 1, 3, CAST(N'2023-09-21T18:00:41.647' AS DateTime), CAST(N'2023-09-21T18:00:41.647' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10128, 51, 1, 2, CAST(N'2023-09-22T14:38:52.587' AS DateTime), CAST(N'2023-09-22T14:38:52.587' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10129, 51, 1, 1, CAST(N'2023-09-22T14:38:59.717' AS DateTime), CAST(N'2023-09-22T14:38:59.717' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10130, 56, 1, 2, CAST(N'2023-09-22T14:39:11.667' AS DateTime), CAST(N'2023-09-22T14:39:11.667' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10131, 56, 1, 3, CAST(N'2023-09-22T14:43:52.170' AS DateTime), CAST(N'2023-09-22T14:43:52.173' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10132, 57, 1, 1, CAST(N'2023-09-25T16:02:01.377' AS DateTime), CAST(N'2023-09-25T16:02:01.380' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10133, 57, 1, 2, CAST(N'2023-09-25T16:02:57.777' AS DateTime), CAST(N'2023-09-25T16:02:57.777' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10134, 56, 1, 4, CAST(N'2023-09-26T13:23:29.740' AS DateTime), CAST(N'2023-09-26T13:23:29.740' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10135, 54, 1, 2, CAST(N'2023-09-26T13:27:22.680' AS DateTime), CAST(N'2023-09-26T13:27:22.687' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10136, 28, 1, 4, CAST(N'2023-09-26T13:27:48.517' AS DateTime), CAST(N'2023-09-26T13:27:48.527' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10137, 20, 1, 4, CAST(N'2023-09-26T13:28:08.407' AS DateTime), CAST(N'2023-09-26T13:28:08.407' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10138, 18, 1, 4, CAST(N'2023-09-26T13:29:00.803' AS DateTime), CAST(N'2023-09-26T13:29:00.810' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10139, 17, 1, 4, CAST(N'2023-09-26T13:29:23.587' AS DateTime), CAST(N'2023-09-26T13:29:23.587' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10140, 56, 1, 5, CAST(N'2023-09-26T13:31:23.047' AS DateTime), CAST(N'2023-09-26T13:31:23.057' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10141, 57, 1, 3, CAST(N'2023-09-26T13:31:31.870' AS DateTime), CAST(N'2023-09-26T13:31:31.870' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10142, 57, 1, 4, CAST(N'2023-09-26T13:31:47.690' AS DateTime), CAST(N'2023-09-26T13:31:47.690' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10143, 51, 1, 2, CAST(N'2023-09-28T10:27:54.477' AS DateTime), CAST(N'2023-09-28T10:27:54.507' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10144, 58, 1, 1, CAST(N'2023-09-28T14:59:45.547' AS DateTime), CAST(N'2023-09-28T14:59:45.547' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10145, 58, 1, 2, CAST(N'2023-09-28T15:00:04.533' AS DateTime), CAST(N'2023-09-28T15:00:04.537' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10146, 55, 1, 5, CAST(N'2023-09-29T13:18:21.883' AS DateTime), CAST(N'2023-09-29T13:18:21.887' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10147, 57, 1, 5, CAST(N'2023-09-29T13:18:26.370' AS DateTime), CAST(N'2023-09-29T13:18:26.370' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10148, 53, 1, 5, CAST(N'2023-09-29T13:18:31.117' AS DateTime), CAST(N'2023-09-29T13:18:31.117' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10149, 28, 1, 5, CAST(N'2023-09-29T13:18:36.220' AS DateTime), CAST(N'2023-09-29T13:18:36.220' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10150, 22, 1, 5, CAST(N'2023-09-29T13:18:41.760' AS DateTime), CAST(N'2023-09-29T13:18:41.763' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10151, 18, 1, 5, CAST(N'2023-09-29T13:18:53.340' AS DateTime), CAST(N'2023-09-29T13:18:53.340' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10152, 20, 1, 5, CAST(N'2023-09-29T13:18:57.957' AS DateTime), CAST(N'2023-09-29T13:18:57.957' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10153, 21, 1, 5, CAST(N'2023-09-29T13:19:02.607' AS DateTime), CAST(N'2023-09-29T13:19:02.607' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10154, 17, 1, 5, CAST(N'2023-09-29T13:19:07.330' AS DateTime), CAST(N'2023-09-29T13:19:07.330' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10155, 18, 1, 3, CAST(N'2023-09-29T13:25:25.990' AS DateTime), CAST(N'2023-09-29T13:25:26.000' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10156, 22, 1, 1, CAST(N'2023-09-29T13:27:27.093' AS DateTime), CAST(N'2023-09-29T13:27:27.103' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10157, 20, 1, 1, CAST(N'2023-09-29T13:27:32.177' AS DateTime), CAST(N'2023-09-29T13:27:32.183' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10158, 19, 1, 1, CAST(N'2023-09-29T13:27:37.377' AS DateTime), CAST(N'2023-09-29T13:27:37.377' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10159, 16, 1, 3, CAST(N'2023-10-04T10:35:15.907' AS DateTime), CAST(N'2023-10-04T10:35:15.910' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10160, 18, 1, 4, CAST(N'2023-10-05T09:43:49.923' AS DateTime), CAST(N'2023-10-05T09:43:49.927' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10161, 58, 1, 4, CAST(N'2023-10-05T09:43:54.947' AS DateTime), CAST(N'2023-10-05T09:43:54.950' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10162, 54, 1, 4, CAST(N'2023-10-05T09:44:00.210' AS DateTime), CAST(N'2023-10-05T09:44:00.210' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10163, 51, 1, 4, CAST(N'2023-10-05T09:44:05.460' AS DateTime), CAST(N'2023-10-05T09:44:05.463' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10164, 59, 1, 1, CAST(N'2023-10-05T10:05:46.360' AS DateTime), CAST(N'2023-10-05T10:05:46.377' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10165, 16, 1, 2, CAST(N'2023-10-05T10:34:12.627' AS DateTime), CAST(N'2023-10-05T10:34:12.637' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10166, 58, 1, 3, CAST(N'2023-10-05T10:34:17.273' AS DateTime), CAST(N'2023-10-05T10:34:17.277' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10167, 16, 1, 3, CAST(N'2023-10-05T10:42:09.307' AS DateTime), CAST(N'2023-10-05T10:42:09.310' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10168, 59, 1, 2, CAST(N'2023-10-05T11:51:10.760' AS DateTime), CAST(N'2023-10-05T11:51:10.770' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10169, 50, 1, 2, CAST(N'2023-10-06T17:35:23.260' AS DateTime), CAST(N'2023-10-06T17:35:23.267' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10170, 58, 1, 5, CAST(N'2023-10-10T13:23:40.953' AS DateTime), CAST(N'2023-10-10T13:23:40.957' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10171, 60, 1, 1, CAST(N'2023-10-10T13:24:45.440' AS DateTime), CAST(N'2023-10-10T13:24:45.440' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10172, 61, 1, 1, CAST(N'2023-10-12T11:33:10.650' AS DateTime), CAST(N'2023-10-12T11:33:10.650' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10173, 61, 1, 2, CAST(N'2023-10-12T11:33:30.220' AS DateTime), CAST(N'2023-10-12T11:33:30.220' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10174, 61, 1, 5, CAST(N'2023-10-12T11:34:09.070' AS DateTime), CAST(N'2023-10-12T11:34:09.070' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10190, 55, 1, 3, CAST(N'2023-10-25T17:10:35.803' AS DateTime), CAST(N'2023-10-25T17:10:35.807' AS DateTime), NULL)
INSERT [dbo].[WorkItemState] ([WorkItemStateId], [ProjectWorkId], [EmployeeId], [ProjectStatusId], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (10191, 77, 1, 1, CAST(N'2023-11-02T17:21:13.793' AS DateTime), CAST(N'2023-11-02T17:21:13.797' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[WorkItemState] OFF
SET IDENTITY_INSERT [dbo].[WorkLog] ON 

INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (1, 22, CAST(N'2023-07-19' AS Date), 6.5, NULL, CAST(N'2023-07-19T15:59:07.580' AS DateTime), CAST(N'2023-07-19T16:59:57.590' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (2, 22, CAST(N'2023-07-19' AS Date), 2.5, NULL, CAST(N'2023-07-19T16:00:00.120' AS DateTime), CAST(N'2023-07-19T16:00:00.120' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (3, 22, CAST(N'2023-07-19' AS Date), 2.5, NULL, CAST(N'2023-07-19T16:02:35.317' AS DateTime), CAST(N'2023-07-19T16:02:35.320' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (4, 22, CAST(N'2023-07-19' AS Date), 2.5, NULL, CAST(N'2023-07-19T16:02:45.113' AS DateTime), CAST(N'2023-07-19T16:02:45.113' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (5, 22, CAST(N'2023-07-19' AS Date), 2.5, NULL, CAST(N'2023-07-19T16:03:14.933' AS DateTime), CAST(N'2023-07-19T16:03:14.933' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (6, 22, CAST(N'2023-07-19' AS Date), 2.5, NULL, CAST(N'2023-07-19T16:04:10.390' AS DateTime), CAST(N'2023-07-19T16:04:10.393' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (7, 25, CAST(N'2023-07-19' AS Date), 8.5, NULL, CAST(N'2023-07-19T16:33:07.770' AS DateTime), CAST(N'2023-07-19T16:33:07.773' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (26, 52, CAST(N'2023-09-11' AS Date), 8.5, NULL, CAST(N'2023-09-11T15:54:10.840' AS DateTime), CAST(N'2023-09-18T17:02:42.620' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (27, 15, CAST(N'2023-09-13' AS Date), 17, NULL, CAST(N'2023-09-13T14:58:12.663' AS DateTime), CAST(N'2023-09-13T15:01:48.040' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (28, 15, CAST(N'2023-09-11' AS Date), 23, NULL, CAST(N'2023-09-13T15:04:32.633' AS DateTime), CAST(N'2023-09-13T15:04:32.640' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (29, 15, CAST(N'2023-09-10' AS Date), 10, NULL, CAST(N'2023-09-13T15:04:46.520' AS DateTime), CAST(N'2023-09-13T15:04:46.520' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (31, 57, CAST(N'2023-09-25' AS Date), 3, NULL, CAST(N'2023-09-25T16:04:17.753' AS DateTime), CAST(N'2023-09-25T16:04:17.757' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (32, 57, CAST(N'2023-09-24' AS Date), 5, NULL, CAST(N'2023-09-25T16:04:48.373' AS DateTime), CAST(N'2023-09-25T16:04:48.373' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (38, 57, CAST(N'2023-09-25' AS Date), 2, NULL, CAST(N'2023-09-25T16:48:55.793' AS DateTime), CAST(N'2023-09-25T16:48:55.797' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (39, 57, CAST(N'2023-09-23' AS Date), 3, NULL, CAST(N'2023-09-25T16:51:30.340' AS DateTime), CAST(N'2023-09-25T16:51:30.343' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (40, 57, CAST(N'2023-09-22' AS Date), 2, NULL, CAST(N'2023-09-25T16:51:48.573' AS DateTime), CAST(N'2023-09-25T16:51:48.577' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (41, 57, CAST(N'2023-09-22' AS Date), 5, NULL, CAST(N'2023-09-25T16:53:52.630' AS DateTime), CAST(N'2023-09-25T16:53:52.633' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (42, 57, CAST(N'2023-09-23' AS Date), 5, NULL, CAST(N'2023-09-25T16:55:00.840' AS DateTime), CAST(N'2023-09-25T16:55:00.840' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (43, 56, CAST(N'2023-09-26' AS Date), 8.5, NULL, CAST(N'2023-09-26T13:25:49.317' AS DateTime), CAST(N'2023-09-26T13:25:49.320' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (44, 57, CAST(N'2023-09-26' AS Date), 2, NULL, CAST(N'2023-09-26T18:34:22.810' AS DateTime), CAST(N'2023-09-26T18:34:22.813' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (45, 57, CAST(N'2023-09-27' AS Date), 2, NULL, CAST(N'2023-09-28T10:33:46.917' AS DateTime), CAST(N'2023-09-28T10:33:46.917' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (46, 51, CAST(N'2023-09-28' AS Date), 8.5, NULL, CAST(N'2023-09-28T14:58:04.650' AS DateTime), CAST(N'2023-09-28T14:58:04.653' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (47, 58, CAST(N'2023-09-28' AS Date), 3, NULL, CAST(N'2023-09-28T15:00:21.210' AS DateTime), CAST(N'2023-09-28T15:00:21.210' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (48, 58, CAST(N'2023-09-28' AS Date), 4, NULL, CAST(N'2023-09-28T15:00:34.557' AS DateTime), CAST(N'2023-09-28T15:00:34.557' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (49, 58, CAST(N'2023-09-28' AS Date), 2, NULL, CAST(N'2023-09-28T15:20:06.720' AS DateTime), CAST(N'2023-09-28T15:20:06.723' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (50, 54, CAST(N'2023-10-06' AS Date), 8, NULL, CAST(N'2023-10-06T17:58:40.950' AS DateTime), CAST(N'2023-10-06T17:58:40.950' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (51, 22, CAST(N'2023-10-09' AS Date), 4, NULL, CAST(N'2023-10-09T17:01:45.763' AS DateTime), CAST(N'2023-10-09T17:01:45.767' AS DateTime), NULL)
INSERT [dbo].[WorkLog] ([WorkLogId], [ProjectWorkId], [WorkDoneOn], [WorkTime], [Description], [CreatedAt], [UpdateAt], [IsDeleted]) VALUES (52, 61, CAST(N'2023-10-12' AS Date), 8.5, NULL, CAST(N'2023-10-12T11:34:03.740' AS DateTime), CAST(N'2023-10-12T11:34:03.740' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[WorkLog] OFF
ALTER TABLE [dbo].[AttendanceInformation] ADD  CONSTRAINT [DF_AttendanceInformation_IsApproved]  DEFAULT ((0)) FOR [IsApproved]
GO
ALTER TABLE [dbo].[EmployeeDetails] ADD  DEFAULT ((0)) FOR [NotificationTypeResolutionChanged]
GO
ALTER TABLE [dbo].[EmployeeDetails] ADD  DEFAULT ((0)) FOR [NotificationOnAssignedWorkItemChangeByTeamMember]
GO
ALTER TABLE [dbo].[EmployeeDetails] ADD  DEFAULT ((0)) FOR [NotificationCommnetOnWork]
GO
ALTER TABLE [dbo].[EmployeeDetails] ADD  DEFAULT ((0)) FOR [NotificationAssignedWork]
GO
ALTER TABLE [dbo].[EmployeeDetails] ADD  DEFAULT ((0)) FOR [NotificationDailyAlertEmail]
GO
ALTER TABLE [dbo].[EmployeeDetails] ADD  DEFAULT ((0)) FOR [NotificationOnCreatedWorkItemChangeByTeamMember]
GO
ALTER TABLE [dbo].[EmployeeDetails] ADD  DEFAULT ((0)) FOR [IsPrimaryPC]
GO
ALTER TABLE [dbo].[EmployeeShift] ADD  DEFAULT ((0)) FOR [ShiftStartTime]
GO
ALTER TABLE [dbo].[EmployeeShift] ADD  DEFAULT ((0)) FOR [ShiftEndTime]
GO
ALTER TABLE [dbo].[EmployeeTimeLog] ADD  DEFAULT (getdate()) FOR [LogDate]
GO
ALTER TABLE [dbo].[EmployeeTimeLog] ADD  DEFAULT ((0)) FOR [FirstInTime]
GO
ALTER TABLE [dbo].[EmployeeTimeLog] ADD  DEFAULT ((0)) FOR [LastOutTime]
GO
ALTER TABLE [dbo].[EmployeeTimeLog] ADD  DEFAULT ((0)) FOR [TotalOutHours]
GO
ALTER TABLE [dbo].[LeaveRequest] ADD  DEFAULT (getdate()) FOR [LeaveStartDate]
GO
ALTER TABLE [dbo].[LeaveRequest] ADD  DEFAULT (getdate()) FOR [LeaveEndDate]
GO
ALTER TABLE [dbo].[LeaveRequest] ADD  DEFAULT ((0)) FOR [IsAdhocLeave]
GO
ALTER TABLE [dbo].[LeaveRequest] ADD  DEFAULT ((0)) FOR [AvailibiltyOnPhone]
GO
ALTER TABLE [dbo].[LeaveRequest] ADD  DEFAULT ((0)) FOR [AvailibiltyInCity]
GO
ALTER TABLE [dbo].[LeaveRequest] ADD  DEFAULT ('Pending') FOR [LeaveRequestStatus]
GO
ALTER TABLE [dbo].[PersonalDetails] ADD  DEFAULT ((0)) FOR [ProvidentFundNumber]
GO
ALTER TABLE [dbo].[PersonalDetails] ADD  DEFAULT ((0)) FOR [NSRNumber]
GO
ALTER TABLE [dbo].[ProjectWorkitems] ADD  CONSTRAINT [DF__ProjectWo__Proje__08B54D69]  DEFAULT ('Medium') FOR [ProjectWorkitemsPriority]
GO
ALTER TABLE [dbo].[ProjectWorkitems] ADD  CONSTRAINT [DF__ProjectWo__Origi__09A971A2]  DEFAULT ((0)) FOR [OriginalEstTime]
GO
ALTER TABLE [dbo].[ProjectWorkitems] ADD  CONSTRAINT [DF__ProjectWo__Remai__0A9D95DB]  DEFAULT ((0)) FOR [RemainingEstTime]
GO
ALTER TABLE [dbo].[ProjectWorkitems] ADD  CONSTRAINT [DF_ProjectWorkitems_TotalWorkDone]  DEFAULT ((0)) FOR [TotalWorkDone]
GO
ALTER TABLE [dbo].[ProjectWorkitems] ADD  CONSTRAINT [DF__ProjectWo__Relea__0B91BA14]  DEFAULT ((0)) FOR [ReleasedToProduction]
GO
ALTER TABLE [dbo].[ProjectWorkitems] ADD  CONSTRAINT [DF__ProjectWork__RSI__0C85DE4D]  DEFAULT ((1)) FOR [RSI]
GO
ALTER TABLE [dbo].[SubCategory] ADD  DEFAULT ((1)) FOR [ServicePersonId]
GO
ALTER TABLE [dbo].[SystemConfigurationDetails] ADD  DEFAULT ((0)) FOR [HasTakenHome]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF_TraineeFeedback_Attended]  DEFAULT ((0)) FOR [Attended]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__IsFee__7F6BDA51]  DEFAULT ((0)) FOR [IsFeedBackGiven]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__005FFE8A]  DEFAULT ((0)) FOR [FeedbackCourseCourseCoverage]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__015422C3]  DEFAULT ((0)) FOR [FeedbackCourseDelivery]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__024846FC]  DEFAULT ((0)) FOR [FeedbackCourseMaterial]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__033C6B35]  DEFAULT ((0)) FOR [FeedbackCourseQuality]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__04308F6E]  DEFAULT ((0)) FOR [FeedbackCourseAvailability]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__0524B3A7]  DEFAULT ((0)) FOR [FeedbackCourseManagements]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__0618D7E0]  DEFAULT ((0)) FOR [FeedbackFacultyKnowleage]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__070CFC19]  DEFAULT ((0)) FOR [FeedbackFacultyPresentation]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__08012052]  DEFAULT ((0)) FOR [FeedbackFacultyCoverage]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__08F5448B]  DEFAULT ((0)) FOR [FeedbackFacultyExamples]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__09E968C4]  DEFAULT ((0)) FOR [FeedbackFacultyLevel]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__0ADD8CFD]  DEFAULT ((0)) FOR [FeedbackSelfGain]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__0BD1B136]  DEFAULT ((0)) FOR [FeedbackSelfApplicability]
GO
ALTER TABLE [dbo].[TraineeFeedback] ADD  CONSTRAINT [DF__TraineeFe__Feedb__0CC5D56F]  DEFAULT ((0)) FOR [FeedbackOverallConduct]
GO
ALTER TABLE [dbo].[TraineeTraning] ADD  DEFAULT ((0)) FOR [Duration]
GO
ALTER TABLE [dbo].[TraineeTraning] ADD  DEFAULT ('--') FOR [faculties]
GO
ALTER TABLE [dbo].[TraineeTraning] ADD  DEFAULT ('Technical') FOR [category]
GO
ALTER TABLE [dbo].[TraineeTraning] ADD  DEFAULT ('Open Nomination') FOR [Type]
GO
ALTER TABLE [dbo].[TraineeTraning] ADD  DEFAULT ('Ongoing') FOR [Status]
GO
ALTER TABLE [dbo].[TraineeTraning] ADD  CONSTRAINT [DF_TraineeTraning_Location]  DEFAULT ('Traning Room') FOR [Location]
GO
ALTER TABLE [dbo].[UserCurrentProjectInformation] ADD  CONSTRAINT [DF_UserCurrentProjectInformation_HoursAllocated]  DEFAULT ((0)) FOR [HoursAllocated]
GO
ALTER TABLE [dbo].[WorkLog] ADD  CONSTRAINT [DF__WorkLog__WorkDon__0E6E26BF]  DEFAULT (getdate()) FOR [WorkDoneOn]
GO
ALTER TABLE [dbo].[WorkLog] ADD  CONSTRAINT [DF__WorkLog__WorkTim__0F624AF8]  DEFAULT ((0)) FOR [WorkTime]
GO
ALTER TABLE [dbo].[WorkLog] ADD  CONSTRAINT [DF__WorkLog__Remanin__10566F31]  DEFAULT ((0)) FOR [Description]
GO
ALTER TABLE [dbo].[AttendanceInformation]  WITH CHECK ADD  CONSTRAINT [FK__Attendanc__Emplo__114A936A] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[AttendanceInformation] CHECK CONSTRAINT [FK__Attendanc__Emplo__114A936A]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD FOREIGN KEY([ServiceGroupId])
REFERENCES [dbo].[ServiceGroup] ([ServiceGroupId])
GO
ALTER TABLE [dbo].[CountryVisaInformation]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[EmployeeDetails]  WITH CHECK ADD FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Department] ([DepartmentId])
GO
ALTER TABLE [dbo].[EmployeeDetails]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[EmployeeDetails]  WITH CHECK ADD FOREIGN KEY([ReportingPersonId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[EmployeeInOutTimeLog]  WITH CHECK ADD FOREIGN KEY([EmployeeLog])
REFERENCES [dbo].[EmployeeTimeLog] ([EmployeeTimeLogId])
GO
ALTER TABLE [dbo].[EmployeeInOutTimeLog]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[EmployeeShift]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[EmployeeTimeLog]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[LeaveRequest]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[LeaveRequest]  WITH CHECK ADD FOREIGN KEY([ReportingPersonId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[PersonalDetails]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[ProjectDescription]  WITH CHECK ADD FOREIGN KEY([ProjectTechId])
REFERENCES [dbo].[ProjectTech] ([ProjectTechId])
GO
ALTER TABLE [dbo].[ProjectWorkitems]  WITH CHECK ADD  CONSTRAINT [FK__ProjectWo__Assig__1CBC4616] FOREIGN KEY([AssignedEmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[ProjectWorkitems] CHECK CONSTRAINT [FK__ProjectWo__Assig__1CBC4616]
GO
ALTER TABLE [dbo].[ProjectWorkitems]  WITH CHECK ADD  CONSTRAINT [FK__ProjectWo__Proje__1DB06A4F] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectDescription] ([ProjectId])
GO
ALTER TABLE [dbo].[ProjectWorkitems] CHECK CONSTRAINT [FK__ProjectWo__Proje__1DB06A4F]
GO
ALTER TABLE [dbo].[ProjectWorkitems]  WITH CHECK ADD  CONSTRAINT [FK__ProjectWo__Repor__1EA48E88] FOREIGN KEY([ReportedEmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[ProjectWorkitems] CHECK CONSTRAINT [FK__ProjectWo__Repor__1EA48E88]
GO
ALTER TABLE [dbo].[ProjectWorkitems]  WITH CHECK ADD  CONSTRAINT [FK__ProjectWo__SubPr__1F98B2C1] FOREIGN KEY([SubProjectId])
REFERENCES [dbo].[SubProject] ([SubProjectId])
GO
ALTER TABLE [dbo].[ProjectWorkitems] CHECK CONSTRAINT [FK__ProjectWo__SubPr__1F98B2C1]
GO
ALTER TABLE [dbo].[ProjectWorkitems]  WITH CHECK ADD  CONSTRAINT [FK_ProjectWorkitems_Employee] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[ProjectWorkitems] CHECK CONSTRAINT [FK_ProjectWorkitems_Employee]
GO
ALTER TABLE [dbo].[ProjectWorkitems]  WITH CHECK ADD  CONSTRAINT [FK_ProjectWorkitems_WorkGroup] FOREIGN KEY([WorkGroupId])
REFERENCES [dbo].[WorkGroup] ([WorkGroupId])
GO
ALTER TABLE [dbo].[ProjectWorkitems] CHECK CONSTRAINT [FK_ProjectWorkitems_WorkGroup]
GO
ALTER TABLE [dbo].[ServiceRequest]  WITH CHECK ADD FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([CategoryId])
GO
ALTER TABLE [dbo].[ServiceRequest]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[ServiceRequest]  WITH CHECK ADD FOREIGN KEY([ReportingPersonId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[ServiceRequest]  WITH CHECK ADD FOREIGN KEY([ServiceGroupId])
REFERENCES [dbo].[ServiceGroup] ([ServiceGroupId])
GO
ALTER TABLE [dbo].[ServiceRequest]  WITH CHECK ADD FOREIGN KEY([SubCategoryId])
REFERENCES [dbo].[SubCategory] ([SubCategoryId])
GO
ALTER TABLE [dbo].[ServiceRequestHistory]  WITH CHECK ADD FOREIGN KEY([ServiceRequestId])
REFERENCES [dbo].[ServiceRequest] ([ServiceRequestId])
GO
ALTER TABLE [dbo].[ServiceRequestHistory]  WITH CHECK ADD FOREIGN KEY([ServiceEmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[SubCategory]  WITH CHECK ADD FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([CategoryId])
GO
ALTER TABLE [dbo].[SubCategory]  WITH CHECK ADD  CONSTRAINT [FK_SubCategory_ServicePerson] FOREIGN KEY([ServicePersonId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[SubCategory] CHECK CONSTRAINT [FK_SubCategory_ServicePerson]
GO
ALTER TABLE [dbo].[SubProject]  WITH CHECK ADD FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectDescription] ([ProjectId])
GO
ALTER TABLE [dbo].[SystemConfigurationDetails]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[TraineeFeedback]  WITH CHECK ADD  CONSTRAINT [FK__TraineeFe__Emplo__7D8391DF] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[TraineeFeedback] CHECK CONSTRAINT [FK__TraineeFe__Emplo__7D8391DF]
GO
ALTER TABLE [dbo].[TraineeFeedback]  WITH CHECK ADD  CONSTRAINT [FK__TraineeFe__Trani__7E77B618] FOREIGN KEY([TraningId])
REFERENCES [dbo].[TraineeTraning] ([TraningId])
GO
ALTER TABLE [dbo].[TraineeFeedback] CHECK CONSTRAINT [FK__TraineeFe__Trani__7E77B618]
GO
ALTER TABLE [dbo].[UserCurrentProjectInformation]  WITH CHECK ADD  CONSTRAINT [FK__UserCurre__Emplo__2B0A656D] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[UserCurrentProjectInformation] CHECK CONSTRAINT [FK__UserCurre__Emplo__2B0A656D]
GO
ALTER TABLE [dbo].[UserCurrentProjectInformation]  WITH CHECK ADD  CONSTRAINT [FK__UserCurre__Proje__2BFE89A6] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectDescription] ([ProjectId])
GO
ALTER TABLE [dbo].[UserCurrentProjectInformation] CHECK CONSTRAINT [FK__UserCurre__Proje__2BFE89A6]
GO
ALTER TABLE [dbo].[WorkGroup]  WITH CHECK ADD  CONSTRAINT [FK_WorkGroup_ProjectDescription] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[ProjectDescription] ([ProjectId])
GO
ALTER TABLE [dbo].[WorkGroup] CHECK CONSTRAINT [FK_WorkGroup_ProjectDescription]
GO
ALTER TABLE [dbo].[WorkItemAttachments]  WITH CHECK ADD  CONSTRAINT [FK__WorkItemA__Proje__62AFA012] FOREIGN KEY([ProjectWorkId])
REFERENCES [dbo].[ProjectWorkitems] ([ProjectWorkId])
GO
ALTER TABLE [dbo].[WorkItemAttachments] CHECK CONSTRAINT [FK__WorkItemA__Proje__62AFA012]
GO
ALTER TABLE [dbo].[WorkItemHistory]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[WorkItemHistory]  WITH CHECK ADD  CONSTRAINT [FK__WorkItemH__Proje__6B44E613] FOREIGN KEY([ProjectWorkId])
REFERENCES [dbo].[ProjectWorkitems] ([ProjectWorkId])
GO
ALTER TABLE [dbo].[WorkItemHistory] CHECK CONSTRAINT [FK__WorkItemH__Proje__6B44E613]
GO
ALTER TABLE [dbo].[WorkitemsComments]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[WorkitemsComments]  WITH CHECK ADD  CONSTRAINT [FK__Workitems__Proje__51851410] FOREIGN KEY([ProjectWorkId])
REFERENCES [dbo].[ProjectWorkitems] ([ProjectWorkId])
GO
ALTER TABLE [dbo].[WorkitemsComments] CHECK CONSTRAINT [FK__Workitems__Proje__51851410]
GO
ALTER TABLE [dbo].[WorkItemState]  WITH CHECK ADD FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([EmployeeId])
GO
ALTER TABLE [dbo].[WorkItemState]  WITH CHECK ADD  CONSTRAINT [FK__WorkItemS__Proje__5A1A5A11] FOREIGN KEY([ProjectWorkId])
REFERENCES [dbo].[ProjectWorkitems] ([ProjectWorkId])
GO
ALTER TABLE [dbo].[WorkItemState] CHECK CONSTRAINT [FK__WorkItemS__Proje__5A1A5A11]
GO
ALTER TABLE [dbo].[WorkLog]  WITH CHECK ADD  CONSTRAINT [FK__WorkLog__Project__2CF2ADDF] FOREIGN KEY([ProjectWorkId])
REFERENCES [dbo].[ProjectWorkitems] ([ProjectWorkId])
GO
ALTER TABLE [dbo].[WorkLog] CHECK CONSTRAINT [FK__WorkLog__Project__2CF2ADDF]
GO
ALTER TABLE [dbo].[LeaveRequest]  WITH CHECK ADD  CONSTRAINT [Constraint_AdhocLeaveStatus] CHECK  (([AdhocLeaveStatus]='InformByTm' OR [AdhocLeaveStatus]='Inform' OR [AdhocLeaveStatus]='UnInform'))
GO
ALTER TABLE [dbo].[LeaveRequest] CHECK CONSTRAINT [Constraint_AdhocLeaveStatus]
GO
ALTER TABLE [dbo].[LeaveRequest]  WITH CHECK ADD  CONSTRAINT [Constraint_LeaveRequestStatus] CHECK  (([LeaveRequestStatus]='Rejected' OR [LeaveRequestStatus]='Approved' OR [LeaveRequestStatus]='Cancelled' OR [LeaveRequestStatus]='Pending'))
GO
ALTER TABLE [dbo].[LeaveRequest] CHECK CONSTRAINT [Constraint_LeaveRequestStatus]
GO
ALTER TABLE [dbo].[ProjectWorkitems]  WITH CHECK ADD  CONSTRAINT [Constraint_ProjectWorkitemsPriority] CHECK  (([ProjectWorkitemsPriority]='High' OR [ProjectWorkitemsPriority]='Medium' OR [ProjectWorkitemsPriority]='Low'))
GO
ALTER TABLE [dbo].[ProjectWorkitems] CHECK CONSTRAINT [Constraint_ProjectWorkitemsPriority]
GO
ALTER TABLE [dbo].[WorkItemAttachments]  WITH CHECK ADD  CONSTRAINT [CK_WorkItemAttachments_FileType] CHECK  (([filetype]='.gif' OR [filetype]='.bmp' OR [filetype]='.png' OR [filetype]='.jpg' OR [filetype]='.jpeg' OR [filetype]='.pdf' OR [filetype]='.xls' OR [filetype]='.txt' OR [filetype]='.docx'))
GO
ALTER TABLE [dbo].[WorkItemAttachments] CHECK CONSTRAINT [CK_WorkItemAttachments_FileType]
GO
/****** Object:  StoredProcedure [dbo].[SP_AddLeaveRequest]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_AddLeaveRequest]
    @EmployeeId BIGINT,
    @ReportingPersonId BIGINT,
    @ReasonForLeave NVARCHAR(255),
    @LeaveStartDate DATE = GETDATE,
    @LeaveEndDate DATE = GETDATE,
    @StartDateAttendanceOption INT,
    @EndDateAttendanceOption INT,
    @IsAdhocLeave BIT = 0,
    @AdhocLeaveStatus VARCHAR(128) = NULL,
    @PhoneNumber BIGINT,
    @AlternatePhoneNumber BIGINT,
    @AvailibiltyOnPhone BIT = 0,
    @AvailibiltyInCity BIT = 0,
	@InsertSuccess BIT OUT
AS
BEGIN
    DECLARE @EmployeeFirstName NVARCHAR(50);
    DECLARE @EmployeeLastName NVARCHAR(50);
    DECLARE @ReportingPersonFirstName NVARCHAR(50);
    DECLARE @ReportingPersonLastName NVARCHAR(50);

  
    SELECT @EmployeeFirstName = FirstName, @EmployeeLastName = LastName
    FROM Employee 
    WHERE EmployeeId = @EmployeeId;

    
    SELECT @ReportingPersonFirstName = FirstName, @ReportingPersonLastName = LastName
    FROM Employee
    WHERE EmployeeId = @ReportingPersonId;

   
    INSERT INTO LeaveRequest (EmployeeId, ReportingPersonId, ReasonForLeave, LeaveStartDate, LeaveEndDate,
        StartDateAttendanceOption, EndDateAttendanceOption, IsAdhocLeave, AdhocLeaveStatus,
        PhoneNumber, AlternatePhoneNumber, AvailibiltyOnPhone, AvailibiltyInCity)
    VALUES (@EmployeeId, @ReportingPersonId, @ReasonForLeave, @LeaveStartDate, @LeaveEndDate,
        @StartDateAttendanceOption, @EndDateAttendanceOption, @IsAdhocLeave, @AdhocLeaveStatus,
        @PhoneNumber, @AlternatePhoneNumber, @AvailibiltyOnPhone, @AvailibiltyInCity);
		
	SET @InsertSuccess = CASE WHEN @@ROWCOUNT = 0 THEN 0 ELSE 1 END
   
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddOrUpdateAttendance]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_AddOrUpdateAttendance]
    @employeeId BIGINT,
    @attendanceOption INT,
    @status BIT OUT,
    @message VARCHAR(255) OUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Add time log
    DECLARE @logDate DATE = GETDATE();
    DECLARE @lateComer BIT = 0;
    DECLARE @firstInTime FLOAT;
    DECLARE @lastOutTime FLOAT;
    
    IF @attendanceOption = 1
    BEGIN
        SET @firstInTime = 9.0;
        SET @lastOutTime = 18.5;
    END
    ELSE IF @attendanceOption = 2
    BEGIN
        SET @firstInTime = 9.0;
        SET @lastOutTime = 13.0;
    END
    ELSE IF @attendanceOption = 3
    BEGIN
        SET @firstInTime = 0.0;
        SET @lastOutTime = 0.0;
    END
    
    -- Update or insert attendance information
    UPDATE [dbo].[AttendanceInformation]
    SET 
        AttendanceOption = @attendanceOption
    WHERE EmployeeId = @employeeId AND AttendanceDate = @logDate;

	 -- Update time log entry
	UPDATE [dbo].[EmployeeTimeLog]
	SET FirstInTime = @firstInTime,
		LastOutTime = @lastOutTime
	WHERE EmployeeId = @employeeId AND LogDate = @logDate;

    IF @@ROWCOUNT = 0
    BEGIN
        INSERT INTO [dbo].[AttendanceInformation] (EmployeeId, AttendanceOption, AttendanceDate)
        VALUES (@employeeId, @attendanceOption, @logDate);

		 -- Add time log entry
		INSERT INTO [dbo].[EmployeeTimeLog] (EmployeeId, LogDate, LateComer, FirstInTime, LastOutTime)
		VALUES (@employeeId, @logDate, @lateComer, @firstInTime, @lastOutTime);

        IF @@ROWCOUNT = 1
        BEGIN
            SET @status = 1;
            SET @message = 'New entry added successfully.';
        END
        ELSE
        BEGIN
            SET @status = 0;
            SET @message = 'Failed to add new entry.';
        END
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Existing entry updated successfully.';
    END

END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddWorkItem]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_AddWorkItem]
@ProjectId BIGINT,
@EmployeeId BIGINT,
@SubProjectId BIGINT,
@Title VARCHAR(128),
@WorkGroupId BIGINT,
@WorkFlow BIGINT,
@Priority VARCHAR(16),
@ProjectStatusId INT,
@StartDate DATETIME = GETDATE,
@EndDate DATETIME = GETDATE,
@OriginalEstTime FLOAT = 0,
@RemaningEstTime FLOAT = 0,
@AssignedEmployeeId BIGINT = @EmployeeId,
@ReportedEmployeeId BIGINT = @EmployeeId,
@ReleasedToProduction BIT = 0,
@RSI FLOAT = 1,
@Description VARCHAR(MAX),
@status BIT OUT,
@message VARCHAR(255) OUT,
@GeneratedID BIGINT OUT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @InsertedRows TABLE (ID BIGINT); -- Create a table variable to store the generated ID
    
    INSERT INTO ProjectWorkitems (
        EmployeeId, 
        ProjectId, 
        SubProjectId, 
        Title, 
        WorkGroupId, 
        WorkFlow, 
        ProjectWorkitemsPriority, 
        ProjectStatusId, 
        StartDate, 
        EndDate, 
        OriginalEstTime, 
        RemainingEstTime, 
        AssignedEmployeeId, 
        ReportedEmployeeId, 
        ReleasedToProduction, 
        RSI, 
        [Description]
    )
    OUTPUT INSERTED.[ProjectWorkId] INTO @InsertedRows(ID) -- Use the OUTPUT clause to capture the generated ID
    VALUES (
        @EmployeeId,
        @ProjectId,
        @SubProjectId,
        @Title,
        @WorkGroupId,
        @WorkFlow,
        @Priority,
        @ProjectStatusId,
        @StartDate,
        @EndDate,
        @OriginalEstTime,
        @RemaningEstTime,
        @AssignedEmployeeId,
        @ReportedEmployeeId,
        @ReleasedToProduction,
        @RSI,
        @Description
    );

    -- Check if any rows were inserted
    IF @@ROWCOUNT > 0
    BEGIN
        SET @status = 1;
        SET @message = 'Project work item created successfully';
        SET @GeneratedID = (SELECT ID FROM @InsertedRows); -- Set the generated ID
    END
    ELSE
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to create work item. Please try again.';
        SET @GeneratedID = NULL; -- No ID generated in case of failure
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddWorkItemAttachment]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_AddWorkItemAttachment]
    @ProjectWorkId BIGINT,
    @FilePath NVARCHAR(256),
	@FileName NVARCHAR(256) = NULL,
    @Description NVARCHAR(256) = NULL,
    @filetype VARCHAR(32),
	@status BIT OUT,
	@message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the filetype is allowed
    IF @filetype NOT IN ('.docx', '.txt', '.xls', '.pdf', '.jpeg', '.jpg', '.png', '.bmp', '.gif')
    BEGIN
        RAISERROR('Invalid filetype. Only .docx, .txt, .xls, .pdf, .jpeg, .jpg, .png, .bmp, and .gif are allowed.', 16, 1);
        RETURN;
    END

    INSERT INTO [dbo].[WorkItemAttachments] ([ProjectWorkId], [FileName], [FilePath], [Description], [filetype])
    VALUES (@ProjectWorkId, @FileName, @FilePath, @Description, @filetype);

	SET @status  =  CASE WHEN @@ROWCOUNT = 0 THEN 0 ELSE 1 END;
	SET @message =  CASE WHEN @@ROWCOUNT = 0 THEN 'Somthing went wrong unable to create work item attachment, Please try again!' 
					ELSE 'Project work item attachment created sucessfully' END;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddWorkItemComment]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_AddWorkItemComment]
@ProjectWorkId BIGINT,
@EmployeeId BIGINT,
@Comments VARCHAR(256),
@status BIT OUT,
@message VARCHAR(255) OUT 
AS
BEGIN 
    SET NOCOUNT ON;

    INSERT INTO [dbo].[WorkitemsComments] (
        [ProjectWorkId],
        [EmployeeId],
        [COMMENTS]
    )
    VALUES (
        @ProjectWorkId,
        @EmployeeId,
        @Comments
    )

    SET @status =  CASE WHEN @@ROWCOUNT = 0 THEN 0 ELSE 1 END;
    SET @message =  CASE WHEN @@ROWCOUNT = 0 THEN 'Something went wrong. Unable to add comment, please try again!' 
                ELSE 'Comment added successfully.' END;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddWorkLog]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_AddWorkLog]
@ProjectWorkId BIGINT,
@WorkDoneOn DATE,
@WorkTime FLOAT,
@Description VARCHAR(256),
@status BIT OUT,
@message VARCHAR(255) OUT 
AS
BEGIN 
	SET NOCOUNT ON;
	INSERT INTO [dbo].[WorkLog] (
	[ProjectWorkId],
	[WorkDoneOn],
	[WorkTime],
	[Description])
	VALUES(
	@ProjectWorkId,
	@WorkDoneOn,
	@WorkTime,
	@Description);

	SET @status  =  CASE WHEN @@ROWCOUNT = 0 THEN 0 ELSE 1 END;
	SET @message =  CASE WHEN @@ROWCOUNT = 0 THEN 'Somthing went wrong unable to create work log, Please try again!' END;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ApproveAttendance]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_ApproveAttendance]
    @employeeId BIGINT,
    @reportingPersonId BIGINT,
    @attendanceDate DATETIME,
    @isApproved BIT,
    @status BIT OUT,
    @message VARCHAR(255) OUT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @AttendanceInfoId INT;
    
    -- Check if the reporting person is valid
    IF NOT EXISTS (SELECT 1 FROM [dbo].[EmployeeDetails] ED WHERE ED.EmployeeId = @employeeId AND ED.ReportingPersonId = @reportingPersonId)
    BEGIN
        SET @status = 0;
        SET @message = 'Invalid reporting person.';
        RETURN;
    END;
    
    -- Check if the attendance information exists for the given employee and date
    SELECT @AttendanceInfoId = AttendanceInfoId
    FROM [dbo].[AttendanceInformation]
    WHERE EmployeeId = @employeeId
        AND CONVERT(DATE, AttendanceDate) = @attendanceDate;
    
    IF @AttendanceInfoId IS NULL
    BEGIN
        SET @status = 0;
        SET @message = 'Attendance information does not exist.';
        RETURN;
    END;
    
    -- Update the attendance information with the approval status
    UPDATE [dbo].[AttendanceInformation]
    SET IsApproved = @isApproved
    WHERE AttendanceInfoId = @AttendanceInfoId;
    
    SET @status = 1;
    SET @message = 'Attendance approval updated successfully.';
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ChangeNotificationSetting]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_ChangeNotificationSetting]
    @employeeId BIGINT,
    @notificationTypeResolutionChanged BIT,
	@notificationOnAssignedWorkItemChangeByTeamMember BIT,
    @notificationCommnetOnWork BIT,
	@notificationAssignedWork BIT, 
	@notificationDailyAlertEmail BIT, 
	@notificationOnCreatedWorkItemChangeByTeamMember BIT,
    @status BIT OUT,
    @message VARCHAR(255) OUT 
AS 
BEGIN
    SET NOCOUNT ON;

    DECLARE @employeeExists BIT;

    -- Check if the employee with the given ID exists
    SET @employeeExists = 0;
    IF EXISTS (
        SELECT 1 
        FROM [WorkSpaceDb].[dbo].[Employee] 
        WHERE EmployeeId = @employeeId 
    )
    BEGIN
        SET @employeeExists = 1;
    END

    IF @employeeExists = 0
    BEGIN
        SET @status = 0; 
        SET @message = 'User id is not correct, Please try again!';
        RETURN;
    END

    UPDATE [WorkSpaceDb].[dbo].[EmployeeDetails]
    SET 
	[NotificationTypeResolutionChanged] = @notificationTypeResolutionChanged,
	[NotificationOnAssignedWorkItemChangeByTeamMember] = @notificationOnAssignedWorkItemChangeByTeamMember,
	[NotificationCommnetOnWork] = @notificationCommnetOnWork,
	[NotificationAssignedWork] = @notificationAssignedWork,
	[NotificationDailyAlertEmail] = @notificationDailyAlertEmail,
	[NotificationOnCreatedWorkItemChangeByTeamMember] = @notificationOnCreatedWorkItemChangeByTeamMember
    WHERE EmployeeId = @employeeId;

    IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to change notification setting. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Notification setting changed successfully.';
    END

	--DECLARE @showstatus BIT, @showmessage VARCHAR(255);
	--EXEC [SP_ChangeNotificationSetting] 
	--@employeeId = 1, 
	--@notificationTypeResolutionChanged = 1,
	--@NotificationOnAssignedWorkItemChangeByTeamMember = 0,
 --   @NotificationCommnetOnWork = 0,
	--@NotificationAssignedWork = 1,
	--@NotificationDailyAlertEmail = 0,
	--@NotificationOnCreatedWorkItemChangeByTeamMember = 1,
	--@status = @showstatus output,
	--@message = @showmessage output 
	--SELECT @showstatus AS '@showmessage',
	--	   @showmessage AS '@showmessage';
	--SELECT * FROM EmployeeDetails;

END
GO
/****** Object:  StoredProcedure [dbo].[SP_ChangePassword]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_ChangePassword]
    @employeeId BIGINT,
    @oldPassword NVARCHAR(255),
    @newPassword NVARCHAR(255),
    @status BIT OUT,
    @message VARCHAR(255) OUT 
AS 
BEGIN
    SET NOCOUNT ON;

    DECLARE @employeeExists BIT;

    -- Check if the employee with the given ID and old password exists
    SET @employeeExists = 0;
    IF EXISTS (
        SELECT 1 
        FROM [WorkSpaceDb].[dbo].[Employee] 
        WHERE EmployeeId = @employeeId AND EmployeePassword = @oldPassword
    )
    BEGIN
        SET @employeeExists = 1;
    END

    IF @employeeExists = 0
    BEGIN
        SET @status = 0; 
        SET @message = 'Current Password is not correct, Please try again!';
        RETURN;
    END

    UPDATE [WorkSpaceDb].[dbo].[Employee] 
    SET EmployeePassword = @newPassword
    WHERE EmployeeId = @employeeId;

    IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to change password. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Password changed successfully.';
    END

	--DECLARE @showstatus BIT, @showmessage VARCHAR(255);
	--EXEC [SP_ChangePassword] 
	--@employeeId = 1, 
	--@oldPassword = 'Rohit@0013', 
	--@newPassword = 'Rohit@2002', 
	--@status = @showstatus output,
	--@message = @showmessage output 
	--SELECT @showstatus AS '@showmessage',
	--	   @showmessage AS '@showmessage';
	--SELECT * FROM Employee;

END
GO
/****** Object:  StoredProcedure [dbo].[SP_CreateEmployeeTravels]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_CreateEmployeeTravels]
    @employeeId BIGINT,
    @countryName VARCHAR(255),
    @visaType VARCHAR(128),
    @visaValidFor DATE,
    @status BIT OUT,
    @message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[CountryVisaInformation] (EmployeeId, CountryName, VisaType, VisaValidFor)
	VALUES (@employeeId, @countryName, @visaType, @visaValidFor);

    IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to create a new entry. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Entry create successfully.';
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CreateServiceRequest]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_CreateServiceRequest]
    @EmployeeId BIGINT,
    @ServiceGroupId INT,
    @CategoryId INT,
    @SubCategoryId INT,
    @ServiceRequestPriority VARCHAR(16),
    @ServiceDetails VARCHAR(255),
    @IsInsertSuccessful BIT OUTPUT
AS
BEGIN
    DECLARE @DynamicSQL NVARCHAR(MAX);
    DECLARE @ServiceRequestId INT; -- Add this variable

    -- Insert into ServiceRequest table
    INSERT INTO ServiceRequest (EmployeeId, ReportingPersonId, ServiceGroupId, CategoryId, SubCategoryId, ServiceRequetPriority, ServiceDetails)
    VALUES (@EmployeeId, (SELECT TOP 1 ServicePersonId FROM dbo.SubCategory WHERE SubCategoryId = @SubCategoryId),
            @ServiceGroupId, @CategoryId, @SubCategoryId, @ServiceRequestPriority, @ServiceDetails);

    -- Get the ServiceRequestId
    SET @ServiceRequestId = SCOPE_IDENTITY();

    -- Insert into servicerequestHistorytable
    INSERT INTO ServiceRequestHistory (ServiceRequestId, ServiceEmployeeId, Comments, AttachmentsDocumentPath, RequestStatus, createdAt)
    VALUES (@ServiceRequestId, @EmployeeId, NULL, NULL, 2, GETDATE());

    SET @IsInsertSuccessful = 1;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteEmployeeTravels]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_DeleteEmployeeTravels]
    @visaInfoId BIGINT,
    @status BIT OUT,
    @message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM [dbo].[CountryVisaInformation]
    WHERE VisaInfoId = @visaInfoId;

    IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to delete the entry. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Entry deleted successfully.';
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteLeaveRequest]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_DeleteLeaveRequest]
    @EmployeeId BIGINT,
    @LeaveRequestId INT,
    @IsDeleted BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

   
    IF EXISTS (SELECT 1 FROM LeaveRequest WHERE EmployeeId = @EmployeeId)
    BEGIN
      
        IF EXISTS (SELECT 1 FROM LeaveRequest WHERE EmployeeId = @EmployeeId AND LeaveRequestId = @LeaveRequestId)
       BEGIN
        
        UPDATE LeaveRequest
        SET LeaveRequestStatus = 'Cancelled'
        WHERE EmployeeId = @EmployeeId AND LeaveRequestId = @LeaveRequestId;

        -- Set output variable to indicate successful soft delete
        SET @IsDeleted = 1;
    END
        ELSE
        BEGIN
            SET @IsDeleted = 0; 
        END
    END
    ELSE
    BEGIN
        SET @IsDeleted = 0; 
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteWorkItem]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_DeleteWorkItem]
	@ProjectWorkId BIGINT,
	@status BIT OUT,
	@message VARCHAR(255) OUT 
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE ProjectWorkitems 
	SET IsDeleted = 1
	WHERE ProjectWorkId = @ProjectWorkId;

	SET @status = CASE WHEN @@ROWCOUNT = 0 THEN 0 ELSE 1 END;
	SET @message = CASE WHEN @@ROWCOUNT = 0 THEN 'Something went wrong. Unable to delete work item, please try again!' ELSE 'Project work item deleted successfully' END

END
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteWorkItemAttachment]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_DeleteWorkItemAttachment]
    @WorkItemAttachmentsId BIGINT,
    @status BIT OUT,
    @message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM [dbo].[WorkItemAttachments]
    WHERE WorkItemAttachmentsId = @WorkItemAttachmentsId;

    IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to delete the entry. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Entry deleted successfully.';
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteWorkItemComments]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_DeleteWorkItemComments]
    @WorkItemCommentId BIGINT,
    @status BIT OUT,
    @message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM [dbo].[WorkitemsComments]
    WHERE [WorkItemCommentId] = @WorkItemCommentId;

    IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to delete the entry. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Entry deleted successfully.';
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteWorkLog]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_DeleteWorkLog]
    @WorkLogId BIGINT,
    @status BIT OUT,
    @message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ProjectWorkId BIGINT;
    DECLARE @WorkTime FLOAT;
    DECLARE @RemainingEstTime FLOAT;
    DECLARE @TotalWorkDone FLOAT;

    SELECT @ProjectWorkId = [ProjectWorkId], @WorkTime = [WorkTime]
    FROM [dbo].[WorkLog]
    WHERE WorkLogId = @WorkLogId;

    IF @ProjectWorkId IS NULL
    BEGIN
        SET @status = 0;
        SET @message = 'WorkLog entry not found.';
        RETURN;
    END

    SELECT @RemainingEstTime = [RemainingEstTime], @TotalWorkDone = [TotalWorkDone]
    FROM [dbo].[ProjectWorkitems]
    WHERE ProjectWorkId = @ProjectWorkId;

    DELETE FROM [dbo].[WorkLog]
    WHERE WorkLogId = @WorkLogId;

    IF @TotalWorkDone >= @WorkTime
    BEGIN
        UPDATE [dbo].[ProjectWorkitems] 
        SET [RemainingEstTime] = (@RemainingEstTime + @WorkTime), [TotalWorkDone] = (@TotalWorkDone - @WorkTime)
        WHERE [ProjectWorkId] = @ProjectWorkId;
    END

    IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to delete the entry. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Entry deleted successfully.';
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ForgotPassword]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_ForgotPassword]
@userName VARCHAR(255)
AS 
BEGIN
    SET NOCOUNT ON;

	SELECT E.Email,
	E.EmployeePassword AS [Password]
	FROM Employee E
	WHERE E.UserName = @userName;

	--EXEC [SP_ForgotPassword] @userName = 'rohit.tekchandani';
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAllWorkGroupEmployee]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE    PROCEDURE [dbo].[SP_GetAllWorkGroupEmployee]
@ProjectId BIGINT
AS 
BEGIN
    SET NOCOUNT ON;
	SELECT E.EmployeeId AS KeyId, CONCAT(E.FirstName, ' ', E.LastName) AS DataValue FROM Employee E
	LEFT JOIN UserCurrentProjectInformation UP ON UP.EmployeeId = E.EmployeeId
	WHERE UP.ProjectId = @ProjectId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetAllWorkGroupSubProject]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetAllWorkGroupSubProject]
@ProjectId BIGINT
AS 
BEGIN
    SET NOCOUNT ON;
	SELECT SBP.SubProjectId AS KeyId, SBP.SubProjectName AS DataValue FROM [dbo].[SubProject] SBP
	WHERE SBP.ProjectId = @ProjectId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetCategoriesOfService]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetCategoriesOfService] 
    @InputServiceGroupId BIGINT
AS
BEGIN
    SELECT CategoryId AS [Key], categoryName AS [Value]
    FROM category
    WHERE serviceGroupId = @InputServiceGroupId;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetDashBoardInfo]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetDashBoardInfo] 
	@EmployeeId BIGINT
AS
BEGIN
	SET NOCOUNT ON;
	DEClARE @IsAttendanceAdded BIT = 0,
			@MonthlyHalfLeaves INT = 0,
			@MonthlyFullLeaves INT = 0,
			@YearlyTotalLeaves FLOAT = 0,
			@MonthlyTotalLeaves FLOAT = 0,
			@MonthlyLeaveDates VARCHAR(255) = '',
			@MonthlyTimeLog FLOAT = 0,
			@MonthlyWorkLog FLOAT = 0,
			@MonthlyPendingWorkLogEntryCount INT = 0,
			@AssignWorkHours FLOAT = 0,
			@WorkHours FLOAT = 0,
			@TotalWorkItems INT = 0;
	
	DECLARE @Month INT, @Year INT, @StartDate DATE, @EndDate DATE;
	
	SET @Month = MONTH(GETDATE());
    SET @Year = YEAR(GETDATE());
    SET @StartDate = DATEFROMPARTS(@Year, @Month, 1);
    SET @EndDate = DATEADD(MONTH, 1, @StartDate);

	--Getting data for "My Monthly Leaves" section in dashboard

	SET @IsAttendanceAdded = 
	CASE WHEN EXISTS (SELECT 1 FROM [dbo].[AttendanceInformation] AT 
	WHERE AT.[EmployeeId] = @EmployeeId AND CONVERT(DATE, AT.AttendanceDate) = CONVERT(DATE, GETDATE()))
      THEN CAST(1 AS BIT)
      ELSE CAST(0 AS BIT) 
	END;

	
	SET @MonthlyHalfLeaves = (SELECT COUNT(*) FROM [dbo].[AttendanceInformation] AT
	WHERE AT.[EmployeeId] = @EmployeeId
	AND AT.[AttendanceOption] = 3
	AND CONVERT(DATE, AT.AttendanceDate) >= @StartDate
	AND CONVERT(DATE, AT.AttendanceDate) < @EndDate);

	SET @MonthlyFullLeaves = (SELECT COUNT(*) FROM [dbo].[AttendanceInformation] AT
	WHERE AT.[EmployeeId] = @EmployeeId
	AND AT.[AttendanceOption] = 2
	AND CONVERT(DATE, AT.AttendanceDate) >= @StartDate
	AND CONVERT(DATE, AT.AttendanceDate) < @EndDate);

	SET @MonthlyTotalLeaves = (@MonthlyHalfLeaves * 0.5) + @MonthlyFullLeaves;

	DECLARE @TempYearlyTotalHalfLeaves INT = 0, @TempYearlyTotalFullLeaves INT = 0;

	SET @TempYearlyTotalHalfLeaves = (SELECT COUNT(*) FROM [dbo].[AttendanceInformation] AT
	WHERE AT.[EmployeeId] = @EmployeeId
	AND AT.[AttendanceOption] = 3
	AND CONVERT(DATE, AT.AttendanceDate) >= DATEFROMPARTS(@Year, 1, 1)
	AND CONVERT(DATE, AT.AttendanceDate) < DATEADD(MONTH, 12, DATEFROMPARTS(@Year, 1, 1)));

	SET @TempYearlyTotalFullLeaves = (SELECT COUNT(*) FROM [dbo].[AttendanceInformation] AT
	WHERE AT.[EmployeeId] = @EmployeeId
	AND AT.[AttendanceOption] = 2
	AND CONVERT(DATE, AT.AttendanceDate) >= DATEFROMPARTS(@Year, 1, 1)
	AND CONVERT(DATE, AT.AttendanceDate) < DATEADD(MONTH, 12, DATEFROMPARTS(@Year, 1, 1)));

	SET @YearlyTotalLeaves = (@TempYearlyTotalHalfLeaves * 0.5) + @TempYearlyTotalFullLeaves;

	SET @MonthlyLeaveDates = (SELECT STRING_AGG(DAY(AT.AttendanceDate), ', ') FROM [dbo].[AttendanceInformation] AT
	WHERE AT.[EmployeeId] = @EmployeeId
	AND (AT.[AttendanceOption] = 2 OR AT.[AttendanceOption] = 3)
	AND CONVERT(DATE, AT.AttendanceDate) >= @StartDate
	AND CONVERT(DATE, AT.AttendanceDate) < @EndDate);

	--Getting data for "My Monthly Average" section in dashboard
	SET @MonthlyTimeLog = (SELECT
    ABS(AVG((etl.LastOutTime - etl.FirstInTime)-1)) 
	FROM dbo.AttendanceInformation ai
	INNER JOIN dbo.EmployeeTimeLog etl ON ai.EmployeeId = etl.EmployeeId
	WHERE ai.EmployeeId = @EmployeeId 
	AND DATEPART(MONTH, etl.LogDate) = @Month
	AND DATEPART(YEAR, etl.LogDate) = @Year
	GROUP BY DATEPART(MONTH, etl.LogDate));

	SET @MonthlyWorkLog = (SELECT AVG(wl.WorkTime) 
	FROM dbo.ProjectWorkitems pw
	INNER JOIN dbo.WorkLog wl ON pw.ProjectWorkId = wl.ProjectWorkId
	WHERE pw.EmployeeId = @EmployeeId 
	AND DATEPART(MONTH, wl.WorkDoneOn) = @Month
	AND DATEPART(YEAR, wl.WorkDoneOn) = @Year
	GROUP BY DATEPART(MONTH, wl.WorkDoneOn));

	DECLARE @TempTotalDaysInMonth INT = (SELECT DAY(EOMONTH(@StartDate)));

	DECLARE @TempWorkingDays INT = (SELECT DISTINCT COUNT(WL.WorkDoneOn) 
	FROM [dbo].[WorkLog] WL
	INNER JOIN dbo.ProjectWorkitems PWI ON PWI.ProjectWorkId = WL.ProjectWorkId
	WHERE DATEPART(WEEKDAY, WL.WorkDoneOn) NOT IN (1, 7)
	AND PWI.EmployeeId = 1
	AND WL.WorkDoneOn >= @StartDate
	AND WL.WorkDoneOn < @EndDate);

	DECLARE @TempHolidaysInMonth INT = 
	(SELECT COUNT(*)
	FROM [WorkSpaceDb].[dbo].[Holidays] H
	WHERE H.[Date] >= @StartDate
	AND H.[Date] < @EndDate
	AND DATEPART(WEEKDAY, H.[Date]) NOT IN (1, 7));

	SET @MonthlyPendingWorkLogEntryCount = ABS(@TempTotalDaysInMonth - @TempWorkingDays - @TempHolidaysInMonth);

	-- Getting data for "My Assigments" section in dashboard
	SET @AssignWorkHours = 
	(SELECT SUM([OriginalEstTime])
	FROM [dbo].[ProjectWorkitems] PWI
	WHERE PWI.EmployeeId = @EmployeeId
    AND [ProjectStatusId] <> 5);

	SET @WorkHours = (SELECT SUM([TotalWorkDone])
    FROM [dbo].[ProjectWorkitems] PWI
    WHERE PWI.EmployeeId = @EmployeeId
    AND [ProjectStatusId] <> 5);
	
	SET @TotalWorkItems = (SELECT COUNT(*)
    FROM [dbo].[ProjectWorkitems] PWI
    WHERE PWI.EmployeeId = @EmployeeId
    AND [ProjectStatusId] <> 5);

	SELECT  @IsAttendanceAdded AS IsAttendanceAdded,
			@MonthlyTimeLog AS MonthlyTimeLog,
			@MonthlyWorkLog AS MonthlyWorkLog,
			@MonthlyPendingWorkLogEntryCount AS MonthlyPendingWorkLogEntryCount,
			@MonthlyTotalLeaves AS MonthlyTotalLeaves,
			@MonthlyHalfLeaves AS MonthlyHalfLeaves,
			@MonthlyFullLeaves AS MonthlyFullLeaves,
			@YearlyTotalLeaves AS YearlyTotalLeaves,
			@MonthlyLeaveDates AS MonthlyLeaveDates,
			@AssignWorkHours AS AssignWorkHours,
			@WorkHours AS WorkHours,
			@TotalWorkItems AS TotalWorkItems;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetEmployeeDetails]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetEmployeeDetails]
@employeeId BIGINT
AS
BEGIN
SET NOCOUNT ON;
SELECT 
PD.DateOfBirth, 
PD.Gender, 
PD.MaritalStatus,
PD.BloodGroup,
PD.AnyDiseases,
PD.ContactNumber,
PD.AlternateNumber,
PD.AccountNumber,
PD.PanCardNumber,
PD.PresentAddress,
PD.PermanentAddress,
PD.ProvidentFundNumber,
PD.NSRNumber,
PD.CompanyMail,
PD.PersonalMail,
PD.Messengers,
PD.PassportNumber,
PD.DateOfIssue,
PD.PlaceOfIssue,
PD.NameInPassport,
PD.ValidUpto
FROM PersonalDetails PD
WHERE PD.EmployeeId = @employeeId;
-- EXEC [SP_GetEmployeeDetails] @employeeId = 1;
END

GO
/****** Object:  StoredProcedure [dbo].[SP_GetEmployeeTravells]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetEmployeeTravells]
@employeeId BIGINT
AS
BEGIN
SET NOCOUNT ON;
SELECT 
C.VisaInfoId AS VisaId,
C.CountryName,
C.VisaType,
C.VisaValidFor
FROM [dbo].[CountryVisaInformation] C
WHERE C.EmployeeId = @employeeId;
-- EXEC [SP_GetEmployeeDetails] @employeeId = 1;
END

GO
/****** Object:  StoredProcedure [dbo].[SP_GetHolidayList]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetHolidayList]
AS
BEGIN
SET NOCOUNT ON;
SELECT 
H.[Id] AS [Key],
H.[Date] AS [Value]
FROM Holidays H
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetLeaveRequestDetails]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetLeaveRequestDetails] 
    @EmployeeId BIGINT,
    @LeaveStartDate DATETIME = NULL,
    @LeaveEndDate DATETIME = NULL,
    @LeaveRequestStatus VARCHAR(128) = NULL,
    @HasLeaveRequests BIT OUTPUT,
    @TotalRecords INT OUTPUT,
    @PageNumber INT = NULL,
    @PageSize INT = NULL,
    @SortColumn VARCHAR(100) = NULL,
    @SortOrder BIT = NULL

AS
BEGIN
    SET NOCOUNT ON;
    IF @PageNumber IS NULL
        SET @PageNumber = 1;
    IF @PageSize IS NULL 
        SET @PageSize = 10;
    IF @SortColumn IS NULL
        SET @SortColumn = 'LeaveStartDate';
    IF @SortOrder IS NULL
        SET @SortOrder = 0;

   
    DECLARE @StartIndex INT
    SET @StartIndex = (@PageNumber - 1) * @PageSize

 
    DECLARE @SqlStatement NVARCHAR(MAX)
    DECLARE @SortDirection VARCHAR(4)
    SET @SortDirection = CASE @SortOrder WHEN 1 THEN 'ASC' ELSE 'DESC' END

    SET @SqlStatement = N'
   SELECT RowNumber AS RowNo, LeaveRequestId, LeaveStartDate, LeaveEndDate,
       ABS(DATEDIFF(DAY, LeaveStartDate, LeaveEndDate) + 1 
       - (2 * (DATEDIFF(WEEK, LeaveStartDate, LeaveEndDate) + 
           CASE WHEN DATEPART(WEEKDAY, LeaveEndDate) = 1 THEN 1 ELSE 0 END)
           + CASE WHEN DATEPART(WEEKDAY, LeaveStartDate) = 7 THEN 1 ELSE 0 END))AS Duration,
       (CASE DATENAME(WEEKDAY, LeaveEndDate) 
           WHEN ''Friday'' THEN DATEADD(day, 3, LeaveEndDate) 
           ELSE DATEADD(day, 1, LeaveEndDate) 
       END) AS ReturnDate,
       AvailibiltyOnPhone, AvailibiltyInCity, LeaveRequestStatus, ApprovedDate
FROM (
        SELECT LeaveRequestId,  LeaveStartDate, LeaveEndDate, AvailibiltyOnPhone, AvailibiltyInCity, LeaveRequestStatus, ApprovedDate,
               ROW_NUMBER() OVER (ORDER BY 
                   CASE @SortColumn
                       WHEN ''LeaveStartDate'' THEN LeaveStartDate
                       WHEN ''LeaveEndDate'' THEN LeaveEndDate
                       WHEN ''Duration'' THEN DATEDIFF(day, LeaveStartDate, LeaveEndDate)
                       WHEN ''ReturnDate'' THEN (CASE DATENAME(WEEKDAY, LeaveEndDate) WHEN ''Friday'' THEN DATEADD(day, 3, LeaveEndDate) ELSE DATEADD(day, 1, LeaveEndDate) END)
                       WHEN ''AvailibiltyOnPhone'' THEN AvailibiltyOnPhone
                       WHEN ''AvailibiltyInCity'' THEN AvailibiltyInCity
                       WHEN ''LeaveRequestStatus'' THEN LeaveRequestStatus
                       WHEN ''ApprovedDate'' THEN ApprovedDate
                   END ' + @SortDirection + '
               ) AS RowNumber
        FROM LeaveRequest
        WHERE EmployeeId = @EmployeeId AND
        (
            (@LeaveStartDate IS NULL AND @LeaveEndDate IS NULL) OR
            (@LeaveStartDate IS NOT NULL AND @LeaveEndDate IS NULL AND LeaveStartDate >= @LeaveStartDate) OR
            (@LeaveStartDate IS NULL AND @LeaveEndDate IS NOT NULL AND LeaveEndDate <= @LeaveEndDate) OR
            (@LeaveStartDate IS NOT NULL AND @LeaveEndDate IS NOT NULL AND LeaveStartDate >= @LeaveStartDate AND LeaveEndDate <= @LeaveEndDate)
        ) AND
        (@LeaveRequestStatus IS NULL OR LeaveRequestStatus = @LeaveRequestStatus)
    ) AS SubQuery
    WHERE RowNumber BETWEEN @StartIndex + 1 AND @StartIndex + @PageSize'

    
    EXEC sp_executesql @SqlStatement,
                       N'@EmployeeId BIGINT, @LeaveStartDate DATETIME, @LeaveEndDate DATETIME, @LeaveRequestStatus VARCHAR(128), @StartIndex INT, @PageSize INT, @SortColumn VARCHAR(100)',
                       @EmployeeId = @EmployeeId,
                       @LeaveStartDate = @LeaveStartDate,
                       @LeaveEndDate = @LeaveEndDate,
                       @LeaveRequestStatus = @LeaveRequestStatus,
                       @StartIndex = @StartIndex,
                       @PageSize = @PageSize,
                       @SortColumn = @SortColumn

   
    SELECT @TotalRecords = COUNT(*)
    FROM LeaveRequest
    WHERE EmployeeId = @EmployeeId AND
        (
            (@LeaveStartDate IS NULL AND @LeaveEndDate IS NULL) OR
            (@LeaveStartDate IS NOT NULL AND @LeaveEndDate IS NULL AND LeaveStartDate >= @LeaveStartDate) OR
            (@LeaveStartDate IS NULL AND @LeaveEndDate IS NOT NULL AND LeaveEndDate <= @LeaveEndDate) OR
            (@LeaveStartDate IS NOT NULL AND @LeaveEndDate IS NOT NULL AND LeaveStartDate >= @LeaveStartDate AND LeaveEndDate <= @LeaveEndDate)
        ) AND
        (@LeaveRequestStatus IS NULL OR LeaveRequestStatus = @LeaveRequestStatus)


    IF @TotalRecords > 0
        SET @HasLeaveRequests = 1
    ELSE
        SET @HasLeaveRequests = 0
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetLeaveRequestDetailsFromId]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetLeaveRequestDetailsFromId]
	@LeaveRequestId BIGINT,
	@LeaveRequestIdExists BIT OUTPUT
AS
BEGIN
	DECLARE  @EmployeeId BIGINT
			,@EmployeeName NVARCHAR(max)
			,@ReportingPersonName NVARCHAR(max)
			,@ReportingPersonId BIGINT
			,@ReasonForLeave NVARCHAR(255) 
			,@LeaveStartDate DATE 
			,@LeaveEndDate DATE 
			,@RequestedDate DATE
			,@StartDateAttendanceOption INT 
			,@EndDateAttendanceOption INT 
			,@IsAdhocLeave BIT 
			,@AdhocLeaveStatus VARCHAR(128)
			,@PhoneNumber BIGINT 
			,@AlternatePhoneNumber BIGINT 
			,@AvailibiltyOnPhone BIT 
			,@AvailibiltyInCity BIT 

	IF EXISTS (SELECT 1 FROM LeaveRequest WHERE LeaveRequestId = @LeaveRequestId)
        SET @LeaveRequestIdExists = 1
    ELSE
        SET @LeaveRequestIdExists = 0

	IF @LeaveRequestIdExists = 1
	BEGIN
		SELECT
		   @ReasonForLeave = LR.ReasonForLeave , 
		   @LeaveStartDate = LR.LeaveStartDate,
		   @LeaveEndDate = LR.LeaveEndDate,
		   @RequestedDate = LR.CreatedAt,
		   @StartDateAttendanceOption = LR.StartDateAttendanceOption,
		   @EndDateAttendanceOption = LR.EndDateAttendanceOption,
		   @IsAdhocLeave = LR.IsAdhocLeave,
		   @AdhocLeaveStatus = LR.AdhocLeaveStatus,
		   @PhoneNumber = LR.PhoneNumber,
		   @AlternatePhoneNumber = LR.AlternatePhoneNumber,
		   @AvailibiltyOnPhone = LR.AvailibiltyOnPhone,
		   @AvailibiltyInCity = LR.AvailibiltyInCity
		FROM LeaveRequest LR
		WHERE LeaveRequestId = @LeaveRequestId
			
		SELECT
			   @ReasonForLeave AS ReasonForLeave,
               @LeaveStartDate AS LeaveStartDate,
               @LeaveEndDate AS LeaveEndDate,
			   @RequestedDate AS RequestedDate,
               @StartDateAttendanceOption AS StartDateAttendanceOption,
			   @EndDateAttendanceOption AS EndDateAttendanceOption,
               @IsAdhocLeave AS IsAdhocLeave,
               @AdhocLeaveStatus AS AdhocLeaveStatus,
               @PhoneNumber AS PhoneNumber,
			   @AlternatePhoneNumber AS AlternatePhoneNumber,
               @AvailibiltyOnPhone AS AvailibiltyOnPhone,
               @AvailibiltyInCity AS AvailibiltyInCity
	END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetLeaveRequestEmployeeInfo]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetLeaveRequestEmployeeInfo] 
    @EmployeeId BIGINT,
    @EmployeeExists BIT OUTPUT,
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
DECLARE @EmployeId BIGINT
    DECLARE @ReportingPersonId BIGINT
    DECLARE @EmployeeName VARCHAR(50)
    DECLARE @ReportingPersonName VARCHAR(100)
    DECLARE @PhoneNumber VARCHAR(20)
    DECLARE @AlternatePhoneNumber VARCHAR(20)
    DECLARE @CurrentDate DATE = GETDATE()
    DECLARE @LeaveStartDate DATE = ISNULL(@StartDate, @CurrentDate)
    DECLARE @LeaveEndDate DATE = ISNULL(@EndDate, @CurrentDate)
    DECLARE @RequestedDate DATE = @CurrentDate
    DECLARE @Duration INT = 0
	    DECLARE @WorkingDays INT = 0

	    DECLARE @LoopDate DATE = @LeaveStartDate

    DECLARE @ReturnDate DATE = @CurrentDate


    IF EXISTS (SELECT 1 FROM Employee WHERE EmployeeId = @EmployeeId)
        SET @EmployeeExists = 1
    ELSE
        SET @EmployeeExists = 0

    
    IF @EmployeeExists = 1
    BEGIN
      

	  SELECT @EmployeId = E.EmployeeId
	  FROM Employee E
	  WHERE EmployeeId = @EmployeeId

        SELECT @EmployeeName = CONCAT(E.FirstName, ' ', E.LastName)
        FROM Employee E
        WHERE EmployeeId = @EmployeeId

        
        SELECT @ReportingPersonId = ReportingPersonId
        FROM EmployeeDetails
        WHERE EmployeeId = @EmployeeId

        
        SELECT @ReportingPersonName = CONCAT(E.FirstName, ' ', E.LastName)
        FROM Employee E
        WHERE E.EmployeeId = @ReportingPersonId

       
        SELECT @PhoneNumber = ContactNumber, @AlternatePhoneNumber = AlternateNumber
        FROM PersonalDetails
        WHERE EmployeeId = @EmployeeId

		 WHILE @LoopDate <= @LeaveEndDate
        BEGIN
            IF DATEPART(dw, @LoopDate) NOT IN (1, 7) 
                SET @WorkingDays = @WorkingDays + 1
        
            SET @LoopDate = DATEADD(DAY, 1, @LoopDate)
        END

      
       

       
        SET @Duration = @WorkingDays

        IF DATEPART(dw, @LeaveEndDate) = 6 
        BEGIN
            --SET @Duration = DATEDIFF(DAY, @LeaveStartDate, @LeaveEndDate) + 1
            SET @ReturnDate = DATEADD(DAY, 3, @LeaveEndDate) 
        END
        ELSE IF DATEPART(dw, @LeaveEndDate)  IN (2, 3, 4, 5) 
        BEGIN
            --SET @Duration = DATEDIFF(DAY, @LeaveStartDate, @LeaveEndDate) + 1
            SET @ReturnDate = DATEADD(DAY, 1, @LeaveEndDate) 
        END
		

      
        SELECT
		@EmployeId AS EmployeeId,
		@EmployeeName AS EmployeeName,
		@ReportingPersonId AS ReportingPersonId,
               @ReportingPersonName AS ReportingPersonName,
               @PhoneNumber AS PhoneNumber,
               @AlternatePhoneNumber AS AlternatePhoneNumber,
               @LeaveStartDate AS LeaveStartDate,
               @LeaveEndDate AS LeaveEndDate,
               @RequestedDate AS RequestedDate,
               @Duration AS Duration,
               @ReturnDate AS ReturnDate
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetMyTimeLogs]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetMyTimeLogs] 
    @EmployeeId BIGINT,
    @Month INT = NULL,
    @Year INT = NULL
AS
BEGIN
	SET NOCOUNT ON;
    IF (@Month IS NULL)
    BEGIN
        SET @Month =
        (
            SELECT DATEPART(MONTH, GETDATE())
        );
    END;
    IF (@Year IS NULL)
    BEGIN
        SET @Year =
        (
            SELECT DATEPART(YEAR, GETDATE())
        );
    END;

    SELECT DISTINCT
	T.EmployeeNo,
	T.[Name],
	T.[Shift],
	T.Experience,
	T.Hours,
	S.PresentDays,
	S.LeaveDays,
	S.HalfLeave,
	T.LateDays,
	T.AvgTimeLog,
	W.AvgWorkLog,
	ROUND(ABS(T.AvgTimeLog - W.AvgWorkLog),2) AS Difference,
	T.OutHours
    FROM
    (
        SELECT ED.EmployeeDeatilId AS EmployeeNo,
               CONCAT(E.FirstName, ' ', E.LastName) AS Name,
               ES.ShiftCode AS [Shift],
               ED.Experience AS Experience,
               SUM(ETL.LastOutTime - ETL.FirstInTime) AS Hours,
               ROUND((AVG(ETL.LastOutTime - ETL.FirstInTime) - 1),2) AS AvgTimeLog,
               (AVG(ETL.TotalOutHours)) AS OutHours,
			   COUNT(CASE ETL.LateComer WHEN 1 THEN 1 END) AS LateDays
        FROM dbo.EmployeeShift ES
            INNER JOIN dbo.EmployeeDetails ED
                ON ED.EmployeeId = ES.EmployeeId
            INNER JOIN dbo.Employee E
                ON ES.EmployeeId = E.EmployeeId
            INNER JOIN dbo.EmployeeTimeLog ETL
                ON ES.EmployeeId = ETL.EmployeeId
        WHERE E.EmployeeId = @EmployeeId
              AND DATEPART(MONTH, ETL.LogDate) = @Month
              AND DATEPART(YEAR, ETL.LogDate) = @Year
        GROUP BY ED.EmployeeDeatilId,
                 CONCAT(E.FirstName, ' ', E.LastName),
                 ES.ShiftCode,
                 ED.Experience
    ) T ,
    (
        SELECT COUNT(CASE AI.AttendanceOption WHEN 1 THEN 1 END) AS PresentDays,
               COUNT(CASE AI.AttendanceOption WHEN 2 THEN 1 END) AS HalfLeave,
               COUNT(CASE AI.AttendanceOption WHEN 3 THEN 1 END) AS LeaveDays
        FROM dbo.AttendanceInformation AI
        WHERE AI.EmployeeId = @EmployeeId
		AND DATEPART(MONTH, AI.AttendanceDate) = @Month
              AND DATEPART(YEAR, AI.AttendanceDate) = @Year
    ) S ,
    (
        SELECT CONVERT(DECIMAL(5, 2), AVG(WL.WorkTime)) AS AvgWorkLog
        FROM dbo.WorkLog WL
            INNER JOIN dbo.ProjectWorkitems PWI
                ON PWI.ProjectWorkId = WL.ProjectWorkId
        WHERE PWI.EmployeeID = @EmployeeId
		AND DATEPART(MONTH, WL.WorkDoneOn) = @Month
              AND DATEPART(YEAR, WL.WorkDoneOn) = @Year
       
    ) W;

    SELECT
		   FORMAT(PT.LogDate, 'dd-MM-yyyy [dddd]') AS Date,
           ST.LateComer AS LateComer,
           ST.FirstInTime AS FirstInTime,
           ST.LastOutTime AS LastOutTime,
		   ST.TotalOutHours AS TotalOutHours,
           PT.WorkLog
    FROM
    (
        SELECT DISTINCT etl.LogDate,
               ISNULL(SUM(wl.WorkTime), 0) AS WorkLog
        FROM dbo.EmployeeTimeLog etl
            LEFT JOIN dbo.ProjectWorkitems PWI
                ON etl.EmployeeId = PWI.EmployeeId
            LEFT JOIN dbo.WorkLog wl
                ON PWI.ProjectWorkId = wl.ProjectWorkId
                   AND wl.WorkDoneOn = etl.LogDate
        WHERE etl.EmployeeId = @EmployeeId
              AND DATEPART(MONTH, etl.LogDate) = @Month
              AND DATEPART(YEAR, etl.LogDate) = @Year
        GROUP BY etl.LogDate
    ) PT,
    (
        SELECT DISTINCT etl.TotalOutHours,
               etl.FirstInTime,
               etl.LastOutTime,
               etl.LateComer,
               etl.LogDate,
               etl.EmployeeId
        FROM dbo.[EmployeeTimeLog] etl
    ) ST
    WHERE ST.EmployeeId = @EmployeeId
          AND PT.LogDate = ST.LogDate
	ORDER BY PT.LogDate, ST.FirstInTime;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetMyTimesheet]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetMyTimesheet] 
    @EmployeeId BIGINT,
    @Month INT = NULL,
    @Year INT = NULL
AS
BEGIN
SET NOCOUNT ON;
    IF (@Month IS NULL)
    BEGIN
        SET @Month = DATEPART(MONTH, GETDATE());
    END;
    IF (@Year IS NULL)
    BEGIN
        SET @Year = DATEPART(YEAR, GETDATE());
    END;

    -- Create a temporary table to store the total work log for each month
    CREATE TABLE #MonthlyWorkLog
    (
        EmployeeId BIGINT,
        Year INT,
        Month INT,
        ProjectWorkId INT,
        TotalWorkLog FLOAT
    );

    -- Insert zero work log data for each month
    DECLARE @TempMonth INT = 1;
    WHILE @TempMonth <= 12
    BEGIN
        INSERT INTO #MonthlyWorkLog
        (
            EmployeeId,
            Year,
            Month,
            ProjectWorkId,
            TotalWorkLog
        )
        SELECT @EmployeeId,
               @Year,
               @TempMonth,
               PWI.ProjectWorkId,
               0
        FROM dbo.ProjectWorkitems PWI
        WHERE PWI.EmployeeId = @EmployeeId;

        SET @TempMonth = @TempMonth + 1;
    END;

    -- Generate the list of dates for the specified month and year
    DECLARE @StartDate DATE,
            @EndDate DATE;
    SET @StartDate = DATEFROMPARTS(@Year, @Month, 1);
    SET @EndDate = DATEADD(DAY, -1, DATEADD(MONTH, 1, @StartDate));

    -- Build the dynamic SQL statement for pivoting the table
    DECLARE @Columns NVARCHAR(MAX),
            @Sql NVARCHAR(MAX);
    SET @Columns = N'';
    SET @Sql = N'';

    WHILE @StartDate <= @EndDate
    BEGIN
        SET @Columns = @Columns + N', ' + QUOTENAME(CONVERT(NVARCHAR(10), @StartDate, 121));
        SET @StartDate = DATEADD(DAY, 1, @StartDate);
    END;

    SET @Columns = STUFF(@Columns, 1, 2, ''); -- Remove the leading comma and space

    SET @Sql
        = N'
        UPDATE #MonthlyWorkLog
        SET TotalWorkLog = 
        (
            SELECT SUM(CAST((WL.WorkTime) AS FLOAT))
            FROM dbo.WorkLog WL
            WHERE WL.ProjectWorkId = #MonthlyWorkLog.ProjectWorkId
			AND MONTH(WL.WorkDoneOn) = @Month AND YEAR(WL.WorkDoneOn) = @Year -- Filter by @Month and @Year
            AND WL.WorkDoneOn >= DATEFROMPARTS(#MonthlyWorkLog.Year, #MonthlyWorkLog.Month, 1)
            AND WL.WorkDoneOn <= DATEADD(DAY, -1, DATEADD(MONTH, 1, DATEFROMPARTS(#MonthlyWorkLog.Year, #MonthlyWorkLog.Month, 1)))
        )
        FROM #MonthlyWorkLog;

        SELECT 
		ProjectName,
            ProjectTitle,
            P,
            TotalWorkLog,
			ProjectStatusId,
            ' + @Columns
          + N',
            DailyTimeLogHours
        FROM
        (
			
            SELECT 
			  CONCAT(PD.ProjectCode, '' - '', PD.ProjectName) AS ProjectName,
			    PWI.ProjectWorkId AS ProjectWorkId,
                CONCAT(PWI.ProjectWorkId, '': '', PWI.Title) AS ProjectTitle,
                PWI.OriginalEstTime AS P,
                MWL.TotalWorkLog,
				PWI.[ProjectStatusId],
                CONVERT(NVARCHAR(10), WL.WorkDoneOn, 121) AS WorkDoneOn,
                WL.WorkTime,
                ((ETL.LastOutTime - ETL.FirstInTime) - 1) AS DailyTimeLogHours
            FROM #MonthlyWorkLog MWL
            INNER JOIN dbo.ProjectWorkitems PWI
            ON MWL.ProjectWorkId = PWI.ProjectWorkId
            LEFT JOIN dbo.ProjectDescription PD
            ON PD.ProjectId = PWI.ProjectId
        LEFT JOIN dbo.WorkLog WL
            ON WL.ProjectWorkId = MWL.ProjectWorkId
               AND WL.WorkDoneOn >= DATEFROMPARTS(MWL.Year, MWL.Month, 1)
               AND WL.WorkDoneOn <= DATEADD(DAY, -1, DATEADD(MONTH, 1, DATEFROMPARTS(MWL.Year, MWL.Month, 1)))
			   
			   
			   
        LEFT JOIN dbo.EmployeeTimeLog ETL
            ON PWI.EmployeeId = ETL.EmployeeId
               AND CAST(PWI.StartDate AS DATE) = CAST(ETL.LogDate AS DATE) 
			   AND MONTH(ETL.LogDate) = MWL.Month AND YEAR(ETL.LogDate) = MWL.Year

			  
    WHERE PWI.EmployeeId = @EmployeeId
    GROUP BY PD.ProjectCode,
             PD.ProjectName,
             PWI.ProjectWorkId,
             PWI.Title,
             PWI.OriginalEstTime,
             ETL.FirstInTime,
             ETL.LastOutTime,
			 WL.WorkDoneOn,
             WL.WorkTime,
             MWL.TotalWorkLog,
			 PWI.[ProjectStatusId]
        ) AS src
        PIVOT
        (
            SUM(WorkTime)
            FOR WorkDoneOn IN (' + @Columns
          + N')
        ) AS piv
        WHERE TotalWorkLog IS NOT NULL -- Filter out NULL total work logs
        ORDER BY ProjectWorkId ASC;
    ';

    -- Execute the dynamic SQL statement
    EXEC sp_executesql @Sql,
                       N'@EmployeeId BIGINT, @Month INT, @Year INT',
                       @EmployeeId,				
                       @Month,
                       @Year;
	PRINT(@Sql);
    -- Drop the temporary table
    DROP TABLE #MonthlyWorkLog;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetMyTraningAsTrainee]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetMyTraningAsTrainee]
	@Category VARCHAR(64) = NULL,
	@SubCategory VARCHAR(64) = NULL,
    @Type VARCHAR(64) = NULL,
	@Status VARCHAR(64) = NULL,
	@FromDate DATE = NULL,
	@ToDate DATE = NULL,
    @PageNumber INT = 1, -- Page number
    @PageSize INT = 10, -- Number of records per page
    @Expression NVARCHAR(256) = 'TraningId',
    @IsSortByAsc BIT = 1,
    @TotalRowCount INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @Offset INT, @SQL NVARCHAR(MAX);

    DECLARE @Params NVARCHAR(MAX) = N'
	@Category VARCHAR(64),
	@SubCategory VARCHAR(64),
    @Type VARCHAR(64),
	@Status VARCHAR(64),
	@FromDate DATE,
	@ToDate DATE,
    @PageNumber INT,
    @PageSize INT, 
    @Expression NVARCHAR(256),
    @IsSortByAsc BIT,
    @TotalRowCount INT OUTPUT';


    IF @PageNumber <= 0
        SET @PageNumber = 1;
    SET @Offset = (@PageNumber - 1) * @PageSize;

	SET @SQL = N'';
    SET @SQL += N'
    WITH A AS (
            SELECT DISTINCT TT.[TraningId]
			,TT.[Title]
			,TT.[Date]
			,TT.[Time]
			,TT.[Duration]
			,TT.[faculties]
			,TT.[category]
			,TT.[subCategory]
			,TT.[Type]
			,TT.[Status]
			,(SELECT COUNT(TTF.EmployeeId) FROM [dbo].[TraineeFeedback] TTF WHERE TTF.TraningId = TF.TraningId) AS [Participants]
			FROM [WorkSpaceDb].[dbo].[TraineeTraning] TT
	LEFT JOIN [dbo].[TraineeFeedback] TF ON TF.TraningId = TT.TraningId
	WHERE 1 = 1';
	
	IF @Category <> ''
	BEGIN 
		SET @SQL = @SQL + N' AND (TT.[category] = @Category) '
	END

	IF @SubCategory <> ''
	BEGIN 
		SET @SQL = @SQL + N' AND (TT.[subCategory] = @SubCategory) '
	END

	IF @Type <> ''
	BEGIN 
		SET @SQL = @SQL + N' AND (TT.[Type] = @Type) '
	END

	IF @Status <> ''
	BEGIN 
		SET @SQL = @SQL + N' AND (TT.[Status] = @Status) '
	END

	IF @FromDate IS NOT NULL 
    BEGIN
        SET @SQL = @SQL + N' AND (@FromDate < CAST(TT.[Date] AS DATE)) ' 
    END
	
	IF @ToDate IS NOT NULL 
    BEGIN
        SET @SQL = @SQL + N' AND (@ToDate > CAST(TT.[Date] AS DATE)) ' 
    END

	SET @SQL = @SQL + N') ,  B AS (
    SELECT  
        ROW_NUMBER() OVER (ORDER BY ' +  ISNULL(@Expression, 'TraningId') + N' ' + CASE WHEN @IsSortByAsc = 1 THEN 'ASC' ELSE 'DESC' END + N') AS RowNum,
        A.*
		FROM A)
		SELECT 
		B.RowNum,
		B.TraningId,
		B.Title,
        B.Date,
        B.Time,
        B.Duration,
		B.faculties,
		B.category,
		B.subCategory,
		B.Type,
		B.Status,
		B.Participants
		FROM B'

    PRINT(@SQL);

	DECLARE @Result TABLE									
    (					
        RowNum INT,												
		[TraningId] BIGINT, 
        [Title] VARCHAR(256),
        [Date] DATE,
        [Time] FLOAT,
		[Duration] FLOAT,
		[faculties] VARCHAR(256),
		[category] VARCHAR(64),
		[subCategory] VARCHAR(64),
		[Type] VARCHAR(64),
		[Status] VARCHAR(64),
		[Participants] INT
    )
	INSERT INTO @Result 
    EXEC sys.sp_executesql @SQL, @Params,
		@Category,
		@SubCategory,
		@Type,
		@Status,
		@FromDate,
		@ToDate,
		@PageNumber,
		@PageSize,
		@Expression,
		@IsSortByAsc,
        @TotalRowCount = @TotalRowCount OUTPUT;
	
	SET @TotalRowCount = (SELECT COUNT(*) FROM @Result);

	SELECT * FROM @Result
	WHERE RowNum >  @Offset  AND RowNum <= @Offset + @PageSize;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetNewsAndDetails]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetNewsAndDetails]
AS 
BEGIN
    SET NOCOUNT ON;
	SELECT [NewsId]
      ,[NewsTitle]
      ,[NewsDescription]
      ,[NewsDate]
      ,[DocumentPath]
      ,[UpdateAt]
	FROM [WorkSpaceDb].[dbo].[NewsAndDetails]
	--EXEC [SP_GetNewsAndDetails] 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProjectActivityStream]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetProjectActivityStream] 
	@EmployeeId BIGINT,
	@NumberOfClicks INT = 0
AS
BEGIN
DECLARE @Skip INT = 10;
SET @Skip = @Skip + (@NumberOfClicks * 10);
IF(@NumberOfClicks = 0)
BEGIN
	SELECT TOP(20)
		   H.[WorkItemHistoryId]
	      ,H.[ProjectWorkId]
		  ,PWI.Title
	      ,H.[Field]
	      ,CONCAT(E.[FirstName], ' ', E.[LastName]) AS EmployeeName
	      ,H.[OldValue]
	      ,H.[NewValue]
		  ,FORMAT(H.[UpdateAt], 'dd-MMM-yyyy') AS TitleDate
	      ,H.[UpdateAt]
	  FROM [WorkSpaceDb].[dbo].[WorkItemHistory] H
	  LEFT JOIN [dbo].[ProjectWorkitems] PWI ON PWI.ProjectWorkId = H.ProjectWorkId
	  LEFT JOIN [WorkSpaceDb].[dbo].[Employee] E ON E.EmployeeId = H.EmployeeId
	  WHERE H.EmployeeId = @EmployeeId
	  AND MONTH(getdate()) = MONTH(H.[UpdateAt])
	  AND YEAR(getdate()) = YEAR(H.[UpdateAt])
	  ORDER BY H.[UpdateAt] DESC 
	END
	IF(@NumberOfClicks > 0)
	BEGIN
	SELECT  
	       H.[WorkItemHistoryId]
	      ,H.[ProjectWorkId]
		  ,PWI.Title
	      ,H.[Field]
	      ,CONCAT(E.[FirstName], ' ', E.[LastName]) AS EmployeeName
	      ,H.[OldValue]
	      ,H.[NewValue]
	      ,H.[UpdateAt]
		  ,FORMAT(H.[UpdateAt], 'dd-MMM-yyyy') AS TitleDate
	  FROM [WorkSpaceDb].[dbo].[WorkItemHistory] H
	  LEFT JOIN [dbo].[ProjectWorkitems] PWI ON PWI.ProjectWorkId = H.ProjectWorkId
	  LEFT JOIN [WorkSpaceDb].[dbo].[Employee] E ON E.EmployeeId = H.EmployeeId
	  WHERE H.EmployeeId = @EmployeeId
	  AND MONTH(getdate()) = MONTH(H.[UpdateAt])
	  AND YEAR(getdate()) = YEAR(H.[UpdateAt])
	  ORDER BY H.[UpdateAt] DESC 
	  OFFSET (@Skip) ROWS FETCH NEXT (10) ROWS ONLY;
	  END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProjects]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_GetProjects] 
    @EmployeeId BIGINT,
    @ProjectStatus INT = NULL,
    @ProjectName NVARCHAR(128) = NULL,
    @ProjectType INT = NULL,
    @ProjectTechId INT = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10,
    @Expression NVARCHAR(MAX) = NULL,
    @IsSortByAsc BIT = 1,
    @TotalProjectCount INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT, @SQL NVARCHAR(MAX);
    DECLARE @Params NVARCHAR(MAX) = N'
	@EmployeeId INT, 
	@ProjectStatus INT, 
	@ProjectName NVARCHAR(128), 
	@ProjectType INT, 
	@ProjectTechId INT, 
	@PageNumber INT, 
	@PageSize INT, 
	@Expression NVARCHAR(MAX), 
	@IsSortByAsc BIT, 
	@TotalProjectCount INT OUTPUT';

    IF @PageNumber <= 0
        SET @PageNumber = 1;
    SET @Offset = (@PageNumber - 1) * @PageSize;

    SET @SQL = N'
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

    SELECT @TotalProjectCount = COUNT(*)
    FROM [WorkSpaceDb].[dbo].[ProjectDescription]
    WHERE 1 = 1';

    IF @ProjectStatus IS NOT NULL
        SET @SQL += N' AND [ProjectStatus] = @ProjectStatus';

    IF @ProjectName IS NOT NULL
        SET @SQL += N' AND [ProjectName] LIKE ''%'' + @ProjectName + ''%'' ';

    IF @ProjectType IS NOT NULL
        SET @SQL += N' AND [ProjectType] = @ProjectType';

    IF @ProjectTechId IS NOT NULL
        SET @SQL += N' AND [ProjectTechId] = @ProjectTechId';

    SET @SQL += N';
    SELECT *
    FROM (
        SELECT
            ROW_NUMBER() OVER (ORDER BY ' + ISNULL(@Expression, 'ProjectName') + N' ' + CASE WHEN @IsSortByAsc = 1 THEN 'ASC' ELSE 'DESC' END + N') AS RowNum,
            PD.[ProjectId],
            [ProjectCode],
            [ProjectName],
            [ProjectType],
            [ProjectStatus],
            [ProjectTechId],
            [DueDate],
            [EndDate],
            (SELECT COUNT(*) FROM UserCurrentProjectInformation U WHERE U.ProjectId = PD.ProjectId) AS [UserCount],
            [TotalHours],
            [AssignedHours],
            [WorkHours],
            CAST((([WorkHours] * 100.0) / [AssignedHours]) AS DECIMAL(10, 2)) AS [HrsUtilized]
        FROM [WorkSpaceDb].[dbo].[ProjectDescription] PD
        WHERE 1 = 1';

    IF @ProjectStatus IS NOT NULL
        SET @SQL += N' AND [ProjectStatus] = @ProjectStatus';

    IF @ProjectName IS NOT NULL
        SET @SQL += N' AND [ProjectName] LIKE ''%'' + @ProjectName + ''%'' ';

    IF @ProjectType IS NOT NULL
        SET @SQL += N' AND [ProjectType] = @ProjectType';

    IF @ProjectTechId IS NOT NULL
        SET @SQL += N' AND [ProjectTechId] = @ProjectTechId';

    SET @SQL += N'
    ) AS PagedResults
    WHERE RowNum BETWEEN @Offset + 1 AND @Offset + @PageSize;';

    PRINT(@SQL);
    EXEC sys.sp_executesql @SQL, @Params,
        @EmployeeId,
        @ProjectStatus,
        @ProjectName,
        @ProjectType,
        @ProjectTechId,
        @PageNumber,
        @PageSize,
        @Expression,
        @IsSortByAsc,
        @TotalProjectCount = @TotalProjectCount OUTPUT;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProjectWorkItem]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetProjectWorkItem] 
@ProjectWorkId BIGINT
AS
BEGIN
SET NOCOUNT ON;
SELECT 
PWI.Title,
PWI.WorkGroupId,
PWI.WorkFlow,
PWI.ProjectWorkitemsPriority AS [Priority],
PWI.ProjectStatusId,
PWI.StartDate,
PWI.EndDate,
PWI.OriginalEstTime,
PWI.RemainingEstTime,
PWI.[TotalWorkDone],
PWI.AssignedEmployeeId,
PWI.ReportedEmployeeId,
PWI.SubProjectId,
PWI.ReleasedToProduction,
PWI.RSI,
PWI.[Description],
PWI.[CreatedAt],
PWI.[UpdateAt]
FROM ProjectWorkitems PWI
WHERE PWI.ProjectWorkId = @ProjectWorkId;
 --EXEC [SP_GetProjectWorkItem] @ProjectWorkId = 15;
END

GO
/****** Object:  StoredProcedure [dbo].[SP_GetServiceDetails]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GetServiceDetails] 
    @EmployeeId BIGINT,
    @TicketNumber INT = NULL,
    @RequestStatus INT = NULL,
    @PageNumber INT = NULL,
    @PageSize INT = NULL,
    @SortColumn NVARCHAR(100) = NULL,
    @SortOrder BIT = NULL ,
	@HasServiceRequests BIT OUTPUT,
    @TotalRecords INT OUTPUT
AS
BEGIN
IF @PageNumber IS NULL
        SET @PageNumber = 1;
    IF @PageSize IS NULL 
        SET @PageSize = 1;
		 IF @SortColumn IS NULL
        SET @SortColumn = 'Ticket';
		IF @SortOrder IS NULL
        SET @SortOrder = 1;
		If @RequestStatus IS NULL
		SET @RequestStatus = 2;


		
    DECLARE @DynamicSQL NVARCHAR(MAX);
	

    SET @DynamicSQL = N'
    SELECT SR.ServiceRequestId AS Ticket, CONVERT(DATE, SR.CreatedAt) AS RequestDate,
        (E.FirstName + '' '' + E.LastName + ''('' + ED.PcOrLaptopNumber + '')'') AS Name,
        C.CategoryName AS Category,SG.ServiceGroupIdtName AS ServiceGroup, SC.SubCategoryName AS SubCategory,
        SR.ServiceRequetPriority AS Priority, SR.ServiceDetails,SRH.RequestStatus AS Status,
        CASE SRH.RequestStatus
            WHEN 2 THEN CONVERT(DATE, SRH.CreatedAt)
            ELSE NULL
        END AS PendingAt,
		CASE SRH.RequestStatus
		WHEN 2 THEN NULL
		ELSE SRH.Comments
		END AS Comments,
		CASE SRH.RequestStatus
		WHEN 2 THEN NULL
		ELSE SRH.AttachmentsDocumentPath
		END AS Attachment,
        CASE SRH.RequestStatus
            WHEN 2 THEN NULL
            ELSE (ES.FirstName + '' '' + ES.LastName)
        END AS ClosedBy,
        CASE SRH.RequestStatus
            WHEN 2 THEN NULL
            ELSE CONVERT(DATE, SRH.CreatedAt)
        END AS ClosedAt
    FROM ServiceRequest SR
    LEFT JOIN Employee E ON E.EmployeeId = SR.EmployeeId
    LEFT JOIN EmployeeDetails ED ON ED.EmployeeId = SR.EmployeeId
    LEFT JOIN Category C ON SR.CategoryId = C.CategoryId
	LEFT JOIN ServiceGroup SG ON C.ServiceGroupId = SG.ServiceGroupId
    LEFT JOIN SubCategory SC ON SC.SubCategoryId = SR.SubCategoryId
    JOIN ServiceRequestHistory SRH ON SR.ServiceRequestId = SRH.ServiceRequestId
    LEFT JOIN Employee ES ON SC.ServicePersonId = ES.EmployeeId AND SR.ServiceRequestId = SRH.ServiceRequestId
    WHERE SR.EmployeeId = @EmployeeId';

    IF @TicketNumber IS NOT NULL
    BEGIN
        SET @DynamicSQL = @DynamicSQL + N' AND SR.ServiceRequestId = @TicketNumber';
    END;

    IF @RequestStatus IS NOT NULL
    BEGIN
        SET @DynamicSQL = @DynamicSQL + N' AND SRH.RequestStatus = @RequestStatus';
    END;

 SET @DynamicSQL = @DynamicSQL + 
        N' ORDER BY ' + QUOTENAME(@SortColumn) + ' ' + 
        CASE WHEN @SortOrder = 1 THEN 'ASC' ELSE 'DESC' END +
        N' OFFSET ' + CAST(((@PageNumber - 1) * @PageSize) AS NVARCHAR(10)) + ' ROWS' +
        N' FETCH NEXT ' + CAST(@PageSize AS NVARCHAR(10)) + ' ROWS ONLY';

    EXEC sp_executesql @DynamicSQL,
                       N'@EmployeeId BIGINT, @TicketNumber INT, @RequestStatus INT, @PageNumber INT,@PageSize INT,@SortColumn NVARCHAR(100)',
                       @EmployeeId = @EmployeeId,
                       @TicketNumber = @TicketNumber,
                       @RequestStatus = @RequestStatus,
					   @PageNumber = @PageNumber,
					   @PageSize = @PageSize,
					   @SortColumn = @SortColumn


	SELECT @TotalRecords = COUNT(*)
    FROM ServiceRequest SR
    LEFT JOIN Employee E ON E.EmployeeId = SR.EmployeeId
    LEFT JOIN EmployeeDetails ED ON ED.EmployeeId = SR.EmployeeId
    LEFT JOIN Category C ON SR.CategoryId = C.CategoryId
	LEFT JOIN ServiceGroup SG ON C.ServiceGroupId = SG.ServiceGroupId
    LEFT JOIN SubCategory SC ON SC.SubCategoryId = SR.SubCategoryId
    JOIN ServiceRequestHistory SRH ON SR.ServiceRequestId = SRH.ServiceRequestId
    LEFT JOIN Employee ES ON SC.ServicePersonId = ES.EmployeeId AND SR.ServiceRequestId = SRH.ServiceRequestId
    WHERE SR.EmployeeId = @EmployeeId 
	AND( @RequestStatus IS NULL OR RequestStatus = @RequestStatus) 
	AND(@TicketNumber IS NULL OR SR.ServiceRequestId = @TicketNumber)
	
	IF @TotalRecords > 0
        SET @HasServiceRequests = 1
    ELSE
        SET @HasServiceRequests = 0
					  
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetServiceRequestUpdateDetails]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetServiceRequestUpdateDetails] 
@ServiceRequestId INT
AS
BEGIN
SELECT SR.ServiceRequestId AS Ticket, CONVERT(DATETIME, SR.CreatedAt) AS RequestDate,
        (CONCAT(E.FirstName, ' ', E.LastName)) AS [Name],
		SR.ServiceGroupId AS ServiceGroupId,SR.CategoryId AS CategoryId,SR.SubCategoryId AS SubCategoryId,
        C.CategoryName AS Category,SG.ServiceGroupIdtName AS ServiceGroup, SC.SubCategoryName AS SubCategory,
        SR.ServiceRequetPriority AS Priority, SR.ServiceDetails,SRH.RequestStatus AS Status,
		SR.Comments AS ExtraComments,
        CASE SRH.RequestStatus WHEN 2 THEN CONVERT(DATE, SRH.CreatedAt) ELSE NULL END AS PendingAt,
		CASE SRH.RequestStatus WHEN 2 THEN NULL ELSE SRH.Comments END AS Comments,
		CASE SRH.RequestStatus WHEN 2 THEN NULL ELSE SRH.AttachmentsDocumentPath END AS Attachment,
        CASE SRH.RequestStatus WHEN 2 THEN NULL ELSE (ES.FirstName +  + ES.LastName) END AS ClosedBy,
        CASE SRH.RequestStatus WHEN 2 THEN NULL ELSE CONVERT(DATE, SRH.CreatedAt) END AS ClosedAt
    FROM ServiceRequest SR
    LEFT JOIN Employee E ON E.EmployeeId = SR.EmployeeId
    LEFT JOIN EmployeeDetails ED ON ED.EmployeeId = SR.EmployeeId
    LEFT JOIN Category C ON SR.CategoryId = C.CategoryId
	LEFT JOIN ServiceGroup SG ON C.ServiceGroupId = SG.ServiceGroupId
    LEFT JOIN SubCategory SC ON SC.SubCategoryId = SR.SubCategoryId
    JOIN ServiceRequestHistory SRH ON SR.ServiceRequestId = SRH.ServiceRequestId
    LEFT JOIN Employee ES ON SC.ServicePersonId = ES.EmployeeId AND SR.ServiceRequestId = SRH.ServiceRequestId
    WHERE SR.ServiceRequestId = @ServiceRequestId
	END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetStatusCountsInProject]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetStatusCountsInProject] 
  @projectId bigint,
  @WorkGroupId bigint
AS
BEGIN
  SET NOCOUNT ON;
  IF(@WorkGroupId IS NULL)
  SELECT ProjectStatusId, COUNT(ProjectStatusId) AS StatusCount
  FROM [WorkSpaceDb].[dbo].[ProjectWorkitems]
  WHERE ProjectId = @projectId
  GROUP BY ProjectStatusId;
  ELSE
  SELECT ProjectStatusId, COUNT(ProjectStatusId) AS StatusCount
  FROM [WorkSpaceDb].[dbo].[ProjectWorkitems]
  WHERE ProjectId = @projectId AND WorkGroupId = @WorkGroupId
  GROUP BY ProjectStatusId;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetSubCategoriesOfService]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetSubCategoriesOfService] 
    @InputCategoryId BIGINT
AS
BEGIN
    SELECT SubCategoryId AS [Key], SubCategoryName AS [Value]
    FROM SubCategory
    WHERE CategoryId = @InputCategoryId;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTimeLogYearly]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetTimeLogYearly] 
    @EmployeeId BIGINT,
    @Year INT = NULL
AS
BEGIN
    IF @Year IS NULL
        SET @Year = YEAR(GETDATE());

    DECLARE @MonthData TABLE (
        Month INT,
        PDays INT,
        HalfLeaves INT,
		FullLeaves INT
    );

    INSERT INTO @MonthData (Month, PDays, HalfLeaves, FullLeaves)
    SELECT
        DATEPART(MONTH, ai.AttendanceDate) AS Month,
        SUM(CASE WHEN ai.AttendanceOption = 1 THEN 1 ELSE 0 END) AS PDays,
        SUM(CASE WHEN ai.AttendanceOption = 2 THEN 1 ELSE 0 END) AS HalfLeaves,
		SUM(CASE WHEN ai.AttendanceOption = 3 THEN 1 ELSE 0 END) AS FullLeaves
    FROM dbo.AttendanceInformation ai
    WHERE ai.EmployeeId = @EmployeeId AND DATEPART(YEAR, ai.AttendanceDate) = @Year
    GROUP BY DATEPART(MONTH, ai.AttendanceDate);

   
    DECLARE @MonthHours TABLE (
    Month INT,
    Hours Float,
    AvgWorkLog Float
);

INSERT INTO @MonthHours (Month, Hours, AvgWorkLog)
SELECT
    DATEPART(MONTH, wl.WorkDoneOn) AS Month,
    SUM(wl.WorkTime) AS Hours,
    AVG(wl.WorkTime) AS AvgWorkLog
FROM dbo.ProjectWorkitems pw
INNER JOIN dbo.WorkLog wl ON pw.ProjectWorkId = wl.ProjectWorkId
WHERE pw.EmployeeId = @EmployeeId AND DATEPART(YEAR, wl.WorkDoneOn) = @Year
GROUP BY DATEPART(MONTH, wl.WorkDoneOn);

 DECLARE @TimeLog TABLE (
    Month INT,
	LateDays INT,
	AvgTimeLog Float,
	OutHours INT
);

INSERT INTO @TimeLog (Month , LateDays, AvgTimeLog, OutHours)
SELECT
    DATEPART(MONTH, etl.LogDate) AS Month,
	SUM(CASE WHEN etl.LateComer = 1 THEN 1 ELSE 0 END) AS LateDays,
    ABS(AVG((etl.LastOutTime - etl.FirstInTime)-1)) AS AvgTimeLog,
	SUM(etl.TotalOutHours) AS OutHours
FROM dbo.AttendanceInformation ai
INNER JOIN dbo.EmployeeTimeLog etl ON ai.EmployeeId = etl.EmployeeId
WHERE ai.EmployeeId = @EmployeeId AND DATEPART(YEAR, etl.LogDate) = @Year
GROUP BY DATEPART(MONTH, etl.LogDate);



SELECT
    ED.EmployeeDeatilId AS EmployeeNo,
    E.FirstName + ' ' + E.LastName AS Name,
    FORMAT(DATEFROMPARTS(@Year, md.Month, 1), 'MMM-yyyy') AS Month,
    ISNULL(mh.Hours, 0) AS Hours,
    ISNULL(md.PDays, 0) AS PDays,
	ISNULL(md.FullLeaves, 0) AS LDays,
    ISNULL(md.HalfLeaves, 0) AS HalfLeaves,
	ISNULL(tl.LateDays, 0) AS LateDays,
	ISNULL(tl.AvgTimeLog,0) AS AvgTimeLog,
    ISNULL(mh.AvgWorkLog, 0) AS AvgWorkLog,
	ABS(ISNULL(mh.AvgWorkLog, 0) - ISNULL(tl.AvgTimeLog,0)) AS Difference,
	ISNULL(tl.OutHours,0) AS OutHours
FROM @MonthData md
LEFT JOIN dbo.Employee E ON E.EmployeeId = @EmployeeId
LEFT JOIN dbo.EmployeeDetails ED ON ED.EmployeeId = @EmployeeId
LEFT JOIN @MonthHours mh ON md.Month = mh.Month
LEFT JOIN @TimeLog tl ON md.Month = tl.Month
GROUP BY ED.EmployeeDeatilId, E.FirstName, E.LastName, md.Month, md.PDays, md.HalfLeaves,md.FullLeaves, mh.Hours, mh.AvgWorkLog,tl.AvgTimeLog, tl.LateDays, tl.OutHours;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTimeSheetDailyTimeLogEmployeeAndDate]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetTimeSheetDailyTimeLogEmployeeAndDate] 
    @employeeid INT,
    @month INT = NULL,
    @year INT = NULL
AS
BEGIN
    IF @month IS NULL
        SET @month = MONTH(GETDATE());
    
    IF @year IS NULL
        SET @year = YEAR(GETDATE());
    
    SELECT
       w.WorkDoneOn, 
        SUM(w.WorkTime) AS WorkTime
    FROM
        worklog w
    INNER JOIN
        ProjectWorkitems pw ON w.projectworkid = pw.projectworkid
    WHERE
        pw.EmployeeID = @employeeid
        AND MONTH(w.WorkDoneOn) = @month
        AND YEAR(w.WorkDoneOn) = @year
		  GROUP BY
        w.WorkDoneOn;

		SELECT
        etl.LogDate,   
    ABS((etl.LastOutTime - etl.FirstInTime)-1) AS TimeLog
    FROM
        EmployeeTimeLog etl
    
    WHERE
        etl.EmployeeID = @employeeid
        AND MONTH(etl.LogDate) = @month
        AND YEAR(etl.LogDate) = @year
    GROUP BY etl.LastOutTime,etl.FirstInTime,etl.LogDate;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTranineeTraningFeedBack]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE       PROCEDURE [dbo].[SP_GetTranineeTraningFeedBack] 
	@EmployeeId BIGINT,
	@TraningId BIGINT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT DISTINCT [FeedbackId]
      ,(SELECT CONCAT(E.FirstName, ' ', E.LastName) FROM [dbo].[Employee] E WHERE E.EmployeeId = TF.[EmployeeId]) AS [Name]
	  ,(SELECT CONCAT(E.FirstName, ' ', E.LastName) FROM [dbo].[Employee] E WHERE E.EmployeeId = (SELECT TOP(1) ED.ReportingPersonId FROM [dbo].[EmployeeDetails] ED WHERE ED.[EmployeeId] = TF.[EmployeeId])) AS [ReportingTo]
	  ,TT.[Title]
	  ,TT.[Date]
	  ,TT.[Time]
	  ,TT.[Duration]
	  ,TT.[faculties]
	  ,TT.[category]
	  ,TT.[subCategory]
	  ,TT.[Type]
	  ,TT.[Location]
      ,[Attended]
      ,[IsFeedBackGiven]
      ,[FeedbackCourseCourseCoverage]
      ,[FeedbackCourseDelivery]
      ,[FeedbackCourseMaterial]
      ,[FeedbackCourseQuality]
      ,[FeedbackCourseAvailability]
      ,[FeedbackCourseManagements]
      ,[FeedbackFacultyKnowleage]
      ,[FeedbackFacultyPresentation]
      ,[FeedbackFacultyCoverage]
      ,[FeedbackFacultyExamples]
      ,[FeedbackFacultyLevel]
      ,[FeedbackSelfGain]
      ,[FeedbackSelfApplicability]
      ,[FeedbackOverallConduct]
      ,[SuggestionImprovements]
      ,[SuggestionCoverage]
  FROM [WorkSpaceDb].[dbo].[TraineeFeedback] TF
  LEFT JOIN [WorkSpaceDb].[dbo].[TraineeTraning] TT ON TT.TraningId = TF.TraningId
  WHERE TF.EmployeeId = @EmployeeId 
  AND TF.TraningId = @TraningId;
END

GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserForDashboard]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetUserForDashboard]
@employeeId BIGINT
AS 
BEGIN
    SET NOCOUNT ON;
	SELECT 
	ED.ProfileImage,
	E.FirstName,
	E.LastName
	FROM [dbo].[EmployeeDetails] AS ED
	LEFT JOIN [dbo].[Employee] AS E
	ON ED.EmployeeId = E.EmployeeId
	WHERE ED.EmployeeId = @employeeId;
	--EXEC [SP_GetUserForDashboard] @employeeId = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserProjects]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetUserProjects]
@employeeId BIGINT
AS 
BEGIN
    SET NOCOUNT ON;
	SELECT UP.ProjectId, PD.ProjectName FROM UserCurrentProjectInformation AS UP
	LEFT JOIN ProjectDescription AS PD ON UP.ProjectId = PD.ProjectId
	WHERE UP.EmployeeId = @employeeId;
	--EXEC [SP_GetUserProjects] @employeeId = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserSystemConfiguration]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetUserSystemConfiguration]
@employeeId BIGINT
AS 
BEGIN
    SET NOCOUNT ON;

	SELECT E.PcOrLaptopNumber, E.SittingPlace AS 'PcLocation', E.IsPrimaryPC
	FROM EmployeeDetails E
	WHERE E.EmployeeId = @employeeId;
	
	SELECT SY.SystemType, SY.SystemItemModel, SY.SystemQuantity, SY.HasTakenHome, SY.SerailId FROM SystemConfigurationDetails AS SY
	WHERE SY.EmployeeId = @employeeId;

	--EXEC [SP_GetUserSystemConfiguration] @employeeId = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWeekdaysOfMonthWithAttendance]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetWeekdaysOfMonthWithAttendance] 
	@EmployeeId INT,
	@Month INT = NULL,
    @Year INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

	IF @Month IS NULL
        SET @Month = MONTH(GETDATE());
    IF @Year IS NULL
        SET @Year = YEAR(GETDATE());

	DECLARE @StartDate DATE;
    DECLARE @EndDate DATE;

    SET @StartDate = DATEFROMPARTS(@Year, @Month, 1);
    SET @EndDate = DATEADD(MONTH, 1, @StartDate);

    WITH CTE AS (
        SELECT @StartDate AS CurrentDate
        UNION ALL
        SELECT DATEADD(DAY, 1, CurrentDate)
        FROM CTE
        WHERE DATEADD(DAY, 1, CurrentDate) < @EndDate
    )
    SELECT CurrentDate, DATENAME(WEEKDAY, CurrentDate) AS CurrentWeekDay, AI.AttendanceOption, AI.IsApproved
    FROM CTE
	LEFT JOIN [WorkSpaceDb].[dbo].[AttendanceInformation] AI ON CTE.CurrentDate = CONVERT(DATE, AI.AttendanceDate) AND AI.EmployeeId = @EmployeeId
    WHERE MONTH(CTE.CurrentDate) = @Month
      AND YEAR(CTE.CurrentDate) = @Year
	--EXEC GetWeekdaysOfMonthWithAttendance @Month = 8, @Year = 2023, @EmployeeId = 1;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWidgetActiveWorkGroup]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetWidgetActiveWorkGroup] 
	@EmployeeId BIGINT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT DISTINCT 
		PD.ProjectId,
		PD.ProjectName,
		WG.WorkGroupId,
		WG.WorkGroupName
	FROM [WorkSpaceDb].[dbo].[WorkGroup] WG 
	LEFT JOIN [UserCurrentProjectInformation] UCP  ON UCP.ProjectId = WG.ProjectId 
	LEFT JOIN [ProjectDescription] PD ON PD.ProjectId = WG.ProjectId
	WHERE UCP.EmployeeId = @EmployeeId;

END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWidgetMyRecentProjects]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetWidgetMyRecentProjects] 
	@EmployeeId BIGINT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT DISTINCT 
	   UCP.[ProjectId],
	   PD.ProjectName,
	   PD.[CreatedAt] AS ReleaseDate,
	   (SELECT COUNT(*) FROM [WorkSpaceDb].[dbo].[UserCurrentProjectInformation] UCPI WHERE UCPI.ProjectId = UCP.ProjectId) AS TeamSize
	FROM [WorkSpaceDb].[dbo].[UserCurrentProjectInformation] UCP 
	LEFT JOIN [ProjectDescription] PD ON PD.ProjectId = UCP.ProjectId 
	WHERE UCP.EmployeeId = @EmployeeId
	ORDER BY PD.[CreatedAt];

	SELECT DISTINCT 
		PWI.ProjectWorkId,
		PWI.ProjectId,
		PD.ProjectName,
		PWI.StartDate,
		PWI.EndDate,
		PWI.ProjectWorkitemsPriority AS [Priority],
		PWI.[CreatedAt]
	FROM [WorkSpaceDb].[dbo].[ProjectWorkitems] PWI
	LEFT JOIN [ProjectDescription] PD ON PD.ProjectId = PWI.ProjectId 
	LEFT JOIN [UserCurrentProjectInformation] UCP  ON UCP.ProjectId = PWI.ProjectId 
	WHERE UCP.EmployeeId = @EmployeeId
	AND PWI.ProjectStatusId <> 5
	ORDER BY PWI.[CreatedAt];
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWidgetPendingTraningFeedBack]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetWidgetPendingTraningFeedBack] 
	@EmployeeId BIGINT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT DISTINCT 
		TT.[Title],
		TT.[Date]
	FROM [TraineeFeedback] TF
	LEFT JOIN [TraineeTraning] TT ON TT.[TraningId] = TF.[TraningId]
	WHERE TF.[EmployeeId] = @EmployeeId
	AND TF.[IsFeedBackGiven] = 0
	AND TT.[Date] < GETDATE()
	AND TT.[Status] = 'Completed';

END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWidgetTeamWorkItems]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE       PROCEDURE [dbo].[SP_GetWidgetTeamWorkItems] 
	@EmployeeId BIGINT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT DISTINCT 
	   CONCAT(E.FirstName, ' ', E.LastName) AS [Name],
	   PD.ProjectName,
	   (SELECT COUNT(*) FROM [WorkSpaceDb].[dbo].[ProjectWorkitems] PWI WHERE PWI.EmployeeId = CP.EmployeeId AND PWI.ProjectId = CP.ProjectId AND PWI.ProjectStatusId <> 5) AS WorkItems
	FROM [WorkSpaceDb].[dbo].[UserCurrentProjectInformation] UCP 
	LEFT JOIN [UserCurrentProjectInformation] CP ON CP.ProjectId = UCP.ProjectId 
	LEFT JOIN [ProjectDescription] PD ON PD.ProjectId = CP.ProjectId 
	LEFT JOIN [Employee] E ON E.EmployeeId = CP.EmployeeId
	WHERE UCP.EmployeeId = @EmployeeId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWidgetTraningCalender]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetWidgetTraningCalender] 
	@EmployeeId BIGINT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT DISTINCT 
		TT.[Date]
	FROM [TraineeFeedback] TF
	LEFT JOIN [TraineeTraning] TT ON TT.[TraningId] = TF.[TraningId]
	WHERE TF.[EmployeeId] = @EmployeeId
	AND TT.[Date] > GETDATE()
	AND TT.[Status] = 'Ongoing';

END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkBackLog]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetWorkBackLog] 
@WorkGroupId BIGINT,
@SearchText VARCHAR(MAX) = NULL,
@ProjectType VARCHAR(128) = NULL,
@ProjectStatus VARCHAR(128) = NULL,
@AssignedPersonId BIGINT = NULL,
@Expression NVARCHAR(MAX) = 'ProjectWorkId',
@IsSortByAsc BIT = 1
AS
BEGIN 
	SET NOCOUNT ON;
	DECLARE @SQL NVARCHAR(MAX);
	DECLARE @Params NVARCHAR(MAX) = N'
	@WorkGroupId BIGINT,
	@SearchText VARCHAR(MAX),
	@ProjectType VARCHAR(128),
	@ProjectStatus VARCHAR(128),
	@AssignedPersonId BIGINT,
	@Expression NVARCHAR(MAX),
	@IsSortByAsc BIT';

	SET @SQL = N'';
    SET @SQL += N'
    WITH A AS (
    SELECT 
	PWI.ProjectWorkId,
	PWI.Title,
	PWI.StartDate,
	PWI.EndDate,
	PWI.OriginalEstTime,
	PWI.RemainingEstTime,
	CONCAT(E.FirstName, '' '', E.LastName) AS AssignedTo,
	PWI.ProjectWorkitemsPriority AS WorkPriority,
	PWI.ProjectStatusId,
	CASE 
			WHEN PWI.ProjectStatusId = 1 then ''New''
			WHEN PWI.ProjectStatusId = 2 then ''In-Progress''
			WHEN PWI.ProjectStatusId = 3 then ''Dev. Completed''
			WHEN PWI.ProjectStatusId = 4 then ''Ready for Testing''
			WHEN PWI.ProjectStatusId = 5 then ''Closed''
			END AS ProjectStatus,
	PWI.[WorkFlow],
	PWI.CreatedAt,
	PWI.TotalWorkDone
	FROM [ProjectWorkitems] PWI
	LEFT JOIN Employee E ON E.EmployeeId = PWI.EmployeeId
	WHERE PWI.WorkGroupId = @WorkGroupId'
	
	IF @SearchText IS NOT NULL
    BEGIN
        SET @SQL = @SQL + N' AND (PWI.Title LIKE ''%'' + @SearchText + ''%''
            OR E.FirstName LIKE ''%'' + @SearchText + ''%''
			OR E.LastName LIKE ''%'' + @SearchText + ''%''
          ) ' 
    END

	IF @AssignedPersonId IS NOT NULL
    BEGIN
        SET @SQL = @SQL + N' AND (PWI.[EmployeeId] = @AssignedPersonId OR PWI.[EmployeeId] IS NULL
          ) ' 
    END

	IF @ProjectType <> ''
    BEGIN
        SET @SQL = @SQL + N' AND PWI.[WorkFlow] IN (SELECT VALUE FROM STRING_SPLIT(@ProjectType, '','')) ' 
    END

	IF @ProjectStatus <> ''
    BEGIN
        SET @SQL = @SQL + N' AND PWI.ProjectStatusId IN (SELECT VALUE FROM STRING_SPLIT(@ProjectStatus, '','')) ' 
    END

	SET @SQL = @SQL + N') ,  B AS (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY ' +  ISNULL(@Expression, 'ProjectWorkId') + N' ' + CASE WHEN @IsSortByAsc = 1 THEN 'ASC' ELSE 'DESC' END + N') AS RowNum,
        A.*
		FROM A)
		SELECT 
		B.RowNum,
		B.ProjectWorkId,
		B.Title,
		B.StartDate,
		B.EndDate,
		B.OriginalEstTime,
		B.RemainingEstTime,
		B.AssignedTo,
		B.WorkPriority,
		B.ProjectStatusId,
		B.WorkFlow,
		B.CreatedAt,
		B.TotalWorkDone
		FROM B'

    PRINT(@SQL);

	EXEC sys.sp_executesql @SQL, @Params,
		@WorkGroupId ,
		@SearchText,
		@ProjectType,
		@ProjectStatus,
		@AssignedPersonId ,
		@Expression,
		@IsSortByAsc;

END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkBackLogFromProjectId]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetWorkBackLogFromProjectId] 
@ProjectId BIGINT = NULL,
@ProjectStatus VARCHAR(128) = '1,2,3,4',
@AssignedPersonId BIGINT = NULL,
@Expression NVARCHAR(MAX) = 'ProjectWorkId',
@IsSortByAsc BIT = 1
AS
BEGIN 
	SET NOCOUNT ON;
	DECLARE @SQL NVARCHAR(MAX);
	DECLARE @Params NVARCHAR(MAX) = N'
	@ProjectId BIGINT,
	@ProjectStatus VARCHAR(128),
	@AssignedPersonId BIGINT,
	@Expression NVARCHAR(MAX),
	@IsSortByAsc BIT';

	SET @SQL = N'';
    SET @SQL += N'
    WITH A AS (
    SELECT 
	PWI.ProjectWorkId,
	PWI.Title,
	PWI.StartDate,
	PWI.EndDate,
	PWI.OriginalEstTime,
	PWI.RemainingEstTime,
	CONCAT(E.FirstName, '' '', E.LastName) AS AssignedTo,
	PWI.ProjectWorkitemsPriority AS WorkPriority,
	PWI.ProjectStatusId,
	CASE 
			WHEN PWI.ProjectStatusId = 1 then ''New''
			WHEN PWI.ProjectStatusId = 2 then ''In-Progress''
			WHEN PWI.ProjectStatusId = 3 then ''Dev. Completed''
			WHEN PWI.ProjectStatusId = 4 then ''Ready for Testing''
			WHEN PWI.ProjectStatusId = 5 then ''Closed''
			END AS ProjectStatus,
	PWI.[WorkFlow],
	PWI.CreatedAt,
	PWI.TotalWorkDone
	FROM [ProjectWorkitems] PWI
	LEFT JOIN Employee E ON E.EmployeeId = PWI.EmployeeId
	WHERE 1 = 1'

	
	IF @ProjectId IS NOT NULL
    BEGIN
        SET @SQL = @SQL + N' AND (PWI.ProjectId = @ProjectId
          ) ' 
    END

	IF @AssignedPersonId IS NOT NULL
    BEGIN
        SET @SQL = @SQL + N' AND (PWI.[EmployeeId] = @AssignedPersonId OR PWI.[EmployeeId] IS NULL
          ) ' 
    END

	IF @ProjectStatus <> ''
    BEGIN
        SET @SQL = @SQL + N' AND PWI.ProjectStatusId IN (SELECT VALUE FROM STRING_SPLIT(@ProjectStatus, '','')) ' 
    END

	SET @SQL = @SQL + N') ,  B AS (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY ' +  ISNULL(@Expression, 'ProjectWorkId') + N' ' + CASE WHEN @IsSortByAsc = 1 THEN 'ASC' ELSE 'DESC' END + N') AS RowNum,
        A.*
		FROM A)
		SELECT 
		B.RowNum,
		B.ProjectWorkId,
		B.Title,
		B.StartDate,
		B.EndDate,
		B.OriginalEstTime,
		B.RemainingEstTime,
		B.AssignedTo,
		B.WorkPriority,
		B.ProjectStatusId,
		B.WorkFlow,
		B.CreatedAt,
		B.TotalWorkDone
		FROM B'

    PRINT(@SQL);

	EXEC sys.sp_executesql @SQL, @Params,
		@ProjectId ,
		@ProjectStatus,
		@AssignedPersonId ,
		@Expression,
		@IsSortByAsc;

END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkGroupDetails]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetWorkGroupDetails] 
  @projectId bigint
AS
BEGIN
  SET NOCOUNT ON;

  SELECT WorkGroupId, WorkGroupName AS Title, StartDate, EndDate
  FROM [WorkSpaceDb].[dbo].[WorkGroup]
  WHERE ProjectId = @projectId;

END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkGroupFromId]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetWorkGroupFromId] 
  @WorkGroupId bigint
AS
BEGIN
  SET NOCOUNT ON;

  SELECT WorkGroupId, WorkGroupName AS Title, StartDate, EndDate
  FROM [WorkSpaceDb].[dbo].[WorkGroup]
  WHERE WorkGroupId = @WorkGroupId;

END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkGroupLogs]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetWorkGroupLogs]
	@WorkGroupId BIGINT 
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
	WL.WorkLogId, 
	PWI.ProjectStatusId,
	PWI.Title,
	CONCAT(E.FirstName,' ',E.LastName) AS Employee, 
	WL.WorkDoneOn, 
	WL.WorkTime AS WorkedHours
	FROM WorkLog WL
	LEFT JOIN ProjectWorkitems PWI ON PWI.ProjectWorkId = WL.ProjectWorkId
	LEFT JOIN Employee E ON E.EmployeeId = PWI.EmployeeId
	WHERE PWI.[WorkGroupId] = @WorkGroupId
	AND PWI.EmployeeId IS NOT NULL;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkGroupLogWithPagination]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetWorkGroupLogWithPagination]
	@WorkGroupId BIGINT,
	@PageNumber INT = 1, -- Page number
    @PageSize INT = 10, -- Number of records per page
    @Expression NVARCHAR(MAX) = 'WorkLogId',
    @IsSortByAsc BIT = 1,
    @TotalProjectCount INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @Offset INT, @SQL NVARCHAR(MAX);

    DECLARE @Params NVARCHAR(MAX) = N'
	@WorkGroupId BIGINT,
	@PageNumber INT, 
	@PageSize INT, 
	@Expression NVARCHAR(MAX), 
	@IsSortByAsc BIT, 
	@Offset INT,
	@TotalProjectCount INT OUTPUT';

	IF @PageNumber <= 0
        SET @PageNumber = 1;
    SET @Offset = (@PageNumber - 1) * @PageSize;

	SET @SQL = N'';
    SET @SQL += N'
     WITH A AS (
            SELECT 
			PWI.ProjectWorkId,
			WL.WorkLogId, 
			PWI.ProjectStatusId,
			PWI.Title,
			CONCAT(E.FirstName,'' '',E.LastName) AS Employee, 
			WL.WorkDoneOn, 
			WL.WorkTime AS WorkedHours
			FROM WorkLog WL
			LEFT JOIN ProjectWorkitems PWI ON PWI.ProjectWorkId = WL.ProjectWorkId
			LEFT JOIN Employee E ON E.EmployeeId = PWI.EmployeeId
			WHERE PWI.[WorkGroupId] = @WorkGroupId
			AND PWI.EmployeeId IS NOT NULL';
	SET @SQL = @SQL + N') ,  B AS (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY ' +  ISNULL(@Expression, 'WorkLogId') + N' ' + CASE WHEN @IsSortByAsc = 1 THEN 'ASC' ELSE 'DESC' END + N') AS RowNum,
        A.*
		FROM A)
		SELECT 
		B.RowNum,
		B.ProjectWorkId,
		B.WorkLogId, 
		B.ProjectStatusId,
		B.Title,
		B.Employee, 
		B.WorkDoneOn, 
		B.WorkedHours
		FROM B'

    PRINT(@SQL);

	DECLARE @Result TABLE									
    (					
        RowNum INT,			
		ProjectWorkId BIGINT,									
		WorkLogId BIGINT,
        ProjectStatusId INT,
		Title VARCHAR(128),
		Employee VARCHAR(255),
		WorkDoneOn DATETIME,
		WorkedHours FLOAT
    )
	INSERT INTO @Result 
    EXEC sys.sp_executesql @SQL, @Params,
		@WorkGroupId,
        @PageNumber,
        @PageSize,
        @Expression,
        @IsSortByAsc,
		@Offset,
        @TotalProjectCount = @TotalProjectCount OUTPUT;
	
	SET @TotalProjectCount = (SELECT COUNT(*) FROM @Result);

	SELECT * FROM @Result
	WHERE RowNum >  @Offset  AND RowNum <= @Offset + @PageSize;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkItemAttachments]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetWorkItemAttachments] 
	@ProjectWorkId BIGINT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT WA.[WorkItemAttachmentsId], WA.[FileName], WA.FilePath, WA.[filetype], WA.[Description], WA.[CreatedAt] FROM [dbo].[WorkItemAttachments] WA
	WHERE WA.[ProjectWorkId] = @ProjectWorkId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkItemComments]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetWorkItemComments]
	@ProjectWorkId BIGINT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT WC.[WorkItemCommentId], WC.[COMMENTS] AS Comments ,CONCAT(E.FirstName,' ',E.LastName) AS Employee, WC.[CreatedAt] FROM [dbo].[WorkitemsComments] WC
	LEFT JOIN Employee E ON E.EmployeeId = WC.[EmployeeId]
	WHERE WC.[ProjectWorkId] = @ProjectWorkId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkItemHistory]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetWorkItemHistory] 
    @WorkItemId BIGINT,
    @PageNumber INT = 1, -- Page number
    @PageSize INT = 10, -- Number of records per page
    @Expression NVARCHAR(MAX) = 'Field', -- Default sorting column
    @IsSortByAsc BIT = 1, -- 1 for ASC, 0 for DESC
    @TotalProjectCount INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    IF @PageNumber <= 0
        SET @PageNumber = 1;

    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

    -- Get total count
    SELECT @TotalProjectCount = COUNT(*)
    FROM [dbo].[WorkItemHistory] WIH
    WHERE WIH.ProjectWorkId = @WorkItemId;

    -- Get paginated results
    DECLARE @SQL NVARCHAR(MAX);

    SET @SQL = N'
    WITH PaginatedWorkItemHistory AS (
        SELECT 
            WIH.Field,
            CONCAT(E.FirstName, '' '', E.LastName) AS ChangedBy,
            WIH.CreatedAt AS ChangedOn,
            WIH.OldValue,
            WIH.NewValue,
            ROW_NUMBER() OVER (ORDER BY ' + ISNULL(@Expression, 'Field') + 
            CASE WHEN @IsSortByAsc = 1 THEN ' ASC' ELSE ' DESC' END + N') AS RowNum
        FROM [dbo].[WorkItemHistory] WIH
        LEFT JOIN Employee E ON E.EmployeeId = WIH.EmployeeId
        WHERE WIH.ProjectWorkId = @WorkItemId
    )
    SELECT 
        RowNum,
        Field,
        ChangedBy,
        ChangedOn,
        OldValue,
        NewValue
    FROM PaginatedWorkItemHistory
    WHERE RowNum > @Offset AND RowNum <= @Offset + @PageSize;';

    EXEC sys.sp_executesql @SQL, N'@WorkItemId BIGINT, @IsSortByAsc BIT, @Offset INT, @PageSize INT', @WorkItemId, @IsSortByAsc, @Offset, @PageSize;

END;
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkItemState]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetWorkItemState]
	@ProjectWorkId BIGINT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT WS.[WorkItemStateId], WS.[ProjectStatusId], CONCAT(E.FirstName,' ',E.LastName) AS Employee, WS.[CreatedAt] FROM [dbo].[WorkItemState] WS
	LEFT JOIN Employee E ON E.EmployeeId = WS.[EmployeeId]
	WHERE WS.[ProjectWorkId] = @ProjectWorkId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetWorkLogs]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetWorkLogs]
	@ProjectWorkId BIGINT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT WL.WorkLogId, WL.WorkDoneOn, WL.WorkTime AS WorkedHours, CONCAT(E.FirstName,' ',E.LastName) AS Employee, WL.[Description] FROM WorkLog WL
	LEFT JOIN ProjectWorkitems PWI ON PWI.ProjectWorkId = @ProjectWorkId
	LEFT JOIN Employee E ON E.EmployeeId = PWI.EmployeeId
	WHERE WL.ProjectWorkId = @ProjectWorkId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_IsEmployeeExist]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_IsEmployeeExist]
    @userId BIGINT = NULL,
    @status BIT OUTPUT 
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM [dbo].[Employee] WHERE [EmployeeId] = @userId)
    BEGIN
        SET @status = 1;
    END
    ELSE
    BEGIN
        SET @status = 0;
    END
	--DECLARE @userstatus BIT;
	--EXEC SP_IsEmployeeExist @userId = 1, @status = @userstatus OUTPUT;
	--SELECT @userstatus as flag;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Login]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE    PROCEDURE [dbo].[SP_Login]
	@userName VARCHAR(255),
    @password NVARCHAR(255),
	@employeeId BIGINT OUT,
    @status BIT OUT,
	@message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;
    -- Check if the employee already exists
    IF EXISTS (SELECT 1 FROM [WorkSpaceDb].[dbo].[Employee] WHERE [UserName] = @userName AND [EmployeePassword] = @password)
    BEGIN
        SET @status = 1; 
		SET @message = 'Login Sucessfully!';
		SET @employeeId = (SELECT EmployeeId FROM [WorkSpaceDb].[dbo].[Employee] WHERE [UserName] = @userName AND [EmployeePassword] = @password);
        RETURN;
    END 
	ELSE 
	BEGIN
		SET @status = 0; 
		SET @message = 'Credentials are not valid, Please try again!';
        RETURN;
	END
	--DECLARE @showstatus BIT, @showmessage VARCHAR(255), @showemployeeId BIGINT;
	--EXEC [SP_Login] 
	--@userName = 'dipak.Patel', 
	--@password = 'dipakpatel',
	--@employeeId = @showemployeeId output,
	--@status = @showstatus output,
	--@message = @showmessage output 
	--SELECT @showstatus AS '@showmessage',
	--	@showmessage AS '@showmessage';
	--SELECT * FROM Employee;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ProductBacklog]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_ProductBacklog] 
	@ProjectId BIGINT,
	@SearchText VARCHAR(MAX) = NULL,
    @WorkGroupId BIGINT = NULL,
    @AssignedPersonId VARCHAR(128) = NULL,
	@ReportedPersonId BIGINT = NULL,
    @ProjectType VARCHAR(128) = NULL,
    @ProjectStatus VARCHAR(128) = NULL,
	@StartDate DATE = NULL,
	@EndDate DATE = NULL,
	@Priority VARCHAR(16) = NULL,
    @PageNumber INT = 1, -- Page number
    @PageSize INT = 10, -- Number of records per page
    @Expression NVARCHAR(MAX) = 'WorkGroup',
    @IsSortByAsc BIT = 1,
    @TotalProjectCount INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT, @SQL NVARCHAR(MAX);

    DECLARE @Params NVARCHAR(MAX) = N'
	@ProjectId BIGINT,
	@SearchText VARCHAR(MAX),
	@WorkGroupId BIGINT, 
	@AssignedPersonId VARCHAR(128), 
	@ReportedPersonId BIGINT, 
	@ProjectType VARCHAR(128), 
	@ProjectStatus VARCHAR(128),
	@StartDate DATE,
	@EndDate DATE,
	@Priority VARCHAR(16),
	@PageNumber INT, 
	@PageSize INT, 
	@Expression NVARCHAR(MAX), 
	@IsSortByAsc BIT, 
	@Offset INT,
	@TotalProjectCount INT OUTPUT';


    IF @PageNumber <= 0
        SET @PageNumber = 1;
    SET @Offset = (@PageNumber - 1) * @PageSize;

	SET @SQL = N'';
    SET @SQL += N'
     WITH A AS (
            SELECT DISTINCT
			PWI.ProjectWorkId,
			WG.WorkGroupName AS WorkGroup,
			PWI.Title,
			PWI.ProjectStatusId,
			CASE 
			WHEN PWI.ProjectStatusId = 1 then ''New''
			WHEN PWI.ProjectStatusId = 2 then ''In-Progress''
			WHEN PWI.ProjectStatusId = 3 then ''Dev. Completed''
			WHEN PWI.ProjectStatusId = 4 then ''Ready for Testing''
			WHEN PWI.ProjectStatusId = 5 then ''Closed''
			END AS ProjectStatus,
			PWI.ProjectWorkitemsPriority AS ProjectPriority,
			CONCAT(AP.FirstName,'' '' ,AP.LastName) AS AssignedTo,
			PWI.OriginalEstTime AS OriginalEst,
			PWI.RemainingEstTime AS RemainingEst,
			PWI.StartDate,
			PWI.EndDate,
			PWI.TotalWorkDone
			FROM [dbo].[ProjectWorkitems] PWI
			LEFT JOIN [dbo].[WorkGroup] WG ON WG.WorkGroupId = PWI.WorkGroupId
			LEFT JOIN [dbo].[UserCurrentProjectInformation] UP ON UP.ProjectId = PWI.ProjectId
			LEFT JOIN [dbo].[Employee] AP ON AP.EmployeeId = PWI.AssignedEmployeeId
			LEFT JOIN [dbo].[Employee] RP ON UP.EmployeeId = PWI.ReportedEmployeeId
			-- Show only existing assigned projects
			WHERE UP.ProjectId = PWI.ProjectId AND UP.ProjectId = @ProjectId AND PWI.IsDeleted <> 1';

    IF @SearchText IS NOT NULL
    BEGIN
        SET @SQL = @SQL + N' AND (PWI.Title LIKE ''%'' + @SearchText + ''%''
            OR AP.FirstName LIKE ''%'' + @SearchText + ''%''
			OR AP.LastName LIKE ''%'' + @SearchText + ''%''
          ) ' 
    END

	IF @WorkGroupId IS NOT NULL
	BEGIN 
		SET @SQL = @SQL + N' AND (WG.WorkGroupId = @WorkGroupId
          ) '
	END

	IF @AssignedPersonId <> ''
	BEGIN 
		SET @SQL = @SQL + N' AND (PWI.AssignedEmployeeId IN (SELECT VALUE FROM STRING_SPLIT(@AssignedPersonId, '',''))) '
	END
		
	IF @ReportedPersonId IS NOT NULL
	BEGIN 
		SET @SQL = @SQL + N' AND (PWI.ReportedEmployeeId = @ReportedPersonId
          ) '
	END

	IF @ProjectType <> ''
    BEGIN
        SET @SQL = @SQL + N' AND PWI.[WorkFlow] IN (SELECT VALUE FROM STRING_SPLIT(@ProjectType, '','')) ' 
    END

	IF @ProjectStatus <> ''
    BEGIN
        SET @SQL = @SQL + N' AND PWI.ProjectStatusId IN (SELECT VALUE FROM STRING_SPLIT(@ProjectStatus, '','')) ' 
    END
	
	IF @StartDate IS NOT NULL 
    BEGIN
        SET @SQL = @SQL + N' AND (@StartDate BETWEEN CAST(PWI.StartDate AS DATE) AND CAST(PWI.EndDate AS DATE)) ' 
    END
	
	IF @EndDate IS NOT NULL 
    BEGIN
        SET @SQL = @SQL + N' AND (@EndDate BETWEEN CAST(PWI.StartDate AS DATE) AND CAST(PWI.EndDate AS DATE)) ' 
    END
	
	IF @Priority IS NOT NULL 
    BEGIN
        SET @SQL = @SQL + N'AND (PWI.ProjectWorkitemsPriority = @Priority) ' 
    END

   SET @SQL = @SQL + N') ,  B AS (
    SELECT  
        ROW_NUMBER() OVER (ORDER BY ' +  ISNULL(@Expression, 'WorkGroup') + N' ' + CASE WHEN @IsSortByAsc = 1 THEN 'ASC' ELSE 'DESC' END + N') AS RowNum,
        A.*
		FROM A)
		SELECT 
		B.RowNum,
		B.ProjectWorkId,
		B.WorkGroup,
        B.Title,
        B.ProjectStatusId,
        B.ProjectPriority,
		B.AssignedTo,
		B.OriginalEst,
		B.RemainingEst,
		B.StartDate,
		B.EndDate,
		B.TotalWorkDone
		FROM B'

    PRINT(@SQL);

	DECLARE @Result TABLE									
    (					
        RowNum INT,												
		[ProjectWorkId] BIGINT,
        [WorkGroup] VARCHAR(128), 
        [Title] VARCHAR(128),
        [ProjectStatusId] INT,
        [ProjectPriority] VARCHAR(16),
		[AssignedTo] VARCHAR(255),
		[OriginalEst] FLOAT,
		[RemainingEst] FLOAT,
		[StartDate] DATETIME,
		[EndDate] DATETIME,
		[TotalWorkDone] FLOAT
    )
	INSERT INTO @Result 
    EXEC sys.sp_executesql @SQL, @Params,
		@ProjectId,
		@SearchText,
		@WorkGroupId,
		@AssignedPersonId,
		@ReportedPersonId,
		@ProjectType,
		@ProjectStatus,
		@StartDate,
		@EndDate,
		@Priority,
        @PageNumber,
        @PageSize,
        @Expression,
        @IsSortByAsc,
		@Offset,
        @TotalProjectCount = @TotalProjectCount OUTPUT;
	
	SET @TotalProjectCount = (SELECT COUNT(*) FROM @Result);

	SELECT * FROM @Result
	WHERE RowNum >  @Offset  AND RowNum <= @Offset + @PageSize;

END
GO
/****** Object:  StoredProcedure [dbo].[SP_ProjectTeamRosterDetail]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_ProjectTeamRosterDetail] 
	@ProjectId BIGINT
AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @TotalAssignedWork FLOAT = 0;
	SET @TotalAssignedWork = (SELECT SUM([OriginalEstTime]) FROM [WorkSpaceDb].[dbo].[ProjectWorkitems]);
	SELECT DISTINCT
	CONCAT(E.[FirstName], ' ', E.[LastName]) AS EmployeeName, 
	UP.[HoursAllocated]*(0.0334) AS Capacity,
	(SELECT SUM([OriginalEstTime]) FROM [WorkSpaceDb].[dbo].[ProjectWorkitems] WHERE [WorkSpaceDb].[dbo].[ProjectWorkitems].[AssignedEmployeeId] = PWI.[AssignedEmployeeId]) AS AssignedWork,	
	(SELECT SUM([RemainingEstTime]) FROM [WorkSpaceDb].[dbo].[ProjectWorkitems] WHERE [WorkSpaceDb].[dbo].[ProjectWorkitems].[AssignedEmployeeId] = PWI.[AssignedEmployeeId]) AS RemaningWork,
	CEILING((SELECT (((SUM([OriginalEstTime]) - SUM([RemainingEstTime]))/SUM([OriginalEstTime])) * 100) FROM [WorkSpaceDb].[dbo].[ProjectWorkitems] WHERE [WorkSpaceDb].[dbo].[ProjectWorkitems].[AssignedEmployeeId] = PWI.[AssignedEmployeeId])) AS PresentageComplete,
	(SELECT ((SUM([OriginalEstTime])/@TotalAssignedWork) * 100) FROM [WorkSpaceDb].[dbo].[ProjectWorkitems] WHERE [WorkSpaceDb].[dbo].[ProjectWorkitems].[AssignedEmployeeId] = PWI.[AssignedEmployeeId]) AS PresentageAllocation	
	FROM [WorkSpaceDb].[dbo].[ProjectWorkitems] PWI 
	LEFT JOIN [WorkSpaceDb].[dbo].[Employee] E ON E.[EmployeeId] = PWI.[AssignedEmployeeId]
	LEFT JOIN [WorkSpaceDb].[dbo].[UserCurrentProjectInformation] UP ON PWI.[AssignedEmployeeId] = UP.[EmployeeId]
	WHERE PWI.ProjectId = @ProjectId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ReadEmployeeInfo]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_ReadEmployeeInfo] 
@employeeId BIGINT
AS
BEGIN
SET NOCOUNT ON;
SELECT 
ED.EmployeeDeatilId,
ED.ProfileImage,
E.UserName,
E.FirstName,
E.LastName,
ED.Experience,
E.Email,
ED.JoiningDate,
R.FirstName AS SeniorsFirstName,
R.LastName AS SeniorsLastName,
R.Email AS SeniorsEmail,
ED.CardNo,
ED.Grade,
D.DepartmentName,
ED.Designation,
ED.SittingPlace,
ED.CreatedAt,
ED.NotificationTypeResolutionChanged,
ED.NotificationOnAssignedWorkItemChangeByTeamMember,
ED.NotificationCommnetOnWork,
ED.NotificationAssignedWork,
ED.NotificationDailyAlertEmail,
ED.NotificationOnCreatedWorkItemChangeByTeamMember
FROM [dbo].[EmployeeDetails] AS ED
LEFT JOIN [dbo].[Employee] AS E
ON ED.EmployeeId = E.EmployeeId
LEFT JOIN [dbo].[Employee] AS R
ON ED.ReportingPersonId = R.EmployeeId
LEFT JOIN [dbo].[Department] AS D
ON ED.DepartmentId = D.DepartmentId
WHERE ED.EmployeeId = @employeeId;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Register]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_Register]
	@userName VARCHAR(255),
    @firstName VARCHAR(126),
    @lastName VARCHAR(126),
    @email NVARCHAR(255),
    @password NVARCHAR(255),
    @status BIT OUT,
	@message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the employee already exists
    IF EXISTS (SELECT 1 FROM [WorkSpaceDb].[dbo].[Employee] WHERE [Email] = @email)
    BEGIN
        SET @status = 0; 
		SET @message = 'Employee email already exists';
        RETURN;
    END
	ELSE
	IF EXISTS (SELECT 1 FROM [WorkSpaceDb].[dbo].[Employee] WHERE [UserName] = @userName)
    BEGIN
        SET @status = 0; 
		SET @message = 'Employee username already exists';
        RETURN;
    END

    -- Add the employee
    INSERT INTO [WorkSpaceDb].[dbo].[Employee]
        ([UserName], [FirstName], [LastName], [Email], [EmployeePassword], [CreatedAt], [UpdateAt], [IsDeleted])
    VALUES
        (@userName, @firstName, @lastName, @email, @password, GETDATE(), GETDATE(), NULL);

	SET @status  =  CASE WHEN @@ROWCOUNT = 0 THEN 0 ELSE 1 END;
	SET @message =  CASE WHEN @@ROWCOUNT = 0 THEN 'Somthing went wrong unable to register, Please try again!' 
					ELSE 'Employee registered sucessfully' END;

	--DECLARE @showstatus BIT, @showmessage VARCHAR(255);
	--EXEC [SP_Register] 
	--@userName = 'dipak.Patel', 
	--@email = 'dipak.patel@internal.mail', 
	--@firstName = 'dipak', 
	--@lastName = 'patel',
	--@password = 'dipakpatel',
	--@status = @showstatus output,
	--@message = @showmessage output 
	--SELECT @showstatus AS '@showmessage',
	--	   @showmessage AS '@showmessage';
	--SELECT * FROM Employee;

END
GO
/****** Object:  StoredProcedure [dbo].[SP_ServiceGroupOfService]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Script for SelectTopNRows command from SSMS  ******/
CREATE   PROCEDURE [dbo].[SP_ServiceGroupOfService] 
AS
BEGIN

SET NOCOUNT ON;
SELECT 
	   [ServiceGroupId] AS [Key]
	  ,[ServiceGroupIdtName] As [Value]
FROM [WorkSpaceDb].[dbo].[ServiceGroup];

END
GO
/****** Object:  StoredProcedure [dbo].[SP_ShowWorkGroup]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_ShowWorkGroup]
  @projectId BIGINT
AS
BEGIN
  SELECT
    wg.WorkGroupId,
    wg.WorkGroupName,
    wg.StartDate,
    wg.EndDate,
    COUNT(pw.WorkFlow) AS StatusCount
  FROM
    [WorkSpaceDb].[dbo].[WorkGroup] wg
  LEFT JOIN
    [WorkSpaceDb].[dbo].[ProjectWorkitems] pw ON wg.WorkGroupId = pw.WorkGroupId
      AND pw.ProjectId = @projectId
  GROUP BY
    wg.WorkGroupId,
    wg.WorkGroupName,
    wg.StartDate,
    wg.EndDate
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateEmployeePersonalDetails]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_UpdateEmployeePersonalDetails]
    @employeeId BIGINT,
    @dateOfBirth DATE = NULL,
    @gender BIT = NULL,
    @maritalStatus BIT = NULL,
    @bloodGroup VARCHAR(16) = NULL,
    @anyDisease NVARCHAR(255) = NULL,
    @contactNumber BIGINT = NULL,
    @alternateNumber BIGINT = NULL,
    @accountNumber NVARCHAR(255) = NULL,
    @panCardNumber NVARCHAR(255) = NULL,
    @presentAddress NVARCHAR(255) = NULL,
    @permanentAddress NVARCHAR(255) = NULL,
    @providentFundNumber BIGINT = NULL,
    @nsrNumber BIGINT = NULL,
    @companyMail NVARCHAR(128) = NULL,
    @personalMail NVARCHAR(128) = NULL,
    @messengers NVARCHAR(255) = NULL,
    @passportNumber NVARCHAR(64) = NULL,
    @dateOfIssue DATE = NULL,
    @placeOfIssue VARCHAR(128) = NULL,
    @nameInPassport VARCHAR(128) = NULL,
    @validUpto DATE = NULL,
	@status BIT OUT,
    @message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [dbo].[PersonalDetails]
    SET 
        DateOfBirth = @dateOfBirth,
        Gender = @gender,
        MaritalStatus = @maritalStatus,
        BloodGroup = @bloodGroup,
        AnyDiseases = @anyDisease,
        ContactNumber = @contactNumber, 
        AlternateNumber = @alternateNumber,
        AccountNumber = @accountNumber, 
        PanCardNumber = @panCardNumber,
        PresentAddress = @presentAddress,
        PermanentAddress = @permanentAddress, 
        ProvidentFundNumber = @providentFundNumber, 
        NSRNumber = @nsrNumber, 
        CompanyMail = @companyMail,
        PersonalMail = @personalMail, 
        Messengers = @messengers, 
        PassportNumber = @passportNumber, 
        DateOfIssue = @dateOfIssue, 
        PlaceOfIssue = @placeOfIssue,
        NameInPassport = @nameInPassport,
        ValidUpto = @validUpto
    WHERE EmployeeId = @employeeId;

	IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to update personal info. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Changes applied successfully.';
    END

END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateEmployeeTravels]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_UpdateEmployeeTravels]
    @visaInfoId BIGINT,
    @countryName VARCHAR(255),
    @visaType VARCHAR(128),
    @visaValidFor DATE,
    @status BIT OUT,
    @message VARCHAR(255) OUT 
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [dbo].[CountryVisaInformation]
    SET 
		CountryName = @countryName,
        VisaType = @visaType,
        VisaValidFor = @visaValidFor
    WHERE VisaInfoId = @visaInfoId;

    IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to update a new entry. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Existing entry updated successfully.';
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateLeaveRequest]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_UpdateLeaveRequest]
    @LeaveRequestId BIGINT,
    @ReasonForLeave NVARCHAR(255) = NULL,
    @LeaveStartDate DATE = NULL,
    @LeaveEndDate DATE = NULL,
    @StartDateAttendanceOption INT = NULL,
    @EndDateAttendanceOption INT = NULL,
    @IsAdhocLeave BIT = NULL,
    @AdhocLeaveStatus VARCHAR(128) = NULL,
    @PhoneNumber BIGINT = NULL,
    @AlternatePhoneNumber BIGINT = NULL,
    @AvailibiltyOnPhone BIT = NULL,
    @AvailibiltyInCity BIT = NULL,
    @Success nvarchar(250) OUTPUT
	
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UpdateQuery NVARCHAR(MAX) = 'UPDATE LeaveRequest SET ';

    IF @ReasonForLeave IS NOT NULL
        SET @UpdateQuery += 'ReasonForLeave = @ReasonForLeave,';
	IF (@LeaveStartDate>@LeaveEndDate)
	begin
        set	@Success = 'StartDate cannot be greater than EndDate';
		return;
	end
    else IF (@LeaveStartDate IS NOT NULL and @LeaveStartDate<=@LeaveEndDate)
        SET @UpdateQuery += 'LeaveStartDate = @LeaveStartDate,';
	IF (@LeaveStartDate>@LeaveEndDate)
    begin
        set	@Success = 'StartDate cannot be greater than EndDate';
		return;
	end
    else IF (@LeaveEndDate IS NOT NULL and @LeaveStartDate!>@LeaveEndDate)
	begin
        SET @UpdateQuery += 'LeaveEndDate = @LeaveEndDate,';
    end


        IF @StartDateAttendanceOption IS NOT NULL 
		BEGIN
		SET @UpdateQuery += 'StartDateAttendanceOption = @StartDateAttendanceOption,';
		END
        IF @EndDateAttendanceOption IS NOT NULL 
		BEGIN
		SET @UpdateQuery += 'EndDateAttendanceOption = @EndDateAttendanceOption,';
		END
        IF @IsAdhocLeave IS NOT NULL 
		BEGIN
		SET @UpdateQuery += 'IsAdhocLeave = @IsAdhocLeave,';
		END
        IF @AdhocLeaveStatus IS NOT NULL 
		BEGIN
		SET @UpdateQuery += 'AdhocLeaveStatus = @AdhocLeaveStatus,';
		END
        IF @PhoneNumber IS NOT NULL 
		BEGIN
		SET @UpdateQuery += 'PhoneNumber = @PhoneNumber,';
		END
        IF @AlternatePhoneNumber IS NOT NULL 
		BEGIN
		SET @UpdateQuery += 'AlternatePhoneNumber = @AlternatePhoneNumber,';
		END
        IF @AvailibiltyOnPhone IS NOT NULL 
		BEGIN
		SET @UpdateQuery += 'AvailibiltyOnPhone = @AvailibiltyOnPhone,';
		END
        IF @AvailibiltyInCity IS NOT NULL 
		BEGIN
		SET @UpdateQuery += 'AvailibiltyInCity = @AvailibiltyInCity,';
		END

    -- Remove the trailing comma
    SET @UpdateQuery = LEFT(@UpdateQuery, LEN(@UpdateQuery) - 1);

    SET @UpdateQuery += ' WHERE LeaveRequestId = @LeaveRequestId';

    EXEC sp_executesql @UpdateQuery,
        N'@ReasonForLeave NVARCHAR(255),
          @LeaveStartDate DATE,
          @LeaveEndDate DATE,
          @StartDateAttendanceOption INT,
          @EndDateAttendanceOption INT,
          @IsAdhocLeave BIT,
          @AdhocLeaveStatus VARCHAR(128),
          @PhoneNumber BIGINT,
          @AlternatePhoneNumber BIGINT,
          @AvailibiltyOnPhone BIT,
          @AvailibiltyInCity BIT,
          @LeaveRequestId BIGINT',
        @ReasonForLeave,
        @LeaveStartDate,
        @LeaveEndDate,
        @StartDateAttendanceOption,
        @EndDateAttendanceOption,
        @IsAdhocLeave,
        @AdhocLeaveStatus,
        @PhoneNumber,
        @AlternatePhoneNumber,
        @AvailibiltyOnPhone,
        @AvailibiltyInCity,
        @LeaveRequestId;

    SET @Success = CASE WHEN @@ROWCOUNT > 0 THEN 1 ELSE 0 END;

    SELECT
        LeaveRequestId,
        ReasonForLeave,
        LeaveStartDate,
        LeaveEndDate,
        StartDateAttendanceOption,
        EndDateAttendanceOption,
        IsAdhocLeave,
        AdhocLeaveStatus,
        PhoneNumber,
        AlternatePhoneNumber,
        AvailibiltyOnPhone,
        AvailibiltyInCity
    FROM LeaveRequest
    WHERE LeaveRequestId = @LeaveRequestId;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateProjectWorkItemTime]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_UpdateProjectWorkItemTime]
@ProjectWorkId BIGINT,
@TotalTime FLOAT,
@RemaningTime FLOAT,
@status BIT OUT,
@message VARCHAR(255) OUT 
AS
BEGIN 
	SET NOCOUNT ON;

	UPDATE [dbo].[ProjectWorkitems]
	SET
	[TotalWorkDone] = @TotalTime,
	[RemainingEstTime] = @RemaningTime
	WHERE [ProjectWorkId] = @ProjectWorkId;
	SET @status  =  CASE WHEN @@ROWCOUNT = 0 THEN 0 ELSE 1 END;
	SET @message =  CASE WHEN @@ROWCOUNT = 0 THEN 'Somthing went wrong unable to update project work item, Please try again!' END;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateServiceRequest]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_UpdateServiceRequest]
    @ServiceRequestId BIGINT,
    @RequestedDate DATETIME = GETDATE,
    @Status INT,
    @ServiceGroupId INT,
    @CategoryId INT,
    @SubCategoryId INT,
    @ServiceRequestPriority NVARCHAR(16),
    @ServiceDetails NVARCHAR(255),
	@Comments NVARCHAR(1024) = NULL,
    @IsUpdateSuccessful BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    IF @Status = 3
    BEGIN
        SET @IsUpdateSuccessful = 0;  -- Don't update if the status is 3
    END
    ELSE
    BEGIN
        BEGIN TRY
            DECLARE @DynamicSQL NVARCHAR(MAX);

            SET @DynamicSQL = N'
                UPDATE ServiceRequest
                SET
                    CreatedAt = @RequestedDate,
                    ServiceGroupId = @ServiceGroupId,
                    CategoryId = @CategoryId,
                    SubCategoryId = @SubCategoryId,
                    ServiceRequetPriority = @ServiceRequestPriority,
                    ServiceDetails = @ServiceDetails,
					Comments = @Comments
                WHERE ServiceRequestId = @ServiceRequestId;

                SELECT *
                FROM ServiceRequest
                WHERE ServiceRequestId = @ServiceRequestId';

            EXEC sp_executesql @DynamicSQL,
                N'@RequestedDate DATETIME, @ServiceGroupId INT, @CategoryId INT, @SubCategoryId INT, @ServiceRequestPriority NVARCHAR(16), @ServiceDetails NVARCHAR(255), @ServiceRequestId BIGINT,@Comments NVARCHAR(max)',
                @RequestedDate = @RequestedDate,
                @ServiceGroupId = @ServiceGroupId,
                @CategoryId = @CategoryId,
                @SubCategoryId = @SubCategoryId,
                @ServiceRequestPriority = @ServiceRequestPriority,
                @ServiceDetails = @ServiceDetails,
				@Comments = @Comments,
                @ServiceRequestId = @ServiceRequestId;

            SET @IsUpdateSuccessful = 1;
        END TRY
        BEGIN CATCH
            SET @IsUpdateSuccessful = 0;
        END CATCH;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateTranineeTraningFeedBack]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE         PROCEDURE [dbo].[SP_UpdateTranineeTraningFeedBack] 
	@FeedbackId BIGINT
	,@feedbackCourseCourseCoverage INT = 0
	,@feedbackCourseDelivery INT = 0
	,@feedbackCourseMaterial INT = 0
	,@feedbackCourseQuality INT = 0
	,@feedbackCourseAvailability INT = 0
	,@feedbackCourseManagements INT = 0
	,@feedbackFacultyKnowleage INT = 0
	,@feedbackFacultyPresentation INT = 0
	,@feedbackFacultyCoverage INT = 0
	,@feedbackFacultyExamples INT = 0
	,@feedbackFacultyLevel INT = 0
	,@feedbackSelfGain INT = 0
	,@feedbackSelfApplicability INT = 0
	,@feedbackOverallConduct INT = 0
	,@suggestionImprovements VARCHAR(1024) = NULL
	,@suggestionCoverage VARCHAR(1024) = NULL
	,@status BIT OUT
	,@message VARCHAR(255) OUT 
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [TraineeFeedback]
	SET
	   [IsFeedBackGiven] = 1
      ,[FeedbackCourseCourseCoverage] = @feedbackCourseCourseCoverage
      ,[FeedbackCourseDelivery] = @feedbackCourseDelivery
      ,[FeedbackCourseMaterial] = @feedbackCourseMaterial
      ,[FeedbackCourseQuality] = @feedbackCourseQuality
      ,[FeedbackCourseAvailability] = @feedbackCourseAvailability
      ,[FeedbackCourseManagements] = @feedbackCourseManagements
      ,[FeedbackFacultyKnowleage] = @feedbackFacultyKnowleage
      ,[FeedbackFacultyPresentation] = @feedbackFacultyPresentation
      ,[FeedbackFacultyCoverage] = @feedbackFacultyCoverage
      ,[FeedbackFacultyExamples] = @feedbackFacultyExamples
      ,[FeedbackFacultyLevel] = @feedbackFacultyLevel
      ,[FeedbackSelfGain] = @feedbackSelfGain
      ,[FeedbackSelfApplicability] = @feedbackSelfApplicability
      ,[FeedbackOverallConduct] = @feedbackOverallConduct
      ,[SuggestionImprovements] = @suggestionImprovements
      ,[SuggestionCoverage] = @suggestionCoverage
  WHERE FeedbackId = @FeedbackId;

  IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to update the entry. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Entry updated successfully.';
    END
END

GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateWorkItem]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_UpdateWorkItem]
	@ProjectWorkId BIGINT,
	@ProjectId BIGINT = NULL,
	@EmployeeId BIGINT = NULL,
	@SubProjectId BIGINT = NULL,
	@Title VARCHAR(128) = NULL,
	@WorkGroupId BIGINT = NULL,
	@WorkFlow BIGINT = NULL,
	@Priority VARCHAR(16) = NULL,
	@ProjectStatusId INT = NULL,
	@StartDate DATETIME = NULL,
	@EndDate DATETIME = NULL,
	@OriginalEstTime FLOAT = NULL,
	@RemainingEstTime FLOAT = NULL,
	@AssignedEmployeeId BIGINT = NULL,
	@ReportedEmployeeId BIGINT = NULL,
	@ReleasedToProduction BIT = NULL,
	@RSI FLOAT = NULL,
	@Description VARCHAR(MAX) = NULL,
	@status BIT OUT,
	@message VARCHAR(255) OUT 
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @SQL NVARCHAR(MAX) = N'',@Params NVARCHAR(MAX) = N'';
	SET @Params += '
	@ProjectWorkId BIGINT,
	@ProjectId BIGINT,
	@EmployeeId BIGINT,
	@SubProjectId BIGINT,
	@Title VARCHAR(128),
	@WorkGroupId BIGINT,
	@WorkFlow BIGINT,
	@Priority VARCHAR(16),
	@ProjectStatusId INT,
	@StartDate DATETIME,
	@EndDate DATETIME,
	@OriginalEstTime FLOAT,
	@RemainingEstTime FLOAT,
	@AssignedEmployeeId BIGINT,
	@ReportedEmployeeId BIGINT,
	@ReleasedToProduction BIT,
	@RSI FLOAT,
	@Description VARCHAR(MAX),
	@status BIT OUT,
	@message VARCHAR(255) OUT ';

	SET @SQL += N'
	UPDATE ProjectWorkitems
	SET SubProjectId = @SubProjectId,'

	IF @EmployeeId IS NOT NULL
	BEGIN
		SET @SQL += 'EmployeeId = @EmployeeId,'
	END
	IF @ProjectId IS NOT NULL
	BEGIN
		SET @SQL += 'ProjectId = @ProjectId,'
	END
	IF @Title IS NOT NULL
	BEGIN
		SET @SQL += 'Title = @Title,'
	END
	IF @WorkGroupId IS NOT NULL
	BEGIN
		SET @SQL += 'WorkGroupId = @WorkGroupId,'
	END
	IF @WorkFlow IS NOT NULL
	BEGIN
		SET @SQL += 'WorkFlow = @WorkFlow,'
	END
	IF @Priority IS NOT NULL
	BEGIN
		SET @SQL += 'ProjectWorkitemsPriority = @Priority,'
	END
	IF @ProjectStatusId IS NOT NULL
	BEGIN
		SET @SQL += 'ProjectStatusId = @ProjectStatusId,'
	END
	IF @StartDate IS NOT NULL
	BEGIN
		SET @SQL += 'StartDate = @StartDate,'
	END	
	IF @EndDate IS NOT NULL
	BEGIN
		SET @SQL += 'EndDate = @EndDate,'
	END
	IF @OriginalEstTime IS NOT NULL
	BEGIN
		SET @SQL += 'OriginalEstTime = @OriginalEstTime,'
	END	
	IF @RemainingEstTime IS NOT NULL
	BEGIN
		SET @SQL += 'RemainingEstTime = @RemainingEstTime,'
	END
	IF @AssignedEmployeeId IS NOT NULL
	BEGIN
		SET @SQL += 'AssignedEmployeeId = @AssignedEmployeeId,'
	END	
	IF @ReleasedToProduction IS NOT NULL
	BEGIN
		SET @SQL += 'ReleasedToProduction = @ReleasedToProduction,'
	END
	IF @ReportedEmployeeId IS NOT NULL
	BEGIN
		SET @SQL += 'ReportedEmployeeId = @ReportedEmployeeId,'
	END	
	IF @RSI IS NOT NULL
	BEGIN
		SET @SQL += 'RSI = @RSI,'
	END
	IF @Description IS NOT NULL
	BEGIN
		SET @SQL += '[Description] = @Description,'
	END	

	SET @SQL = LEFT(@SQL, LEN(@SQL) - 1);
	
	SET @SQL += '
	WHERE ProjectWorkId = @ProjectWorkId;
	SET @status = CASE WHEN @@ROWCOUNT = 0 THEN 0 ELSE 1 END;
	SET @message = CASE WHEN @@ROWCOUNT = 0 THEN ''Something went wrong. Unable to update work item, please try again!''
					   ELSE ''Project work item updated successfully'' END;'


	Print(@SQL);

	EXEC sys.sp_executesql @SQL, @Params,
	@ProjectWorkId,
	@ProjectId,
	@EmployeeId,
	@SubProjectId,
	@Title,
	@WorkGroupId,
	@WorkFlow,
	@Priority,
	@ProjectStatusId,
	@StartDate,
	@EndDate,
	@OriginalEstTime,
	@RemainingEstTime,
	@AssignedEmployeeId,
	@ReportedEmployeeId,
	@ReleasedToProduction,
	@RSI,
	@Description,
	@status = @status OUTPUT,
	@message = @message OUTPUT ;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateWorkLog]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_UpdateWorkLog]
@WorkLogId BIGINT,
@WorkDoneOn DATE,
@WorkTime FLOAT,
@Description VARCHAR(256),
@status BIT OUT,
@message VARCHAR(255) OUT 
AS
BEGIN 
	SET NOCOUNT ON;

	DECLARE @ProjectWorkId BIGINT;
    DECLARE @OldWorkTime FLOAT;
    DECLARE @RemainingEstTime FLOAT;
    DECLARE @TotalWorkDone FLOAT;

    SELECT @ProjectWorkId = [ProjectWorkId], @OldWorkTime = [WorkTime]
    FROM [dbo].[WorkLog]
    WHERE WorkLogId = @WorkLogId;

    IF @ProjectWorkId IS NULL
    BEGIN
        SET @status = 0;
        SET @message = 'WorkLog entry not found.';
        RETURN;
    END

    SELECT @RemainingEstTime = [RemainingEstTime], @TotalWorkDone = [TotalWorkDone]
    FROM [dbo].[ProjectWorkitems]
    WHERE ProjectWorkId = @ProjectWorkId;

	UPDATE WorkLog
	SET
	[WorkDoneOn] = @WorkDoneOn,
	[WorkTime] = @WorkTime,
	[Description] = @Description
	WHERE WorkLogId = @WorkLogId;

	IF @RemainingEstTime >= (@WorkTime - @OldWorkTime) AND @WorkTime > @OldWorkTime
    BEGIN
        UPDATE [dbo].[ProjectWorkitems] 
        SET [RemainingEstTime] = (@RemainingEstTime - (@WorkTime - @OldWorkTime)), [TotalWorkDone] = (@TotalWorkDone + (@WorkTime - @OldWorkTime))
        WHERE [ProjectWorkId] = @ProjectWorkId;
    END
	ELSE 
	IF @TotalWorkDone >= (@OldWorkTime - @WorkTime) AND @WorkTime < @OldWorkTime
    BEGIN
        UPDATE [dbo].[ProjectWorkitems] 
        SET [RemainingEstTime] = (@RemainingEstTime + (@OldWorkTime - @WorkTime)), [TotalWorkDone] = (@TotalWorkDone - (@OldWorkTime - @WorkTime))
        WHERE [ProjectWorkId] = @ProjectWorkId;
    END

	IF @@ROWCOUNT = 0
    BEGIN
        SET @status = 0;
        SET @message = 'Something went wrong, unable to update the entry. Please try again!';
    END
    ELSE
    BEGIN
        SET @status = 1;
        SET @message = 'Entry updated successfully.';
    END
END
GO
/****** Object:  Trigger [dbo].[trg_AttendanceInformation_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_AttendanceInformation_Insert]
ON [dbo].[AttendanceInformation]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[AttendanceInformation]
    SET CreatedAt = GETDATE()
    WHERE AttendanceInfoId IN (SELECT AttendanceInfoId FROM inserted)
END
GO
ALTER TABLE [dbo].[AttendanceInformation] ENABLE TRIGGER [trg_AttendanceInformation_Insert]
GO
/****** Object:  Trigger [dbo].[trg_AttendanceInformation_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_AttendanceInformation_Update]
ON [dbo].[AttendanceInformation]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[AttendanceInformation]
    SET [UpdateAt] = GETDATE()
    WHERE AttendanceInfoId IN (SELECT AttendanceInfoId FROM inserted)
END
GO
ALTER TABLE [dbo].[AttendanceInformation] ENABLE TRIGGER [trg_AttendanceInformation_Update]
GO
/****** Object:  Trigger [dbo].[trg_Category_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_Category_Insert]
ON [WorkSpaceDb].[dbo].[Category]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[Category]
    SET CreatedAt = GETDATE()
    WHERE CategoryId IN (SELECT CategoryId FROM inserted)
END
GO
ALTER TABLE [dbo].[Category] ENABLE TRIGGER [trg_Category_Insert]
GO
/****** Object:  Trigger [dbo].[trg_Category_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_Category_Update]
ON [WorkSpaceDb].[dbo].[Category]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[Category]
    SET [UpdateAt] = GETDATE()
    WHERE CategoryId IN (SELECT CategoryId FROM inserted)
END
GO
ALTER TABLE [dbo].[Category] ENABLE TRIGGER [trg_Category_Update]
GO
/****** Object:  Trigger [dbo].[trg_CountryVisaInformation_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_CountryVisaInformation_Insert]
ON [WorkSpaceDb].[dbo].[CountryVisaInformation]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[CountryVisaInformation]
    SET CreatedAt = GETDATE()
    WHERE VisaInfoId IN (SELECT VisaInfoId FROM inserted)
END
GO
ALTER TABLE [dbo].[CountryVisaInformation] ENABLE TRIGGER [trg_CountryVisaInformation_Insert]
GO
/****** Object:  Trigger [dbo].[trg_CountryVisaInformation_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_CountryVisaInformation_Update]
ON [WorkSpaceDb].[dbo].[CountryVisaInformation]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[CountryVisaInformation]
    SET [UpdateAt] = GETDATE()
    WHERE VisaInfoId IN (SELECT VisaInfoId FROM inserted)
END
GO
ALTER TABLE [dbo].[CountryVisaInformation] ENABLE TRIGGER [trg_CountryVisaInformation_Update]
GO
/****** Object:  Trigger [dbo].[trg_Department_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_Department_Insert]
ON [WorkSpaceDb].[dbo].[Department]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[Department]
    SET CreatedAt = GETDATE()
    WHERE DepartmentId IN (SELECT DepartmentId FROM inserted)
END
GO
ALTER TABLE [dbo].[Department] ENABLE TRIGGER [trg_Department_Insert]
GO
/****** Object:  Trigger [dbo].[trg_Department_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_Department_Update]
ON [WorkSpaceDb].[dbo].[Department]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[Department]
    SET [UpdateAt] = GETDATE()
    WHERE DepartmentId IN (SELECT DepartmentId FROM inserted)
END
GO
ALTER TABLE [dbo].[Department] ENABLE TRIGGER [trg_Department_Update]
GO
/****** Object:  Trigger [dbo].[trg_Employee_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_Employee_Insert]
ON [WorkSpaceDb].[dbo].[Employee]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[Employee]
    SET CreatedAt = GETDATE()
    WHERE EmployeeId IN (SELECT EmployeeId FROM inserted)
END
GO
ALTER TABLE [dbo].[Employee] ENABLE TRIGGER [trg_Employee_Insert]
GO
/****** Object:  Trigger [dbo].[trg_Employee_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_Employee_Update]
ON [WorkSpaceDb].[dbo].[Employee]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[Employee]
    SET [UpdateAt] = GETDATE()
    WHERE EmployeeId IN (SELECT EmployeeId FROM inserted)
END
GO
ALTER TABLE [dbo].[Employee] ENABLE TRIGGER [trg_Employee_Update]
GO
/****** Object:  Trigger [dbo].[trg_EmployeeDetails_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_EmployeeDetails_Insert]
ON [WorkSpaceDb].[dbo].[EmployeeDetails]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[EmployeeDetails]
    SET CreatedAt = GETDATE()
    WHERE EmployeeDeatilId IN (SELECT EmployeeDeatilId FROM inserted)
END
GO
ALTER TABLE [dbo].[EmployeeDetails] ENABLE TRIGGER [trg_EmployeeDetails_Insert]
GO
/****** Object:  Trigger [dbo].[trg_EmployeeDetails_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_EmployeeDetails_Update]
ON [WorkSpaceDb].[dbo].[EmployeeDetails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[EmployeeDetails]
    SET [UpdateAt] = GETDATE()
    WHERE EmployeeDeatilId IN (SELECT EmployeeDeatilId FROM inserted)
END
GO
ALTER TABLE [dbo].[EmployeeDetails] ENABLE TRIGGER [trg_EmployeeDetails_Update]
GO
/****** Object:  Trigger [dbo].[trg_EmployeeInOutTimeLog_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     TRIGGER [dbo].[trg_EmployeeInOutTimeLog_Insert]
ON [WorkSpaceDb].[dbo].[EmployeeInOutTimeLog]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].EmployeeInOutTimeLog
    SET CreatedAt = GETDATE()
    WHERE LogId IN (SELECT LogId FROM inserted)
END
GO
ALTER TABLE [dbo].[EmployeeInOutTimeLog] ENABLE TRIGGER [trg_EmployeeInOutTimeLog_Insert]
GO
/****** Object:  Trigger [dbo].[trg_EmployeeInOutTimeLog_InsertOrUpdate]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   TRIGGER [dbo].[trg_EmployeeInOutTimeLog_InsertOrUpdate]
ON [dbo].[EmployeeInOutTimeLog]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
	IF (SELECT MIN([InTime]) FROM [dbo].[EmployeeInOutTimeLog] WHERE [EmployeeLog] IN (SELECT [EmployeeLog] FROM inserted)) IS NOT NULL
	BEGIN
		UPDATE [WorkSpaceDb].[dbo].[EmployeeTimeLog]
		SET [FirstInTime] = (SELECT MIN([InTime]) FROM [dbo].[EmployeeInOutTimeLog] WHERE [EmployeeLog] IN (SELECT [EmployeeLog] FROM inserted))
		WHERE [EmployeeTimeLog].[EmployeeTimeLogId] IN (SELECT [EmployeeLog] FROM inserted);
	END
	IF (SELECT MAX([OutTime]) FROM [dbo].[EmployeeInOutTimeLog] WHERE [EmployeeLog] IN (SELECT [EmployeeLog] FROM inserted)) IS NOT NULL
	BEGIN
		UPDATE [WorkSpaceDb].[dbo].[EmployeeTimeLog]
		SET [LastOutTime] = (SELECT MAX([OutTime]) FROM [dbo].[EmployeeInOutTimeLog] WHERE [EmployeeLog] IN (SELECT [EmployeeLog] FROM inserted))
		WHERE [EmployeeTimeLog].[EmployeeTimeLogId] IN (SELECT [EmployeeLog] FROM inserted);
	END
END
GO
ALTER TABLE [dbo].[EmployeeInOutTimeLog] ENABLE TRIGGER [trg_EmployeeInOutTimeLog_InsertOrUpdate]
GO
/****** Object:  Trigger [dbo].[trg_EmployeeInOutTimeLog_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     TRIGGER [dbo].[trg_EmployeeInOutTimeLog_Update]
ON [WorkSpaceDb].[dbo].[EmployeeInOutTimeLog]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].EmployeeInOutTimeLog
    SET [UpdateAt] = GETDATE()
    WHERE LogId IN (SELECT LogId FROM inserted)
END
GO
ALTER TABLE [dbo].[EmployeeInOutTimeLog] ENABLE TRIGGER [trg_EmployeeInOutTimeLog_Update]
GO
/****** Object:  Trigger [dbo].[trg_EmployeeShift_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_EmployeeShift_Insert]
ON [WorkSpaceDb].[dbo].[EmployeeShift]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[EmployeeShift]
    SET CreatedAt = GETDATE()
    WHERE EmployeeShiftId IN (SELECT EmployeeShiftId FROM inserted)
END
GO
ALTER TABLE [dbo].[EmployeeShift] ENABLE TRIGGER [trg_EmployeeShift_Insert]
GO
/****** Object:  Trigger [dbo].[trg_EmployeeShift_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_EmployeeShift_Update]
ON [WorkSpaceDb].[dbo].[EmployeeShift]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[EmployeeShift]
    SET [UpdateAt] = GETDATE()
    WHERE EmployeeShiftId IN (SELECT EmployeeShiftId FROM inserted)
END
GO
ALTER TABLE [dbo].[EmployeeShift] ENABLE TRIGGER [trg_EmployeeShift_Update]
GO
/****** Object:  Trigger [dbo].[trg_EmployeeTimeLog_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_EmployeeTimeLog_Insert]
ON [WorkSpaceDb].[dbo].[EmployeeTimeLog]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[EmployeeTimeLog]
    SET CreatedAt = GETDATE()
    WHERE EmployeeTimeLogId IN (SELECT EmployeeTimeLogId FROM inserted)
END
GO
ALTER TABLE [dbo].[EmployeeTimeLog] ENABLE TRIGGER [trg_EmployeeTimeLog_Insert]
GO
/****** Object:  Trigger [dbo].[trg_EmployeeTimeLog_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_EmployeeTimeLog_Update]
ON [WorkSpaceDb].[dbo].[EmployeeTimeLog]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[EmployeeTimeLog]
    SET [UpdateAt] = GETDATE()
    WHERE EmployeeTimeLogId IN (SELECT EmployeeTimeLogId FROM inserted)
END
GO
ALTER TABLE [dbo].[EmployeeTimeLog] ENABLE TRIGGER [trg_EmployeeTimeLog_Update]
GO
/****** Object:  Trigger [dbo].[trg_Holidays_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     TRIGGER [dbo].[trg_Holidays_Insert]
ON [WorkSpaceDb].[dbo].[Holidays]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].Holidays
    SET CreatedAt = GETDATE()
    WHERE [Id] IN (SELECT [Id] FROM inserted)
END
GO
ALTER TABLE [dbo].[Holidays] ENABLE TRIGGER [trg_Holidays_Insert]
GO
/****** Object:  Trigger [dbo].[trg_Holidays_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting UpdatedAt column on UPDATE
CREATE     TRIGGER [dbo].[trg_Holidays_Update]
ON [WorkSpaceDb].[dbo].[Holidays]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].Holidays
    SET [UpdatedAt] = GETDATE()
    WHERE [Id] IN (SELECT [Id] FROM inserted)
END
GO
ALTER TABLE [dbo].[Holidays] ENABLE TRIGGER [trg_Holidays_Update]
GO
/****** Object:  Trigger [dbo].[trg_LeaveRequest_Approved]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   TRIGGER [dbo].[trg_LeaveRequest_Approved]
ON [dbo].[LeaveRequest]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE(LeaveRequestStatus)
    BEGIN
        UPDATE lr
        SET lr.ApprovedDate = GETDATE()
        FROM LeaveRequest lr
        INNER JOIN inserted i ON lr.LeaveRequestId = i.LeaveRequestId
        WHERE i.LeaveRequestStatus = 'Approved';
    END
END;
GO
ALTER TABLE [dbo].[LeaveRequest] ENABLE TRIGGER [trg_LeaveRequest_Approved]
GO
/****** Object:  Trigger [dbo].[trg_LeaveRequest_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_LeaveRequest_Insert]
ON [WorkSpaceDb].[dbo].[LeaveRequest]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[LeaveRequest]
    SET CreatedAt = GETDATE()
    WHERE LeaveRequestId IN (SELECT LeaveRequestId FROM inserted)
END
GO
ALTER TABLE [dbo].[LeaveRequest] ENABLE TRIGGER [trg_LeaveRequest_Insert]
GO
/****** Object:  Trigger [dbo].[trg_LeaveRequest_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_LeaveRequest_Update]
ON [WorkSpaceDb].[dbo].[LeaveRequest]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[LeaveRequest]
    SET [UpdateAt] = GETDATE()
    WHERE LeaveRequestId IN (SELECT LeaveRequestId FROM inserted)
END
GO
ALTER TABLE [dbo].[LeaveRequest] ENABLE TRIGGER [trg_LeaveRequest_Update]
GO
/****** Object:  Trigger [dbo].[trg_NewsAndDetails_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_NewsAndDetails_Insert]
ON [dbo].[NewsAndDetails]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[NewsAndDetails]
    SET CreatedAt = GETDATE()
    WHERE NewsId IN (SELECT NewsId FROM inserted)
END
GO
ALTER TABLE [dbo].[NewsAndDetails] ENABLE TRIGGER [trg_NewsAndDetails_Insert]
GO
/****** Object:  Trigger [dbo].[trg_NewsAndDetails_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_NewsAndDetails_Update]
ON [dbo].[NewsAndDetails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[NewsAndDetails]
    SET [UpdateAt] = GETDATE()
    WHERE NewsId IN (SELECT NewsId FROM inserted)
END
GO
ALTER TABLE [dbo].[NewsAndDetails] ENABLE TRIGGER [trg_NewsAndDetails_Update]
GO
/****** Object:  Trigger [dbo].[trg_PersonalDetails_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_PersonalDetails_Insert]
ON [WorkSpaceDb].[dbo].[PersonalDetails]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[PersonalDetails]
    SET CreatedAt = GETDATE()
    WHERE EmployeeInfoId IN (SELECT EmployeeInfoId FROM inserted)
END
GO
ALTER TABLE [dbo].[PersonalDetails] ENABLE TRIGGER [trg_PersonalDetails_Insert]
GO
/****** Object:  Trigger [dbo].[trg_PersonalDetails_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_PersonalDetails_Update]
ON [WorkSpaceDb].[dbo].[PersonalDetails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[PersonalDetails]
    SET [UpdateAt] = GETDATE()
    WHERE EmployeeInfoId IN (SELECT EmployeeInfoId FROM inserted)
END
GO
ALTER TABLE [dbo].[PersonalDetails] ENABLE TRIGGER [trg_PersonalDetails_Update]
GO
/****** Object:  Trigger [dbo].[trg_ProjectDescription_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_ProjectDescription_Insert]
ON [WorkSpaceDb].[dbo].[ProjectDescription]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ProjectDescription]
    SET CreatedAt = GETDATE()
    WHERE ProjectId IN (SELECT ProjectId FROM inserted)
END
GO
ALTER TABLE [dbo].[ProjectDescription] ENABLE TRIGGER [trg_ProjectDescription_Insert]
GO
/****** Object:  Trigger [dbo].[trg_ProjectDescription_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_ProjectDescription_Update]
ON [WorkSpaceDb].[dbo].[ProjectDescription]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ProjectDescription]
    SET [UpdateAt] = GETDATE()
    WHERE ProjectId IN (SELECT ProjectId FROM inserted)
END
GO
ALTER TABLE [dbo].[ProjectDescription] ENABLE TRIGGER [trg_ProjectDescription_Update]
GO
/****** Object:  Trigger [dbo].[trg_ProjectTech_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_ProjectTech_Insert]
ON [WorkSpaceDb].[dbo].[ProjectTech]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ProjectTech]
    SET CreatedAt = GETDATE()
    WHERE ProjectTechId IN (SELECT ProjectTechId FROM inserted)
END
GO
ALTER TABLE [dbo].[ProjectTech] ENABLE TRIGGER [trg_ProjectTech_Insert]
GO
/****** Object:  Trigger [dbo].[trg_ProjectTech_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_ProjectTech_Update]
ON [WorkSpaceDb].[dbo].[ProjectTech]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ProjectTech]
    SET [UpdateAt] = GETDATE()
    WHERE ProjectTechId IN (SELECT ProjectTechId FROM inserted)
END
GO
ALTER TABLE [dbo].[ProjectTech] ENABLE TRIGGER [trg_ProjectTech_Update]
GO
/****** Object:  Trigger [dbo].[TR_WorkItemHistory_InsertRows]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     TRIGGER [dbo].[TR_WorkItemHistory_InsertRows]
ON [dbo].[ProjectWorkitems]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE(ProjectStatusId)
    BEGIN
        INSERT INTO [WorkSpaceDb].[dbo].[WorkItemHistory] ([ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue])
        SELECT
            I.[ProjectWorkId],
            'Work Flow Step',
            I.[EmployeeId],
            CASE WHEN D.ProjectStatusId IS NULL THEN 'NAN' ELSE CAST(D.ProjectStatusId AS NVARCHAR(100)) END,
            CASE WHEN I.ProjectStatusId IS NULL THEN 'NAN' ELSE CAST(I.ProjectStatusId AS NVARCHAR(100)) END
        FROM INSERTED AS I
        INNER JOIN DELETED AS D ON I.[ProjectWorkId] = D.[ProjectWorkId]
        WHERE (I.ProjectStatusId IS NULL AND D.ProjectStatusId IS NOT NULL)
           OR (I.ProjectStatusId IS NOT NULL AND D.ProjectStatusId IS NULL)
           OR (I.ProjectStatusId IS NOT NULL AND D.ProjectStatusId IS NOT NULL AND I.ProjectStatusId <> D.ProjectStatusId);
    END
	IF UPDATE(TotalWorkDone)
    BEGIN
        INSERT INTO [WorkSpaceDb].[dbo].[WorkItemHistory] ([ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue])
        SELECT
            I.[ProjectWorkId],
            'Total Time Spent',
            I.[EmployeeId],
            CASE WHEN D.[TotalWorkDone] IS NULL THEN 'NAN' ELSE CAST(D.[TotalWorkDone] AS NVARCHAR(100)) END,
            CASE WHEN I.[TotalWorkDone] IS NULL THEN 'NAN' ELSE CAST(I.[TotalWorkDone] AS NVARCHAR(100)) END
        FROM INSERTED AS I
        INNER JOIN DELETED AS D ON I.[ProjectWorkId] = D.[ProjectWorkId]
        WHERE (I.[TotalWorkDone] IS NULL AND D.[TotalWorkDone] IS NOT NULL)
           OR (I.[TotalWorkDone] IS NOT NULL AND D.[TotalWorkDone] IS NULL)
           OR (I.[TotalWorkDone] IS NOT NULL AND D.[TotalWorkDone] IS NOT NULL AND I.[TotalWorkDone] <> D.[TotalWorkDone]);
    END
	IF UPDATE(RemainingEstTime)
    BEGIN
        INSERT INTO [WorkSpaceDb].[dbo].[WorkItemHistory] ([ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue])
        SELECT
            I.[ProjectWorkId],
            'Remaining Time',
            I.[EmployeeId],
            CASE WHEN D.[RemainingEstTime] IS NULL THEN 'NAN' ELSE CAST(D.[RemainingEstTime] AS NVARCHAR(100)) END,
            CASE WHEN I.[RemainingEstTime] IS NULL THEN 'NAN' ELSE CAST(I.[RemainingEstTime] AS NVARCHAR(100)) END
        FROM INSERTED AS I
        INNER JOIN DELETED AS D ON I.[ProjectWorkId] = D.[ProjectWorkId]
        WHERE (I.[RemainingEstTime] IS NULL AND D.[RemainingEstTime] IS NOT NULL)
           OR (I.[RemainingEstTime] IS NOT NULL AND D.[RemainingEstTime] IS NULL)
           OR (I.[RemainingEstTime] IS NOT NULL AND D.[RemainingEstTime] IS NOT NULL AND I.[RemainingEstTime] <> D.[RemainingEstTime]);
    END
END
SELECT * FROM [dbo].[WorkItemHistory];
GO
ALTER TABLE [dbo].[ProjectWorkitems] ENABLE TRIGGER [TR_WorkItemHistory_InsertRows]
GO
/****** Object:  Trigger [dbo].[trg_ProjectWorkitems_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_ProjectWorkitems_Insert]
ON [dbo].[ProjectWorkitems]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ProjectWorkitems]
    SET CreatedAt = GETDATE()
    WHERE ProjectWorkId IN (SELECT ProjectWorkId FROM inserted)
END
GO
ALTER TABLE [dbo].[ProjectWorkitems] ENABLE TRIGGER [trg_ProjectWorkitems_Insert]
GO
/****** Object:  Trigger [dbo].[trg_ProjectWorkitems_InsertUpdate]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[trg_ProjectWorkitems_InsertUpdate]
ON [dbo].[ProjectWorkitems]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[WorkItemState] ([ProjectWorkId], [EmployeeId], [ProjectStatusId])
    SELECT 
        i.[ProjectWorkId], i.[AssignedEmployeeId], i.[ProjectStatusId]
    FROM
        inserted i
    LEFT JOIN deleted d ON i.[ProjectWorkId] = d.[ProjectWorkId]
    WHERE
        i.[ProjectStatusId] <> COALESCE(d.[ProjectStatusId], -1);
END;
GO
ALTER TABLE [dbo].[ProjectWorkitems] ENABLE TRIGGER [trg_ProjectWorkitems_InsertUpdate]
GO
/****** Object:  Trigger [dbo].[trg_ProjectWorkitems_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_ProjectWorkitems_Update]
ON [dbo].[ProjectWorkitems]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ProjectWorkitems]
    SET [UpdateAt] = GETDATE()
    WHERE ProjectWorkId IN (SELECT ProjectWorkId FROM inserted)
END
GO
ALTER TABLE [dbo].[ProjectWorkitems] ENABLE TRIGGER [trg_ProjectWorkitems_Update]
GO
/****** Object:  Trigger [dbo].[trg_ServiceGroup_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_ServiceGroup_Insert]
ON [WorkSpaceDb].[dbo].[ServiceGroup]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ServiceGroup]
    SET CreatedAt = GETDATE()
    WHERE ServiceGroupId IN (SELECT ServiceGroupId FROM inserted)
END
GO
ALTER TABLE [dbo].[ServiceGroup] ENABLE TRIGGER [trg_ServiceGroup_Insert]
GO
/****** Object:  Trigger [dbo].[trg_ServiceGroup_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_ServiceGroup_Update]
ON [WorkSpaceDb].[dbo].[ServiceGroup]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ServiceGroup]
    SET [UpdateAt] = GETDATE()
    WHERE ServiceGroupId IN (SELECT ServiceGroupId FROM inserted)
END
GO
ALTER TABLE [dbo].[ServiceGroup] ENABLE TRIGGER [trg_ServiceGroup_Update]
GO
/****** Object:  Trigger [dbo].[trg_ServiceRequest_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_ServiceRequest_Insert]
ON [WorkSpaceDb].[dbo].[ServiceRequest]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ServiceRequest]
    SET CreatedAt = GETDATE()
    WHERE ServiceRequestId IN (SELECT ServiceRequestId FROM inserted)
END
GO
ALTER TABLE [dbo].[ServiceRequest] ENABLE TRIGGER [trg_ServiceRequest_Insert]
GO
/****** Object:  Trigger [dbo].[trg_ServiceRequest_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_ServiceRequest_Update]
ON [WorkSpaceDb].[dbo].[ServiceRequest]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ServiceRequest]
    SET [UpdateAt] = GETDATE()
    WHERE ServiceRequestId IN (SELECT ServiceRequestId FROM inserted)
END
GO
ALTER TABLE [dbo].[ServiceRequest] ENABLE TRIGGER [trg_ServiceRequest_Update]
GO
/****** Object:  Trigger [dbo].[trg_ServiceRequestHistory_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_ServiceRequestHistory_Insert]
ON [WorkSpaceDb].[dbo].[ServiceRequestHistory]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ServiceRequestHistory]
    SET CreatedAt = GETDATE()
    WHERE ServiceRequestHistoryId IN (SELECT ServiceRequestHistoryId FROM inserted)
END
GO
ALTER TABLE [dbo].[ServiceRequestHistory] ENABLE TRIGGER [trg_ServiceRequestHistory_Insert]
GO
/****** Object:  Trigger [dbo].[trg_ServiceRequestHistory_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_ServiceRequestHistory_Update]
ON [WorkSpaceDb].[dbo].[ServiceRequestHistory]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[ServiceRequestHistory]
    SET [UpdateAt] = GETDATE()
    WHERE ServiceRequestHistoryId IN (SELECT ServiceRequestHistoryId FROM inserted)
END
GO
ALTER TABLE [dbo].[ServiceRequestHistory] ENABLE TRIGGER [trg_ServiceRequestHistory_Update]
GO
/****** Object:  Trigger [dbo].[trg_SubCategory_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_SubCategory_Insert]
ON [WorkSpaceDb].[dbo].[SubCategory]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[SubCategory]
    SET CreatedAt = GETDATE()
    WHERE SubCategoryId IN (SELECT SubCategoryId FROM inserted)
END
GO
ALTER TABLE [dbo].[SubCategory] ENABLE TRIGGER [trg_SubCategory_Insert]
GO
/****** Object:  Trigger [dbo].[trg_SubCategory_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_SubCategory_Update]
ON [WorkSpaceDb].[dbo].[SubCategory]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[SubCategory]
    SET [UpdateAt] = GETDATE()
    WHERE SubCategoryId IN (SELECT SubCategoryId FROM inserted)
END
GO
ALTER TABLE [dbo].[SubCategory] ENABLE TRIGGER [trg_SubCategory_Update]
GO
/****** Object:  Trigger [dbo].[trg_SubProject_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_SubProject_Insert]
ON [WorkSpaceDb].[dbo].[SubProject]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[SubProject]
    SET CreatedAt = GETDATE()
    WHERE SubProjectId IN (SELECT SubProjectId FROM inserted)
END
GO
ALTER TABLE [dbo].[SubProject] ENABLE TRIGGER [trg_SubProject_Insert]
GO
/****** Object:  Trigger [dbo].[trg_SubProject_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_SubProject_Update]
ON [WorkSpaceDb].[dbo].[SubProject]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[SubProject]
    SET [UpdateAt] = GETDATE()
    WHERE SubProjectId IN (SELECT SubProjectId FROM inserted)
END
GO
ALTER TABLE [dbo].[SubProject] ENABLE TRIGGER [trg_SubProject_Update]
GO
/****** Object:  Trigger [dbo].[trg_SystemConfigurationDetails_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_SystemConfigurationDetails_Insert]
ON [WorkSpaceDb].[dbo].[SystemConfigurationDetails]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[SystemConfigurationDetails]
    SET CreatedAt = GETDATE()
    WHERE SystemConfigurationDetailsID IN (SELECT SystemConfigurationDetailsID FROM inserted)
END
GO
ALTER TABLE [dbo].[SystemConfigurationDetails] ENABLE TRIGGER [trg_SystemConfigurationDetails_Insert]
GO
/****** Object:  Trigger [dbo].[trg_SystemConfigurationDetails_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_SystemConfigurationDetails_Update]
ON [WorkSpaceDb].[dbo].[SystemConfigurationDetails]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[SystemConfigurationDetails]
    SET [UpdateAt] = GETDATE()
    WHERE SystemConfigurationDetailsID IN (SELECT SystemConfigurationDetailsID FROM inserted)
END
GO
ALTER TABLE [dbo].[SystemConfigurationDetails] ENABLE TRIGGER [trg_SystemConfigurationDetails_Update]
GO
/****** Object:  Trigger [dbo].[trg_UserCurrentProjectInformation_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_UserCurrentProjectInformation_Insert]
ON [dbo].[UserCurrentProjectInformation]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[UserCurrentProjectInformation]
    SET CreatedAt = GETDATE()
    WHERE UserCurrentProjectInformationId IN (SELECT UserCurrentProjectInformationId FROM inserted)
END
GO
ALTER TABLE [dbo].[UserCurrentProjectInformation] ENABLE TRIGGER [trg_UserCurrentProjectInformation_Insert]
GO
/****** Object:  Trigger [dbo].[trg_UserCurrentProjectInformation_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_UserCurrentProjectInformation_Update]
ON [dbo].[UserCurrentProjectInformation]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[UserCurrentProjectInformation]
    SET [UpdateAt] = GETDATE()
    WHERE UserCurrentProjectInformationId IN (SELECT UserCurrentProjectInformationId FROM inserted)
END
GO
ALTER TABLE [dbo].[UserCurrentProjectInformation] ENABLE TRIGGER [trg_UserCurrentProjectInformation_Update]
GO
/****** Object:  Trigger [dbo].[trg_WorkAttachmentState_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   TRIGGER [dbo].[trg_WorkAttachmentState_Insert]
ON [dbo].[WorkItemAttachments]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [WorkSpaceDb].[dbo].[WorkItemAttachments]
    SET CreatedAt = GETDATE()
    WHERE [WorkItemAttachmentsId] IN (SELECT [WorkItemAttachmentsId] FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkItemAttachments] ENABLE TRIGGER [trg_WorkAttachmentState_Insert]
GO
/****** Object:  Trigger [dbo].[trg_WorkAttachmentState_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   TRIGGER [dbo].[trg_WorkAttachmentState_Update]
ON [dbo].[WorkItemAttachments]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [WorkSpaceDb].[dbo].[WorkItemAttachments]
    SET [UpdateAt] = GETDATE()
    WHERE [WorkItemAttachmentsId] IN (SELECT [WorkItemAttachmentsId] FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkItemAttachments] ENABLE TRIGGER [trg_WorkAttachmentState_Update]
GO
/****** Object:  Trigger [dbo].[trg_WorkItemHistory_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   TRIGGER [dbo].[trg_WorkItemHistory_Insert]
ON [dbo].[WorkItemHistory]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [WorkSpaceDb].[dbo].[WorkItemHistory]
    SET CreatedAt = GETDATE()
    WHERE [WorkItemHistoryId] IN (SELECT [WorkItemHistoryId] FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkItemHistory] ENABLE TRIGGER [trg_WorkItemHistory_Insert]
GO
/****** Object:  Trigger [dbo].[trg_WorkItemHistory_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   TRIGGER [dbo].[trg_WorkItemHistory_Update]
ON [dbo].[WorkItemHistory]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [WorkSpaceDb].[dbo].[WorkItemHistory]
    SET [UpdateAt] = GETDATE()
    WHERE [WorkItemHistoryId] IN (SELECT [WorkItemHistoryId] FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkItemHistory] ENABLE TRIGGER [trg_WorkItemHistory_Update]
GO
/****** Object:  Trigger [dbo].[trg_WorkitemsComments_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     TRIGGER [dbo].[trg_WorkitemsComments_Insert]
ON [dbo].[WorkitemsComments]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[WorkitemsComments]
    SET CreatedAt = GETDATE()
    WHERE WorkItemCommentId IN (SELECT WorkItemCommentId FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkitemsComments] ENABLE TRIGGER [trg_WorkitemsComments_Insert]
GO
/****** Object:  Trigger [dbo].[trg_WorkitemsComments_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     TRIGGER [dbo].[trg_WorkitemsComments_Update]
ON [dbo].[WorkitemsComments]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[WorkitemsComments]
    SET [UpdateAt] = GETDATE()
    WHERE WorkItemCommentId IN (SELECT WorkItemCommentId FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkitemsComments] ENABLE TRIGGER [trg_WorkitemsComments_Update]
GO
/****** Object:  Trigger [dbo].[TR_WorkItemState_InsertRows]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TRIGGER [dbo].[TR_WorkItemState_InsertRows]
ON [WorkSpaceDb].[dbo].[WorkItemState]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE(ProjectStatusId)
    BEGIN
		IF((SELECT(I.[ProjectStatusId])FROM INSERTED AS I) <> (SELECT(D.[ProjectStatusId])FROM DELETED AS D))
		BEGIN
			INSERT INTO [WorkSpaceDb].[dbo].[WorkItemHistory] ([ProjectWorkId], [Field], [EmployeeId], [OldValue], [NewValue])
			SELECT
				I.[ProjectWorkId],
				'Work Flow Step',
				I.[EmployeeId],
				D.[ProjectStatusId],
				I.[ProjectStatusId]
			FROM INSERTED AS I
			INNER JOIN DELETED AS D ON I.[WorkItemStateId] = D.[WorkItemStateId]
			WHERE I.[ProjectStatusId] <> D.[ProjectStatusId];
		END
    END
END
GO
ALTER TABLE [dbo].[WorkItemState] ENABLE TRIGGER [TR_WorkItemState_InsertRows]
GO
/****** Object:  Trigger [dbo].[trg_WorkItemState_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   TRIGGER [dbo].[trg_WorkItemState_Insert]
ON [dbo].[WorkItemState]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[WorkItemState]
    SET CreatedAt = GETDATE()
    WHERE [WorkItemStateId] IN (SELECT [WorkItemStateId] FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkItemState] ENABLE TRIGGER [trg_WorkItemState_Insert]
GO
/****** Object:  Trigger [dbo].[trg_WorkItemState_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   TRIGGER [dbo].[trg_WorkItemState_Update]
ON [dbo].[WorkItemState]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[WorkItemState]
    SET [UpdateAt] = GETDATE()
    WHERE [WorkItemStateId] IN (SELECT [WorkItemStateId] FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkItemState] ENABLE TRIGGER [trg_WorkItemState_Update]
GO
/****** Object:  Trigger [dbo].[trg_WorkLog_Insert]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting CreatedAt column on INSERT
CREATE   TRIGGER [dbo].[trg_WorkLog_Insert]
ON [dbo].[WorkLog]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[WorkLog]
    SET CreatedAt = GETDATE()
    WHERE WorkLogId IN (SELECT WorkLogId FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkLog] ENABLE TRIGGER [trg_WorkLog_Insert]
GO
/****** Object:  Trigger [dbo].[trg_WorkLog_Update]    Script Date: 03-11-2023 10:37:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create trigger for setting UpdatedAt column on UPDATE
CREATE   TRIGGER [dbo].[trg_WorkLog_Update]
ON [dbo].[WorkLog]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE [WorkSpaceDb].[dbo].[WorkLog]
    SET [UpdateAt] = GETDATE()
    WHERE WorkLogId IN (SELECT WorkLogId FROM inserted)
END
GO
ALTER TABLE [dbo].[WorkLog] ENABLE TRIGGER [trg_WorkLog_Update]
GO
USE [master]
GO
ALTER DATABASE [WorkSpaceDb] SET  READ_WRITE 
GO
