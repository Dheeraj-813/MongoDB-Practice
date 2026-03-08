First Download the MongoDB from https://www.mongodb.com/try/download/compass link.
Then install it as per the suggestion.
In CMD, check with command - "mongod".
There you will see the path of database file.
For that, you have to set path and configured the MongoDB.
Go to :- "C:\Program Files\MongoDB\Server\7.0\bin" & copy this path.
Go to Environment variable in system settings.
Select Path and create new path & paste the path that you copied before.
Then go to CMD :- make new directory using command :- "md c:\data\db".
Now check again, you will see waiting for connection..!
Open MongoDB compass :- Create new default connection with same default port no. :- You will see all the databases.
To use MongoDB in application :- you need Mongoose :- this is bridge between Express and MongoDB. Use Command:- "npm install mongoose".
-------------------------------------------------------------------------------------------------------------------------------------

To use MongoBD along with Mongoose we need to create connection first:- 

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/testDatabase') --> here, instead of localhost you can use port no. also & testDatabase is your database name.
.then(() => {console.log('Connection successful')})
.catch(err => {console.error('Connection error...!' , err)});

To create Schema (It's like column in table formate data.) :- syntax:- 

const courseSchema = new mongoose.Schema({
    name : String,
    creator : String,
    publishedDate : {type: Data, default:Date.now},
    isPublished : boolean
})

Here, Schema is like class in oop's and Model is object.
So whenever you create schema, you have to create Model for this schema.

const Course = mongoose.model('course', courseSchema)


To create data is dataset....It is also call documents.

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        creator: 'John Doe',
        isPublished: true
    })
saving dataset to database
    const result = await course.save()
    console.log(result)
}

calling function...
createCourse()
