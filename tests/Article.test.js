const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config({ path: '.env' });


let articleId



describe("POST /api/create-article", () => {
    it("should create a new Article", async () => {
        const res = await request(app).post("/api/create-article").send({
            title: "test",
            body: 'this return body of the content',
            slug: "slug-test",
            imageUrl: "this return image of the app",
        });
        articleId = res._body.savedArticle._id
        const resBody = res._body.savedArticle
        expect(res.statusCode).toBe(201);
        expect(resBody.title).toBe('test')
    });
});

describe("GET /api/articles", () => {
    it("should return all Articles", async () => {
        const res = await request(app).get("/api/articles");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/specific-article/:id", () => {
    it("should return a specify Article", async () => {
        const res = await request(app).get(
            `/api/specific-article/${articleId}`
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("PUT /api/update-article/:id", () => {
    it("should update a Article", async () => {
        const res = await request(app)
            .put(`/api/update-article/${articleId}`)
            .send({
                title: "test",
                body: 'this return body of the content',
                slug: "slug-test",
                imageUrl: "this return image of the app"
            });
        expect(res.statusCode).toBe(201);
    });
});

describe("DELETE /api/delete-article/:id", () => {
    it("should delete an article", async () => {
        const res = await request(app).delete(
            `/api/delete-article/${articleId}`
        );
        expect(res.statusCode).toBe(200);
    });
});


beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});