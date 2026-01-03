// const request = require('supertest');
// const {app , server} = require('../server');
// const  mongoose = require('mongoose');

// describe('TASK API',() => {
//     let taskId ;

//     it("should create a task (POST /api/tasks)" , async() => {
//         const res = await request(app)
//         .post('/api/tasks')
//         .send({title : "testing"})

//          expect(res.statusCode).toBe(201);
//         expect(res.body).toHaveProperty('_id');

//         taskId = res.body._id;
//     });

//     it("should get a task (get /api/task)" , async() => {
//         const res = await request(app)
//         .get('/api/tasks')

//         expect(res.statusCode).toBe(200);
//         expect(Array.isArray(res.body)).toBe(true);

//     })

//     it('should update a task (put /api/task)',async() => {
//         const res = await request(app)
//         .put(`/api/tasks/${taskId}`)
//         .send({title : "update testing"})

//         expect(res.statusCode).toBe(200)
//         expect(res.body.title).toBe('update testing')

//     })

//     it("should delete a task (delete /api/task)" , async() => {
//         const res = await request(app)
//         .delete(`/api/tasks/${taskId}`)

//         expect(res.statusCode).toBe(200)

//     })

// })

// afterAll(async () => {
//     await mongoose.connection.close();
//     await new Promise(resolve => server.close(resolve))
// })



const request = require("supertest");
const { app, server } = require("../server");
const mongoose = require("mongoose");

describe("TASK API", () => {
  let TaskId;

  it("Post api return 201 OK", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Testing for Post Api" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");

    TaskId = res.body._id;
  });

  it("Get api return 200 OK", async () => {
    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);
  });

  it("Put api return 200 OK", async () => {
    const res = await request(app)
      .put(`/api/tasks/${TaskId}`)
      .send({ title: "Testing Update...." });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Testing Update....");
  });

  it("Delete api return 200 OK", async () => {
    const res = await request(app).delete(`/api/tasks/${TaskId}`);

    expect(res.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await new Promise((reslove) => server.close(reslove));
});
