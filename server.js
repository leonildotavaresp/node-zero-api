import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js"

const database = new DatabasePostgres();
const server = fastify(); 


server.post('/videos', async(req, res) => {
    const { title, description, duration } = req.body
    await database.create({
       title,
       description,
       duration,
    });
    return res.status(201).send()
});

server.get('/videos', async (req, res) => {
    const search = req.query.search

    console.log(search);

    const videos = await database.list(search)

    return videos
});

server.put('/videos/:id', async (req,res) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body

    await database.update(videoId, {
        title,
        description,
        duration,
    });

    
    return res.status(204).send();
})

server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id;

    await database.delete(videoId);

    return res.status(204).send();
})

server.listen({
    port:process.env.PORT ?? 3333
})