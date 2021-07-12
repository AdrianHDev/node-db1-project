const router = require('express').Router()
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');
const Accounts = require("./accounts-model")

router.get('/', (req, res, next) => {
  Accounts.getByName("account-03").then((accs => {
    console.log(accs)
  }))
  console.log("Getting all...");
    Accounts.getAll().then(accs => {
      res.json(accs)
    }).catch(err => {
      res.status(500).json({message: "Internal Server Error."})
    })
})

router.get('/:id',checkAccountId, (req, res, next) => {
  console.log("Getting ",req.params.id)
  Accounts.getById(req.params.id).then(acc => {
    res.json(acc)
  }).catch(err => {
    res.status(500).json({message: "Internal Server Error."})
  })
})


router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  console.log("Posting", req.body)
  req.body.name = req.body.name.trim();
  Accounts.create(req.body).then(acc => {
    res.status(201).json(acc)
  }).catch(err => {
    res.status(500).json({message: "Internal Server Error.", ...err})
  })
})

router.put('/:id',checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  console.log('Putting', req.body,"to", req.paramsid)
  Accounts.updateById(req.params.id, req.body).then(updated => {
    res.json(updated)
  }).catch(err => {
    console.log(err);
    res.status(500).json({message: "Internal Server Error."
  })
  })
});

router.delete('/:id',checkAccountId, (req, res, next) => {
  console.log("Deleting", req.params.id)
  Accounts.deleteById(req.params.id).then(deleted => {
    res.json(deleted)
  }).catch(err => {
    res.status(500).json({message: "Internal Server Error."})
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
