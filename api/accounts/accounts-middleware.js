const { getById, getByName } = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  console.log(typeof req.body.name, typeof req.body.budget)
  if (typeof req.body.name === 'undefined'|| typeof req.body.budget === "undefined") {
    res.status(400).json({ message: "name and budget are required" })
  }
  else if (`${typeof req.body.name}` !== "string") {
    res.status(400).json({ message: "name of account must be a string" })
  }
  else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  }
  else if (`${typeof req.body.budget}` !== "number") {
    res.status(400).json({ message: "budget of account must be a number" })
  }
  else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else { next() }
}

exports.checkAccountNameUnique = (req, res, next) => {
  getByName(req.body.name.trim()).then(acc => {
    console.log("acc:", acc)
    if (acc) {
      res.status(400).json({ message: "that name is taken" })
    } else {
      next()
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
