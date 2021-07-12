const { getById, getByName } = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  if (!req.body.name === undefined || !req.body.budget === undefined) {
    res.status(400).json({ message: "name and budget are required" })
  }
  else if (!typeof req.body.name === String) {
    res.status(400).json({ message: "name of account must be a string" })
  }
  else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }
  else if (!typeof req.body.budget === Number) {
    res.status(400).json({ message: "budget of account must be a number" })
  }
  else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  getByName(req.body.name).then(acc => {
    if (!acc) {
      next()
    } else {
      res.status(400).json({ message: "that name is taken" })
    }
  })
}

exports.checkAccountId = (req, res, next) => {
  getById(req.params.id).then(acc => {
    if (acc) {
      next()
    }
    else {
      res.status(404).json({ message: "account not found" })
    }
  }).catch(err => {
    res.status(500).json({ message: "internal server error." });
  })
}
