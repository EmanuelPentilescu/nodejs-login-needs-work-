exports.getHome=((req, res) =>{
    res.render('index');
});

exports.getRegister=((req, res) =>{
    res.render('register')
});

exports.getLogin= ((req, res) =>{
    res.render('login');
});

exports.postLogin=((req,res)=>{
    res.redirect('/');
})