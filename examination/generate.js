const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');
console.log('Starting...');

const subject = {
  392131: 'Physic I',
  392132: 'Physic II',
  392133: 'Physic III',
  392134: 'Physic IV',
  392135: 'Physic V',
  392136: 'Physic VI',
  392151: 'Chemistry I',
  392152: 'Chemistry II',
  392153: 'Chemistry III',
  392154: 'Chemistry IV',
  392155: 'Chemistry V',
  392156: 'Chemistry VI',
  394171: 'Mathematics I',
  394172: 'Mathematics II',
  394173: 'Mathematics III',
  394174: 'Mathematics IV',
  394175: 'Mathematics V',
  394176: 'Mathematics VI',
  393141: 'English I',
  393142: 'English II',
  393143: 'English III',
  393144: 'English IV',
  393145: 'English V',
  393146: 'English VI',
  393161: 'Thai I',
  393162: 'Thai II',
  393163: 'Thai III',
  395181: 'Social Study I',
  395182: 'Social Study II',
  395183: 'Social Study III',
  396121: 'Physical Education',
  340151: 'Electrical Materials',
  340152: 'Electrical Measuring Instruments',
  341151: 'Electric Circuits I',
  341152: 'Electric Circuits II',
  353152: 'Electronic Circuit I',
  353153: 'Electronic Circuit II',
  353156: 'Microprocessor',
  353155: 'Communication Technology'
};

let files = [];
let filesP1 = {
  midterm: [],
  final: []
};
let filesP2 = {
  midterm: [],
  final: []
};
let fileP3 = {
  midterm: [],
  final: []
};
const convertToArray = file => {
  if (file.type === 'folder') {
    file.items.map(a => {
      convertToArray(a);
    });
  } else {
    // implement file examination
    let year = 'Unknown';
    let fileName = 'Unknown';
    year = file.path.split('/')[1];
    fileName = `${file.name.replace('.pdf', '')} (${year}) `;
    let isTerm1 = file.path.indexOf('term1') > -1 ? true : false;
    let isFinal = file.path.indexOf('midterm') > -1 ? true : false;
    console.log(
      'files: ' +
        fileName +
        `${isFinal ? 'Final' : 'Midterm'} ${isTerm1 ? 'TERM1' : 'TERM2'}`
    );
  }
};
return axios.default
  .get('http://cit.kmutnb.ac.th/examination/scan.php')
  .then(({ data }) => {
    convertToArray(data);
    return fs.writeFile(
      'examination.json',
      JSON.stringify(data),
      'utf8',
      function(err) {
        if (err) {
          console.log(
            'Generate Failed! An error occured while writing JSON Object to File.'
          );
          return console.log(err);
        }
        console.log('Successfully! JSON file has been saved.');
      }
    );
  })
  .catch(error => {
    console.log('Generate Failed! Error occurs while fetching restful api.');
  });

/*

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

*/
