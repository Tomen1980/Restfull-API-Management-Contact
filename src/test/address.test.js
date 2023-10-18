import supertest from "supertest"
import { logger } from "../application/logging.js"
import {web} from "../application/web.js"
import { removeTestUser,createTestUser, removeAllContacts, createTestContact, getTestContact, createTestManyContacts, removeAllTestAddresses, createTestAddress, getTestAddress } from "../test-util.js"


describe("POST /api/contacts/:contactId/addresses",function(){
    beforeEach(async()=>{
        await createTestUser()
        await createTestContact()
      })
    
      afterEach(async()=>{
        await removeAllTestAddresses()    
        await removeAllContacts()
        await removeTestUser()
      })

      it("should can create new address",async()=>{
        const testContact = await getTestContact()

        const result = await supertest(web)
                .post(`/api/contacts/${testContact.id}/addresses`)
                .set("Authorization","test")
                .send({
                    street:"jalan test",
                    city : "kota test",
                    province:"provinsi test",
                    country: "indonesia",
                    postal_code:"123455"
                })
     
                expect(result.status).toBe(200)
                expect(result.body.data.id).toBeDefined()
                expect(result.body.data.street).toBe("jalan test")
                expect(result.body.data.city).toBe("kota test")
                expect(result.body.data.province).toBe("provinsi test")
                expect(result.body.data.country).toBe("indonesia")
                expect(result.body.data.postal_code).toBe("123455")
                
      })
      it("should reject if address is invalid",async()=>{
        const testContact = await getTestContact()

        const result = await supertest(web)
                .post(`/api/contacts/${testContact.id}/addresses`)
                .set("Authorization","test")
                .send({
                    street:"jalan test",
                    city : "kota test",
                    province:"provinsi test",
                    country: "",
                    postal_code:""
                })
                expect(result.status).toBe(400)
      })
      it("should reject if contact is not found",async()=>{
        const testContact = await getTestContact()

        const result = await supertest(web)
                .post(`/api/contacts/${testContact.id + 1}/addresses`)
                .set("Authorization","test")
                .send({
                    street:"jalan test",
                    city : "kota test",
                    province:"provinsi test",
                    country: "",
                    postal_code:""
                })
                expect(result.status).toBe(404)
      })
    
})

describe("GET /api/contacts/:contactId/addresses/:addressId",function(){
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
    await createTestAddress()
  })

  afterEach(async()=>{
    await removeAllTestAddresses()    
    await removeAllContacts()
    await removeTestUser()
  })

  it("should can get contact",async()=>{
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization","test")
    
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.street).toBe("jalan test")
    expect(result.body.data.city).toBe("kota test")
    expect(result.body.data.province).toBe("provinsi test")
    expect(result.body.data.country).toBe("indonesia")
    expect(result.body.data.postal_code).toBe("123455")
    
  })
  it("should reject contact if contact is not found",async()=>{
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("Authorization","test")
    
    expect(result.status).toBe(404)
    
  })
  
  it("should reject contact if address is not found",async()=>{
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id+1}`)
      .set("Authorization","test")
    
    expect(result.status).toBe(404)
    
  })

})

describe("PUT /api/contacts/:contactId/addresses/:addressId",function(){
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
    await createTestAddress()
  })

  afterEach(async()=>{
    await removeAllTestAddresses()    
    await removeAllContacts()
    await removeTestUser()
  })

  it("should can update address",async()=>{
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization","test")
      .send({
        street:"street jember",
        city : "kota jember",
        province:"provinsi jember",
        country: "Indonesia",
        postal_code:"11111"
    })

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.street).toBe("street jember")
    expect(result.body.data.city).toBe("kota jember")
    expect(result.body.data.province).toBe("provinsi jember")
    expect(result.body.data.country).toBe("Indonesia")
    expect(result.body.data.postal_code).toBe("11111")
  })
  it("should reject if request is not valid",async()=>{
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization","test")
      .send({
        street:"street",
        city : "kota",
        province:"provinsi",
        country: "",
        postal_code:""
    })

    expect(result.status).toBe(400);
  })
  
  it("should reject if address is not found",async()=>{
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id+1}`)
      .set("Authorization","test")
      .send({
        street:"street",
        city : "kota",
        province:"provinsi",
        country: "Indonesia",
        postal_code:"123123"
    })

    expect(result.status).toBe(404);
  })
  
  it("should reject if contact is not found",async()=>{
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()

    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id+1}/addresses/${testAddress.id}`)
      .set("Authorization","test")
      .send({
        street:"street",
        city : "kota",
        province:"provinsi",
        country: "Indonesia",
        postal_code:"123123"
    })

    expect(result.status).toBe(404);
  })
})

describe("DELETE /api/contacts/:contactId/addresses/:addressId",function(){
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
    await createTestAddress()
  })

  afterEach(async()=>{
    await removeAllTestAddresses()    
    await removeAllContacts()
    await removeTestUser()
  })

  it("should can remove address",async()=>{
    const testContact = await getTestContact()
    let testAddress = await getTestAddress()

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization","test")
    
      expect(result.status).toBe(200);
      expect(result.body.data).toBe("OK");

      testAddress = await getTestAddress()
      expect(testAddress).toBeNull()
  })
 
  it("should reject if address is not found ",async()=>{
    const testContact = await getTestContact()
    let testAddress = await getTestAddress()

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
      .set("Authorization","test")
    
      expect(result.status).toBe(404);
  })
  
  it("should reject if contact is not found ",async()=>{
    const testContact = await getTestContact()
    let testAddress = await getTestAddress()

    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("Authorization","test")
    
      expect(result.status).toBe(404);
  })
})

describe("GET /api/contacts/:contactId/addresses",function(){
  beforeEach(async()=>{
    await createTestUser()
    await createTestContact()
    await createTestAddress()
  })

  afterEach(async()=>{
    await removeAllTestAddresses()    
    await removeAllContacts()
    await removeTestUser()
  })

  it("should can list addresses",async()=>{
    const testContact = await getTestContact()

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization","test")

    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(1);

  })
 
  it("should reject if contact is not found",async()=>{
    const testContact = await getTestContact()

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id+1}/addresses`)
      .set("Authorization","test")

    expect(result.status).toBe(404)

  })
})