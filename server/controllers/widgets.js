const mongoose = require('mongoose'),
    Restaurant = mongoose.model('Restaurant')
    Review = mongoose.model('Review')

module.exports = {
    index: function(req,res) {
        Restaurant.find({},function(err,restaurants) {
            if (err) {
                res.json({'status':500,'errors':err})
            }
            else {
                res.json({'status':200,'restaurants':restaurants});
            }
        })
    },
    add_widget: function(req,res) {

        var restaurant = new Restaurant({
            name:req.body.name,
            cuisine:req.body.cuisine
            })
        restaurant.save(function(err,restaurant){
            if (err) {
                res.json({'status':500,'errors':err})
            }
            else {
                res.json({'status':200,'restaurant':restaurant});
            }
        })
    },
     update_widget: function(req,res) {
        Restaurant.update({_id:req.params.id},{$set: 
            {
                name:req.body.name,
                cuisine:req.body.cuisine
            },
        },
        {runValidators: true},
        function(err){
            if (err) {
                res.json({'status':500,'errors':err})
            }
            else {
                res.json({'status':200,'restaurant':'Restaurant was updated'});
            }
        })
    },
     delete_widget: function(req,res) {
        Restaurant.deleteOne({_id:req.params.id},function(err) {
            if (err) {
                res.json({'status':500,'errors':err})
            }
            else {
                res.json({'status':200,'restaurant':'Restaurant was deleted'});
            }
        })
    },
    find_widget: function(req,res) {
        Restaurant.findById(req.params.id,function(err,restaurant) {
            if (err) {
                res.json({'status':500,'errors':err})
            }
            else {
                res.json({'status':200,'restaurant':restaurant});
            }
        })
    },
    add_review: function(req,res) {
        Restaurant.findById(req.params.id,function(err,restaurant) {
            if (err) {
                res.json({'status':500,'errors':err})
            }
            else {
                var new_review = new Review({
                    username:req.body.username,
                    review:req.body.review,
                    rating:req.body.rating
                })
                new_review.save(
                    function(err) {
                        if (err) {
                            res.json({'status':500,'errors':err})
                        }
                        else {
                            restaurant.reviews.push(new_review)
                            restaurant.save(function(err) {
                                if (err) {
                                    res.json({'status':500,'errors':err}) 
                                }
                                else {
                                    res.json({'status':200,'restaurants':'Added review to restaurant'})
                                }
                            })
                        }
                    }
                )
            }
        })
       
    },
}
