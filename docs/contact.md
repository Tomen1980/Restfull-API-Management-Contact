# Contact Api Spec

## Create Contact Api
Endpoint : POST /api/contacts

Headers : 
- Authorization : token

Request Body : 
```json
{
    "first_name":"agung",
    "last_name":"jumantoro",
    "email":"wanoroseto128@gmail.com",
    "phone":"087772873951"
}
```
Response Body Success : 
```json
{
    "data":{
        "id" : 1,
        "first_name":"agung",
        "last_name":"jumantoro",
        "email":"wanoroseto128@gmail.com",
        "phone":"087772873951"
        },
    
}
```

Response Body Errors : 
```json
{
    "errors":"email is not valid format"
    
}
```
## Update Contact Api
Endpoint : PUT /api/contacts/:id

Headers : 
- Authorization : token

Request Body : 
```json
{
        "first_name":"agung",
        "last_name":"jumantoro",
        "email":"wanoroseto128@gmail.com",
        "phone":"087772873951"
}
```
Response Body Success : 
```json
{
     "data":{
        "id" : 1,
        "first_name":"agung",
        "last_name":"jumantoro",
        "email":"wanoroseto128@gmail.com",
        "phone":"087772873951"
        },
}
```

Response Body Errors : 
```json
{
    "errors":"email is not valid format"
    
}
```
## Get Contact Api
Endpoint : GET /api/contacts/:id

Headers : 
- Authorization : token


Response Body Success : 
```json
{
     "data":{
        "id" : 1,
        "first_name":"agung",
        "last_name":"jumantoro",
        "email":"wanoroseto128@gmail.com",
        "phone":"087772873951"
        },
    
}
```

Response Body Errors : 
```json
{
    "errors":"Contact is not found"
    
}
```
## Search Contact Api
Endpoint : GET /api/contacts

Headers : 
- Authorization : token

Query Params :
- name : search by first_name or last_name, using like query, optional
- email : search by email, using like query, optional
- phone : search by phone, using like query, optional
- page : number of page, default 1 
- size : size per page, default 10

Response Body Success : 
```json
{
    "data":[
        {
        "id" : 1,
        "first_name":"agung",
        "last_name":"jumantoro",
        "email":"wanoroseto128@gmail.com",
        "phone":"087772873951"
        },
        {
        "id" : 2,
        "first_name":"agung",
        "last_name":"jumantoro",
        "email":"wanoroseto128@gmail.com",
        "phone":"087772873951"
        },
        {
        "id" : 3,
        "first_name":"agung",
        "last_name":"jumantoro",
        "email":"wanoroseto128@gmail.com",
        "phone":"087772873951"
        },
    ],
    "paging" : {
        "page" : 1,
        "total_page": 3,
        "total_item":30
    }
    
}
```

Response Body Errors : 
```json
{
    "errors":"username already registred"
    
}
```
## Remove Contact Api
Endpoint : DELETE /api/contacts

Headers : 
- Authorization : token

Response Body Success : 
```json
{
    "data":"oke"
    
}
```

Response Body Errors : 
```json
{
    "errors":"Contact is not found"
    
}
```