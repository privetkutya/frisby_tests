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
                    // console.log(result.json.args)
                    // console.log(result.json.args[' ' + region])
                    // console.log(boba)
                if (result.json.args[' ' + region] != boba){
                    notFound = true
                }
            })
        }
        expect(notFound).toBe(false)
    })
})

// const response = frisby.get(`https://postman-echo.com/get? ${region}=${boba}`)
//          console.log(response.body)
//          if (response.json.args[region] === '83'){
//              console.log('exit')
//              return

// for(let i=1; i<rows.length; i++){
        //  const values = rows[i].split(',')
        //  const region = values[0]
        //  const boba = values[1]
        //  frisby.get(`https://postman-echo.com/get? ${region}=${boba}`)
        //  .expect("status", 200)
        //  .then(result => {
        //          if (result.json.args[region] === '83'){
        //          a = true
        //      }
     //     }).
        // }
        // console.log(a)
        // return expect(a).toBe(true)