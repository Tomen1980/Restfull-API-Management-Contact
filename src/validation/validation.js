import { ResponseError } from "../error/response-error.js";

const validate = (schema,request)=>{
    const result = schema.validate(request,{
        // digunakan untuk menampilkan logger info pada test
        abortEarly:false,
        // digunakan untuk mengatasi pengisian field yang tdk ada pada validasi sehingga otomatis di reject
        allowUnknown:false
    })
    if(result.error){
        throw new ResponseError(400, result.error.message)
    }else{
        return result.value;
    }
}

export{
    validate
}