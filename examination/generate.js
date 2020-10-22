const axios = require('axios')
const _ = require('lodash')
const fs = require('fs')
console.log('Starting...')
const http = require('http')
const home = require('os').homedir()

const download = function(url, dest, filename, cb) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }
  const file = fs.createWriteStream(dest + '/' + filename + '.pdf')
  http
    .get(url, function(response) {
      response.pipe(file)
      file.on('finish', function() {
        file.close(cb)
      })
    })
    .on('error', function(err) {
      // Handle errors
      fs.unlink(dest) // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message)
    })
}
let subject = [
  { id: '340151', name: 'Electrical Materials' },
  { id: '340152', name: 'Electrical Measuring Instruments' },
  { id: '341151', name: 'Electric Circuits I' },
  { id: '341152', name: 'Electric Circuits II' },
  { id: '353152', name: 'Electronic Circuit I' },
  { id: '353153', name: 'Electronic Circuit II' },
  { id: '353155', name: 'Communication Technology' },
  { id: '353156', name: 'Microprocessor' },
  { id: '392131', name: 'Physic I' },
  { id: '392132', name: 'Physic II' },
  { id: '392133', name: 'Physic III' },
  { id: '392134', name: 'Physic IV' },
  { id: '392135', name: 'Physic V' },
  { id: '392136', name: 'Physic VI' },
  { id: '392151', name: 'Chemistry I' },
  { id: '392152', name: 'Chemistry II' },
  { id: '392153', name: 'Chemistry III' },
  { id: '392154', name: 'Chemistry IV' },
  { id: '392155', name: 'Chemistry V' },
  { id: '392156', name: 'Chemistry VI' },
  { id: '393141', name: 'English I' },
  { id: '393142', name: 'English II' },
  { id: '393143', name: 'English III' },
  { id: '393144', name: 'English IV' },
  { id: '393145', name: 'English V' },
  { id: '393146', name: 'English VI' },
  { id: '393161', name: 'Thai I' },
  { id: '393162', name: 'Thai II' },
  { id: '393163', name: 'Thai III' },
  { id: '394171', name: 'Mathematics I' },
  { id: '394172', name: 'Mathematics II' },
  { id: '394173', name: 'Mathematics III' },
  { id: '394174', name: 'Mathematics IV' },
  { id: '394175', name: 'Mathematics V' },
  { id: '394176', name: 'Mathematics VI' },
  { id: '395181', name: 'Social Study I' },
  { id: '395182', name: 'Social Study II' },
  { id: '395183', name: 'Social Study III' },
  { id: '396121', name: 'Physical Education' }
]

function isExists(name) {
  const subjectIdName = process.argv[2]
  subject = [{ id: String(subjectIdName), name: 'Physic IV' }]

  return _.find(subject, {
    id: name.replace(/\D/g, '').replace(' ', '')
  })
}
function getFileName(name) {
  let result = _.find(subject, {
    id: name
  })
  if (result) {
    return result.name
  } else {
    return name
  }
}

const resultItem = []

const convertToArray = file => {
  if (file.type === 'folder') {
    file.items.map(a => {
      convertToArray(a)
    })
  } else {
    // implement file examination
    let year = 'Unknown'
    let fileName = 'Unknown'
    if (file.name != null) {
      year = file.path.split('/')[1]
      fileName = `${getFileName(file.name.replace('.pdf', ''))} (${year}) `

      let isTerm1 = file.path.indexOf('term1') > -1 ? true : false
      let isFinal = file.path.indexOf('midterm') > -1 ? true : false

      if (isExists(file.name) && !isTerm1 && !isFinal) {
        resultItem.push({
          ...file,
          fileName
        })
      }
    }
  }
}

if (process.argv.length === 2) {
  return console.warn('node generate.js [subject-id] [path]')
}

return axios.default
  .get('http://cit.kmutnb.ac.th/examination/scan.php')
  .then(async ({ data }) => {
    await convertToArray(data)
    resultItem.map((item, index) => {
      console.log('Start download ' + item.fileName)

      download(
        'http://cit.kmutnb.ac.th/examination/' + item.path,
        home + '/Desktop/' + process.argv[3],
        item.fileName,
        () => {
          console.log('Success!')
        }
      )
    })
  })
  .catch(error => {
    console.log('Generate Failed! Error occurs while fetching restful api.')
    console.error(error)
  })

/*
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

*/
