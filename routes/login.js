var passport = require('passport');

module.exports = function(app){ 
	app.post('/login', function(req, res){
        console.log(req.body.username);
		console.log("Executado o barra teste na porta q o cara usa!");
		res.send("Olá, sua url foi executada! Ok.");
    });

    app.get('/login/facebook', passport.authenticate('facebook'));
    
    app.get('/login/facebook/return', 
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });
    
    app.get('/profile', (req, res)=>{
      console.log(req.user);
      res.send("Rodou...");
    });
    
    app.get('/paginaFechada', (req, res)=>{
        if(req.isAuthenticated()){
            console.log(req.user);
            res.send("Rodou...");
        } else {
            res.status(401).json("Página não autorizada!");
        }
    });
}