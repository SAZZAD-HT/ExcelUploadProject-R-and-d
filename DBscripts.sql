---AGL Database Server
---Create a linked server to access the remote server
EXEC sp_addlinkedserver   
    @server = 'AglDatabaseServer',    -- Linked Server Name
    @srvproduct = '',  
    @provider = 'SQLNCLI',        -- SQL Server Native Client
    @datasrc = '192.168.10.4,4368',  -- IP Address and Port
    @catalog = 'HAGLsqlsysdb';  -- Remote Database Name
 --Credentials To Acess  those Servers
 EXEC sp_addlinkedsrvlogin   
    @rmtsrvname = 'AglDatabaseServer',
    @useself = 'false',
    @rmtuser = 'softadmin',   -- Remote SQL Server username
    @rmtpassword = 'w23eW@#E';  -- Remote SQL Server password
--Test Connection
    select * from [AglDatabaseServer].[HAGLsqlsysdb].[dbo].[emp_basic]


---NCL Database Server
--Create a linked server to access the remote server
EXEC sp_addlinkedserver   
    @server = 'NclDatabaseServer',    -- Linked Server Name
    @srvproduct = '',  
    @provider = 'SQLNCLI',        -- SQL Server Native Client
    @datasrc = '192.168.40.100,4368',  -- IP Address and Port
    @catalog = 'HNCLsqlsysdb';  -- Remote Database Name
--Credentials to access those servers
EXEC sp_addlinkedsrvlogin   
    @rmtsrvname = 'NclDatabaseServer',
    @useself = 'false',
    @rmtuser = 'softadmin',   -- Remote SQL Server username
    @rmtpassword = 'w23eW@#E';  -- Remote SQL Server password

--Test Connection
   select * from [NclDatabaseServer].[HNCLsqlsysdb].[dbo].[emp_basic]


---ADL Database Server
--Create a linked server to access the remote server
EXEC sp_addlinkedserver   
    @server = 'AdlDatabaseServer',    -- Linked Server Name
    @srvproduct = '',  
    @provider = 'SQLNCLI',        -- SQL Server Native Client
    @datasrc = '192.168.20.100,4368',  -- IP Address and Port
    @catalog = 'HADLsqlsysdb';  -- Remote Database Name

-- Step 2: Set up login credentials for the linked server
EXEC sp_addlinkedsrvlogin   
    @rmtsrvname = 'AdlDatabaseServer',
    @useself = 'false',
    @rmtuser = 'softadmin',   -- Remote SQL Server username
    @rmtpassword = 'w23eW@#E';
    --Test Connection
    select * from [AdlDatabaseServer].[HADLsqlsysdb].[dbo].[emp_basic]


    EXEC sp_addlinkedserver   
    @server = 'TiswlDatabaseServer',    -- Linked Server Name
    @srvproduct = '',  
    @provider = 'SQLNCLI',        -- SQL Server Native Client
    @datasrc = '192.168.10.3,4368',  -- IP Address and Port
    @catalog = 'HTISWLsqlsysdb';  -- Remote Database Name

-- Step 2: Set up login credentials for the linked server
EXEC sp_addlinkedsrvlogin   
    @rmtsrvname = 'TiswlDatabaseServer',
    @useself = 'false',
    @rmtuser = 'softadmin',   -- Remote SQL Server username
    @rmtpassword = 'w23eW@#E';

    select * from TiswlDatabaseServer.HTISWLsqlsysdb.[dbo].[emp_basic]