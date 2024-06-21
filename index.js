const express = require('express');
const cors= require('cors');
const { default: mongoose, Mongoose } = require('mongoose');

const app = express();

const port=5000;
app.use(cors());
app.use(express.json());
const dbUrl="mongodb+srv://Aryan:Allthebest12@cluster0.xs982sw.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to Mongoose database");
}).catch((err)=>{
    console.error("Error connecting to Mongoose database");
})
app.get('/', (req, res) => {
    res.send('Welcome to the express server');
})
 // Defined a schema
const TaskSchema= new mongoose.Schema({
    title:String,
    date:String,
    description:String,
});
// defined a model
const Task= mongoose.model('Task',TaskSchema);

app.get('/tasks',async (req,res)=>{
    const tasks= await Task.find();
    res.status(200).send(tasks);
})

app.post('/addTask', async(req,res)=>{
    const {title,date,description}= req.body;
    const task= new Task({title,date,description});
    await task.save();
    res.status(200).send(task);
})

app.delete('/deleteTask/:id', async(req,res)=>{
    const {id} =req.params;
    try{
        const response= await Task.findByIdAndDelete(id);
        if(!response){
            res.status(404).send("Task not found");
        }
        else{
            res.status(200).send("Deleted");
        }
    } catch(error){
        console.log(error);
    }
})

app.listen(port,()=>{
    console.log(`Listen on ${port}`);
});