## User API SPEC

## Register User Api 
Endpoint : POST /api/users
Request Body : 
```json
{
    "username":"pzn",
    "password":"rahasia",
    "name":"sandykala"
}
```
Response Body Success : 
```json
{
    "data":{
        "username":"pzn",
        "name":"sandykala"
        },
    
}
```

Response Body Errors : 
```json
{
    "errors":"username already registred"
    
}
```
 
## Login User Api 
Endpoint : POST /api/users/login

Request Body : 
```json
{
    "username":"pzn",
    "password":"rahasia",
}
```
Response Body Success : 
```json
{
    "data":{
        "token":"unique-token"
        },
    
}
```

Response Body Errors : 
```json
{
    "errors":"username or password wrong"
}
```
## Update User Api
Endpoint : PATCH /api/users/current

Headers : 
- Authorization : token

Request Body : 
```json
{
    "name":"sandykala.my.id",//optional
    "username":"pzn",//optional
    "password":"rahasia",//optional
}
```
Response Body Success : 
```json
{
    "data":{
        "name":"sandykala.my.id",//optional
        "username":"pzn",//optional
        },
    
}
```

Response Body Errors : 
```json
{
    "errors":"name length max 100"
}
```
## Get User Api
Endpoint : GET /api/users/current

Headers : 
- Authorization : token

Response Body Success : 
```json
{
    "data" : {
        "name":"sandykala.my.id",
        "username":"pzn",
        "password":"rahasia",
    }
    
}
```

Response Body Errors : 
```json
{
    "errors":"Unauthorized"
}
```
## Logout User Api
Endpoint : DELETE /api/users/logout


Response Body Success : 
```json
{
    "data" : {
        "name":"OK"
    }
    
}
```

Response Body Errors : 
```json
{
    "errors":"Unauthorized"
}
```