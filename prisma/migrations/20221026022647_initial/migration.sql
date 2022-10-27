BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [cpf] NVARCHAR(1000) NOT NULL,
    [cep] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [users_email_key] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Products] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [filter] NVARCHAR(1000) NOT NULL,
    [price] DECIMAL(32,16) NOT NULL,
    [url_picture] NVARCHAR(1000) NOT NULL,
    [desconto] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Products_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [Products_name_key] UNIQUE ([name])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
