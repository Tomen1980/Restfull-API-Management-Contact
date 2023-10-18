import supertest from "supertest"
import { removeTestUser,createTestUser, removeAllContacts, createTestContact, getTestContact, createTestManyContacts } from "../test-util.js"
import {web} from "../application/web.js"
import { logger } from "../application/logging.js"


describe("POST /api/contacts",function(){
  beforeEach(async()=>{
    await createTestUser()
  })

  afterEach(async()=>{
    await removeAllContacts()
    await removeTestUser()
  })
    it("should can create new contact", async()=>{
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization","test")
            .send({
                first_name : "test",
                last_name : "test",
                email : "test@gmail.com",
                phone: "0800000"
            })

            expect(result.status).toBe(200)
            expect(result.body.data.id).toBeDefined()
            expect(result.body.data.first_name).toBe("test")
            expect(result.body.data.last_name).toBe("test")
            expect(result.body.data.email).toBe("test@gmail.com")
            expect(result.body.data.phone).toBe("0800000")
        
    } )
    
    it("should can reject if request is valid", async()=>{
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization","test")
            .send({
                first_name : "",
                last_name : "test",
                email : "testgmail",
                phone: "08000000000000000000000000000000000000000"
            })

            expect(result.status).toBe(400)
            expect(result.body.errors).toBeDefined()
    } )
})

describe("GET /api/contacts/:contactId",function(){
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
  })

  afterEach(async()=>{
    await removeAllContacts()
    await removeTestUser()
  })

  it("should can get contact", async()=>{
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/"+testContact.id)
      .set("Authorization","test")
    
      expect(result.status).toBe(200)
      expect(result.body.data.id).toBe(testContact.id)
      expect(result.body.data.first_name).toBe(testContact.first_name)
      expect(result.body.data.last_name).toBe(testContact.last_name)
      expect(result.body.data.email).toBe(testContact.email)
      expect(result.body.data.phone).toBe(testContact.phone)

  })
  
  it("should return 404 if contact id is not found", async()=>{
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/"+(testContact.id+1))
      .set("Authorization","test")
    
      expect(result.status).toBe(404)

  })
})

describe('PUT /api/contacts/:contactId', function() { 
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
  })

  afterEach(async()=>{
    await removeAllContacts()
    await removeTestUser()
  })

  it("Should can update existing contact", async()=>{
    const testContact = await getTestContact()
    const result = await supertest(web)
      .put("/api/contacts/"+testContact.id)
      .set("Authorization","test")
      .send({
        first_name:"Agung",
        last_name:"Juman",
        email:"agung@gmail.com",
        phone:"098821721312312"
      }) 
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBe(testContact.id)
    expect(result.body.data.first_name).toBe("Agung")
    expect(result.body.data.last_name).toBe("Juman")
    expect(result.body.data.email).toBe("agung@gmail.com")
    expect(result.body.data.phone).toBe("098821721312312")
  })

  it("Should reject if request invalid", async()=>{
    const testContact = await getTestContact()
    const result = await supertest(web)
      .put("/api/contacts/"+testContact.id)
      .set("Authorization","test")
      .send({
        first_name:"",
        last_name:"Juman",
        email:"agunggmail.com",
        phone:"098821231231231323122311231321721312312"
      }) 
    expect(result.status).toBe(400)
  })
  
  it("Should reject if contact is not found", async()=>{
    const testContact = await getTestContact()
    const result = await supertest(web)
      .put("/api/contacts/"+testContact.id+1)
      .set("Authorization","test")
      .send({
        first_name:"Agung",
        last_name:"Juman",
        email:"agung@gmail.com",
        phone:"098821721312312"
      }) 
    expect(result.status).toBe(404)
  })
 })


 describe("GET /api/contacts",function(){
  beforeEach(async()=>{
    await createTestUser()
    await createTestManyContacts()
  })

  afterEach(async()=>{
    await removeAllContacts()
    await removeTestUser()
  })

  it("Should can search without parameter",async()=>{
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization","test")
    
      logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(10)
    expect(result.body.paging.page).toBe(1)
    expect(result.body.paging.total_page).toBe(2)
    expect(result.body.paging.total_item).toBe(15)
  })
 
  it("Should can search to page 2",async()=>{
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        page : 2
      })
      .set("Authorization","test")
    
      logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(5)
    expect(result.body.paging.page).toBe(2)
    expect(result.body.paging.total_page).toBe(2)
    expect(result.body.paging.total_item).toBe(15)
  })
 
  it("Should can search using name",async()=>{
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        name : "test 1"
      })
      .set("Authorization","test")
    
      logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(6)
    expect(result.body.paging.page).toBe(1)
    expect(result.body.paging.total_page).toBe(1)
    expect(result.body.paging.total_item).toBe(6)
  })
  
  it("Should can search using email",async()=>{
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        email : "test1"
      })
      .set("Authorization","test")
    
      logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(6)
    expect(result.body.paging.page).toBe(1)
    expect(result.body.paging.total_page).toBe(1)
    expect(result.body.paging.total_item).toBe(6)
  })
  
  it("Should can search using email",async()=>{
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        phone : "0877777777771"
      })
      .set("Authorization","test")
    
      logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(6)
    expect(result.body.paging.page).toBe(1)
    expect(result.body.paging.total_page).toBe(1)
    expect(result.body.paging.total_item).toBe(6)
  })
 })


 describe("DELETE /api/contacts/:contactId",function(){
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
  })

  afterEach(async()=>{
    await removeAllContacts()
    await removeTestUser()
  })
    it("should can delete contact",async()=>{
      let testContact = await getTestContact()
      const result = await supertest(web)
        .delete("/api/contacts/"+testContact.id)  
        .set("Authorization","test")

      expect(result.status).toBe(200);
      expect(result.body.data).toBe("oke");

      testContact = await getTestContact()
      expect(testContact).toBeNull()
    })
   
    it("should reject if contact is not found",async()=>{
      let testContact = await getTestContact()
      const result = await supertest(web)
        .delete("/api/contacts/"+(testContact.id+1))  
        .set("Authorization","test")

      expect(result.status).toBe(404);
    })
 })

