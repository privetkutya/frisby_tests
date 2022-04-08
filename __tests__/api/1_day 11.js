//monitoring(watering plants)

const frisby = require("frisby");
const Joi = frisby.Joi;

describe("Day 11: watering plants", () => {

    it("Watering the plant", () => {
      return frisby.get("https://water-ttl.herokuapp.com/hygrometer")
        .expect("status", 200)
        .then(result => {
          const body = result.json;
          const moistureLevel = body.level; 
          if (moistureLevel > '98') {
			console.log(`Soil is wet, we don't need to water yet.\n Moisture level now is ${moistureLevel}`)
        	}
          if (moistureLevel <= '98') {
			return frisby.post("https://water-ttl.herokuapp.com/water")
        	.expect("status", 200)
        	.then(result => {
        		console.log(moistureLevel)
        		const body2 = result.json;
        		expect(body2.success).toBe(true)
        		console.log("We watered the plant!")
        		return frisby.get("https://water-ttl.herokuapp.com/hygrometer")
        		.then(result => {
        			const moistureLevel2 = result.json.level;
        			console.log("Moisture after watering is " + moistureLevel2)
        			expect(moistureLevel2).toBeGreaterThan(99)
        			})
        		})
			}
        })
    })
})


// get https://water-ttl.herokuapp.com/hygrometer
// pm.test("Status code is 200", function () {
//     pm.response.to.have.status(200);
// });

// var moistureLevel = JSON.parse(responseBody).level;
// console.log(moistureLevel)
// if (moistureLevel >= 0.60) {
// postman.setNextRequest(null)
// }

// post https://water-ttl.herokuapp.com/water
// pm.test("Plant was watered successfully", function () {
//     var jsonData = pm.response.json();
//     pm.expect(jsonData.success).to.eql(true);
// });