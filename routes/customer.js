var express = require('express');
var router = express.Router();
const Controller = require('../controller/customer')
//customer routes

router.post('/',Controller.create)
router.get('/:id',Controller.get)
router.post('/login',Controller.login)
router.put('/:id',Controller.update)
router.delete('/:id',Controller.delete)


module.exports = router;
