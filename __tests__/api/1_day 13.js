const frisby = require("frisby");
const Joi = frisby.Joi;
  
describe("Day 13: planets", () => {

    it("Planets: status 200, types, contain Tatooine", () => {
      return frisby.get("https://swapi.dev/api/planets/")
        .expect("status", 200)
        .expect("jsonTypes", "count", Joi.number())
        .expect("json", "next", "https://swapi.dev/api/planets/?page=2")
        .expect("jsonTypes", "results.*", {
          name: Joi.string(),
          rotation_period: Joi.number(),
          orbital_period: Joi.string(),
          diameter: Joi.string(),
          climate: Joi.string(),
          gravity: Joi.string(),
          terrain: Joi.string(),
          surface_water: Joi.string(),
          population: Joi.string(),
          residents: Joi.array(),
          films: Joi.array(),
          created: Joi.string(),
          edited: Joi.string(),
          url: Joi.string().uri().allow(null)
        }).then(result => {
          const body = result.json;
          const found = body.results.find(result => result.name === 'Tatooine'); 
          return expect(found).not.toBeUndefined();
        });
    });


    it("Species: status 200, types, there are tall species(avg height > 160)", () => {
      return frisby.get("https://swapi.dev/api/species")
        .expect("status", 200)
        .expect("jsonTypes", "count", Joi.number())
        .expect("json", "next", "https://swapi.dev/api/species/?page=2")
        .expect("jsonTypes", "results.*", {
          name: Joi.string(),
          classification: Joi.string(),
          designation: Joi.string(),
          average_height: Joi.string(),
          skin_colors: Joi.string(),
          hair_colors: Joi.string(),
          eye_colors: Joi.string(),
          average_lifespan: Joi.string(),
          homeworld: Joi.string().uri().allow(null),
          language: Joi.string(),
          people: Joi.array(),
          films: Joi.array(),
          created: Joi.string(),
          edited: Joi.string(),
          url: Joi.string().uri().allow(null)
        }).then(result => {
          const body = result.json;
          const found = body.results.find(result => result.average_height > 160); 
          return expect(found).not.toBeUndefined();
        });
    });
});
