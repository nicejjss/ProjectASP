DROP TABLE IF EXISTS [dbo].[Roles];
GO
CREATE TABLE [dbo].[Roles]
(
	[ID] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(100) NOT NULL, 
    [Desciption] NVARCHAR(500) NULL 
)