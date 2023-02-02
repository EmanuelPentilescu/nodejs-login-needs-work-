const express= require('express');
const { authPlugins } = require('mysql2');

const router= express.Router();

const pageController= require('../controllers/pagesController');
router.get('/', pageController.getHome);

router.get('/register', pageController.getRegister);

router.get('/login', pageController.getLogin);

router.post('/login', pageController.postLogin);
module.exports=router;