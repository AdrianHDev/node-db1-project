const router = require('express').Router()
const { checkAccountId } = require('./accounts-middleware');
const Accounts = require("./accounts-model")

router.get('/', (req, res, next) => {
  console.log("Getting all...");
    Accounts.getAll().then(accs => {
      res.json(accs)
    })
})

router.get('/:id',checkAccountId, (req, res, next) => {
  Accounts.getById(req.params.id).then(acc => {
    res.json(acc)
  })
})


router.post('/', (req, res, next) => {
  req.body.name = req.body.name.trim();
  Accounts.create(req.body).then(acc => {
    res.statusCode(201).json(acc)
  })
})

router.put('/:id',checkAccountId, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body).then(updated => {
    res.json(updated)
  })
});

router.delete('/:id',checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id).then(deleted => {
    res.json(deleted)
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
