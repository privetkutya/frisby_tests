const frisby = require("frisby");
const fs = require('fs')
const Joi = frisby.Joi;
const formData = frisby.formData()
  
describe("Day 23: Boba, upload file", () => {

    jest.setTimeout(30000);

    it("Boba file", async () => {
        const fileData = fs.readFileSync('./geoMap.csv', 'utf8')
        const rows = fileData.split('\n') //разделили строку в массив по переводу строки

        var notFound = false

        for(let i=1; i<rows.length; i++){
            const values = rows[i].split(',')
            const region = values[0]
            const boba = values[1]
            console.log(`sending ${i}`)
            await frisby.get(`https://postman-echo.com/get? ${region}=${boba}`)
                .expect("status", 200)
                .then(result => {
                if (result.json.args[' ' + region] != boba){
                    notFound = true
                }
            })
        }
        expect(notFound).toBe(false)
    })
})
