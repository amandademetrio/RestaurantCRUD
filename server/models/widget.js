const mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true,'User name field is required'],
        minlength: [3,'User name must have at least 3 characters']
    },
    review: {
        type:String,
        required: [true,'Review restaurant field is required'],
        minlength: [10,'Review must have at least 10 characters']
    },
    rating: {
        type:Number,
        default: 5
    }
}, {timestamps: true});

var RestaurantSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,'Restaurant field is required'],
        minlength: [3,'Restaurant must have at least 3 characters'],
        unique: [true,'Restaurant name must be new']
    },
    cuisine: {
        type:String,
        required: [true,'Cuisine field is required'],
        minlength: [3,'Cuisine must have at least 3 characters']
    },
    avg_rating: {
        type:Number,
        default: 0
    },
    deletable: {
        type:Boolean,
        default: false
    },
    showEditPanel: {
        type:Boolean,
        default: false
    },
    reviews:[ReviewSchema]
}, {timestamps: true});

mongoose.model('Review',ReviewSchema);
mongoose.model('Restaurant',RestaurantSchema);