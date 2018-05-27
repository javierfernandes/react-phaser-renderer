import fs from 'fs'
import mock from 'xhr-mock'

const mockImage = name => {
  mock.get(`assets/${name}.png`, (req, res) => {
    const bitmap = fs.readFileSync(`${__dirname}/../../__test__/assets/${name}.png`, 'base64')
    const string = `data:image/png;base64,${bitmap}`
    res.header('Content-type', 'image/png')      
    return res.status(200).body(string)
  })
}

export default mockImage