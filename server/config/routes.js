module.exports = function(app) {

    const restaurant = require('../controllers/widgets.js')

    app.get('/restaurants', function(req,res) {
        restaurant.index(req,res);
    });

    app.post('/restaurants', function(req,res) {
        restaurant.add_widget(req,res);
    });

    app.post('/restaurants/:id', function(req,res) {
        restaurant.add_review(req,res);
    });

    app.put('/restaurants/:id',function(req,res){
        restaurant.update_widget(req,res);
    })

    app.get('/restaurants/:id',function(req,res){
        restaurant.find_widget(req,res);
    })

    app.delete('/restaurants/:id', function(req,res) {
        restaurant.delete_widget(req,res);
    });
}