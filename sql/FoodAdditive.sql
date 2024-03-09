USE [FoodAdditive]
GO

/****** Object:  Table [dbo].[FoodAdditive]    Script Date: 3/9/2024 12:24:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FoodAdditive](
	[name] [nvarchar](50) NOT NULL,
    [descriptionText] [nvarchar](500) NOT NULL,
    [usage] [nvarchar](200) NOT NULL,
    [type] [nvarchar](200) NOT NULL,
    [keywords] [nvarchar](200) NOT NULL
) ON [PRIMARY]
GO