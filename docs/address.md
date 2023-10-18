# Address Api Spec

## Create address Api
Endpoint : POST /api/contacts/:contactId/addresses

Headers : 
- Authorization : token

Request Body : 
```json
{
    "street":"agung",
    "city":"jumantoro",
    "province":"wanoroseto128@gmail.com",
    "country":"087772873951",
    "postal_code":"kodepos",
}
```
Response Body Success : 
```json
{
    "data":{
        "id" : 1,
         "street":"agung",
         "city":"jumantoro",
        "province":"wanoroseto128@gmail.com",
         "country":"087772873951",
         "postal_code":"kodepos",
        },
    
}
```

Response Body Errors : 
```json
{
    "errors":"Country is required"
    
}
```
## Update address Api
Endpoint : PUT /api/contact/:contactId/adresses/:addressId

Headers : 
- Authorization : token

Request Body : 
```json
{
        "street":"agung",
        "city":"jumantoro",
        "province":"wanoroseto128@gmail.com",
        "country":"087772873951",
        "postal_code":"kodepos",
}
```
Response Body Success : 
```json
{
     "data":{
        "id" : 1,
        "street":"agung",
         "city":"jumantoro",
        "province":"wanoroseto128@gmail.com",
         "country":"087772873951",
         "postal_code":"kodepos",
        },
}
```

Response Body Errors : 
```json
{
    "errors":"Country is required"
    
}
```
## Get address Api
Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers : 
- Authorization : token


Response Body Success : 
```json
{
     "data":{
        "id" : 1,
          "street":"agung",
         "city":"jumantoro",
        "province":"wanoroseto128@gmail.com",
         "country":"087772873951",
         "postal_code":"kodepos",
        },
    
}
```

Response Body Errors : 
```json
{
    "errors":"contact is not found"
    
}
```
## List address Api
Endpoint : GET /api/contacts/:contactId/addresses 

Headers : 
- Authorization : token


Response Body Success : 
```json
{
    "data":[
        {
        "id" : 1,
           "street":"agung",
         "city":"jumantoro",
        "province":"wanoroseto128@gmail.com",
         "country":"087772873951",
         "postal_code":"kodepos",
        },
        {
        "id" : 2,
           "street":"agung",
         "city":"jumantoro",
        "province":"wanoroseto128@gmail.com",
         "country":"087772873951",
         "postal_code":"kodepos",
        },
        {
        "id" : 3,
          "street":"agung",
         "city":"jumantoro",
        "province":"wanoroseto128@gmail.com",
         "country":"087772873951",
         "postal_code":"kodepos",
        },
    ]
    
}
```

Response Body Errors : 
```json
{
    "errors":"contact is not found"
    
}
```
## Remove address Api
Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
    "errors":"address is not found"
    
}
```