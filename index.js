const express = require('express')
const app = express()
const port = 3000
const bp = require('body-parser')

//middlewares

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(unknownEndpoint)

//initialData
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      done: false
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      done:false
    
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      done:false
    }
]

//utils
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
}
  


app.get('/', (req, res) => {
  res.send('Hello World! with express.js')
})


//look all notes
app.get('/api/notes', (req, res)=>{
    res.json(notes);
})

//look by id
app.get('/api/notes/:id', (req, res)=>{
    const id = Number(req.params.id)

    const note = notes.find(note => note.id === id);
    
    res.json(note) 
})



//deleteTodo
app.delete('/api/notes/:id', (req, res)=>{
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id);
    res.json(notes)
    //res.status(204).end()
    
})

//AddTodo
app.post('/api/notes', (req, res)=>{
    const body  = req.body;
   if(!body.content){
        return res.status(400).json({
            error:'content is mising',
        })
    }
    const note = {
        id: generateId(),
        content: body.content,
        done:false
    }
    notes = notes.concat(note);
    res.json(notes)
})

//UpdateTodo
app.put('/api/notes/:id', (req, res)=>{
    const id = Number(req.params.id)
    notes = notes.map(note =>note.id === id ? {...note, done:true} : note)
    res.json(notes)
    //res.status(204).end()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
