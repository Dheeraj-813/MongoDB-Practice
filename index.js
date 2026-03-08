// Description: Connect to a MongoDB database using Mongoose

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/testdatabase')
.then(() => { console.log('Connected to MongoDB') })
.catch(err => { console.error('Connection error', err) })

// Define a schema.......

const courseSchema = new mongoose.Schema({
    name: String,
    creator : String,
    publishedDate : {type: Date, default: Date.now},
    isPublished : Boolean
})

// Create a model.......

const Course = mongoose.model('Course', courseSchema)

// Create a dataset(documents).......
async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        creator: 'John Doe',
        isPublished: true
    })
// saving dataset to database
    const result = await course.save()
    console.log(result)
}

// calling function...
createCourse()

// getting only courseName on basis of creator name
async function getCourses() {
    const courses = await Course
    .find({creator: 'John Doe'})
    .select({name: 1})
    console.log(courses)
}

// Sorting courses on basis of name in ascending order {name: 1} and in descending order {name: -1}
async function getCourses() {
    const courses = await Course
    .find({creator: 'John Doe'})
    .select({name: 1})
    .sort({name: 1})

    console.log(courses)
}

// Comparison query operators($eq(equal), $ne(not equal), $gt(greater than), $gte(greater than or equal to), $lt(less than), $lte(less than or equal to), $in-> {$in: [3, 4.2]}, $nin(not in))

async function getCourses() {
    const courses = await Course
    .find({rating: {$gte: 4}})
    .select({name: 1})

    console.log(courses)
}

// Logical operators(and, or)

async function getCourses() {
    const courses = await Course
    .find({rating: {$in: [3, 4.2, 4.5, 4.3]}})
    .select({name: 1})
    .or([{name: 'Node.js Course'}, {isPublished: true}])

    console.log(courses)
}

getCourses()

// Update a course.....

async function updateCourse(id) {
    const course = await Course.findById(id)
    if(!course) return;
    course.isPublished = true
    course.creator = 'Jane Doe'

    const result = await course.save()
    console.log(result)
}

updateCourse('64a7f8f5c8e4f2b1d6e4c123')

// Delete a course.....

async function deleteCourse(id){
    let course = await Course.findByIdAndDelete(id)
    console.log(course)
}

deleteCourse('64a7f8f5c8e4f2b1d6e4c123')

// -----------------------------------------------------------------------------------------------------------------------------


// Validation.......
// 1. Required fields -> {name: {type: String, required: true}} -> ensures that the name field must be provided.for e.g.,
const courseSchema1 = new mongoose.Schema({
    name: {type: String, required: true},
    creator : {type: String, required: true},
    publishedDate : {type: Date, default: Date.now},
    isPublished : {type: Boolean, required: true}
})

const Course1 = mongoose.model('Course1', courseSchema1)

async function createCourse1() {
    const course = new Course1({
        name: 'Node.js Course',
        // creator: 'John Doe', // This will trigger a validation error
        isPublished: true
    })
    try {
        const result = await course.save()
        console.log(result)
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}
// OR using validate function.....(In try catch block)

// try{
//     const result = await course.validate()
// }
// catch(err){
//     console.log(err.message)
// }


// Inbuild Validation in Mongoose........

// In Required fields, you can pass function also. for e.g.,
const courseSchema2 = new mongoose.Schema({
    name: {type: String, required: true},
    creator : {type: String, required: function() { return this.isPublished; }},
    publishedDate : {type: Date, default: Date.now},
    isPublished : {type: Boolean, required: true}
})

// String validations -> minlength, maxlength, match(for regex pattern) for e.g.,
const courseSchema3 = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 255},
    creator : {type: String, required: true, match: /[a-z]/},
    publishedDate : {type: Date, default: Date.now},
    isPublished : {type: Boolean, required: true}
})

// Number validations -> min, max, get, set(for rounding off decimal values) for e.g.,
// Category validation using enum(for predefined values) for e.g., see category field in courseSchema4
const courseSchema4 = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 255},
    creator : {type: String, required: true, match: /[a-z]/},
    category : {type: String, required: true, enum: ['web', 'mobile', 'network']},
    tags : {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0
            },
            message: 'A course should have at least one tag'
        }
    },
    publishedDate : {type: Date, default: Date.now},
    isPublished : {type: Boolean, required: true},
    price : {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})


// Custom Validation.............

// suppose we want to ensure that the every course should have atleast two tags. for e.g.,

const courseSchema5 = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 255},
    creator : {type: String, required: true, match: /[a-z]/},
    category : {type: String, required: true, enum: ['web', 'mobile', 'network']},
    tags : {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 1
            },
            message: 'A course should have at least two tags'
        }
    },
    publishedDate : {type: Date, default: Date.now},
    isPublished : {type: Boolean, required: true},
    price : {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
})

// Error validation......

async function createCourse1() {
    const course = new Course1({
        name: 'Node.js Course',
        // creator: 'John Doe', // This will trigger a validation error
        isPublished: true
    })
    try {
        const result = await course.save()
        console.log(result)
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}