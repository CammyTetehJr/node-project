const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const doc = '/vestigingen2020.xml';
const fs = require('fs');



const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
	it("welcomes user to the api", done =>
	{
		chai
		.request(app)
		.get("/")
		.end((err,res) => {
			expect(res).to.have.status(200);
			expect(res.body.status).to.equals("success");
			expect(res.body.message).to.equals("Welcome To vestigingen2020 API");
			done();
		});
	});
});

describe("GET Query Request", () => {
	it("gets data back in json format", done =>
	{
		chai
		.request(app)
		.get("/query")
		.end((err,res) => {
			expect(res).to.have.status(200);
			expect(res.type).to.equals('application/json');
			done();
		});
	});
});

describe("POST Updated XML", () => {
	it("posts an XML file to server"), done =>
	{
		fs.readFile(doc, function (err, data) {
            var xml = data;
            it("receives XML document", done =>
	{
		chai
		.request(app)
		.post("/receive-xml")
		.set('content-type', 'xml')
		.send(doc)
		.end((err,res,req) => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body.status).to.equals('success');
			done();
		});
	});
           
        });
        done();
	};
	 
	
});

