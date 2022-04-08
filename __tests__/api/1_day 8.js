//get random, female and french user

const frisby = require("frisby");
const Joi = frisby.Joi;
var url = "https://randomuser.me/api"

describe("Day 8: get random, female and french user", () => {

  	it("get random user", () => {
      return frisby.get(url)
        .expect("status", 200)
        .expect("jsonTypes", "results.*", {
          gender: Joi.string(),
          //rotation_period: Joi.number(),
        })
    	.then(result => {
    		const body = result.json;
    		console.log(result.responseTime)
    		expect(result.responseTime).toBeLessThan(1000)
			})
        })

  	it("get female user", () => {
      return frisby.get(url + "?gender=female")
        .expect("status", 200)
    	.then(result => {
    		const body = (result.json).results[0];
    		expect(result.responseTime).toBeLessThan(1000)
    		expect(body.gender).toBe("female")
    		})
    	})

  	it("get female french user", () => {
      return frisby.get(url + "?gender=female&nat=fr")
        .expect("status", 200)
    	.then(result => {
    		const body = (result.json).results[0];
    		expect(result.responseTime).toBeLessThan(1000)
    		expect(body.nat).toBe("FR")
    		expect(body.gender).toBe("female")
    		})
        })
});