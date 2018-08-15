import models from '../models'

const FileController = {
  postImportCSV: (req, res) => {
    res.sendStatus(200)
    if (!req.files) {
      res.sendStatus(400)
    }

    if (req.files.msProject) {
      const importFile = req.files.msProject
      const csvLineArray = importFile.data.toString('utf8').split('\n')
      console.log(csvLineArray[0].split('\n')[0])
    }
  },
  getExportCSV: (req, res) => {

  },
}

export default FileController
