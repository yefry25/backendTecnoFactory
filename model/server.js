import express from "express";
import cors from "cors";
import dbConnection from "../database/config.js";
import usuario from "../routes/usuario.js";
import favorito from "../routes/favorito.js";

class Server {
    constructor() {
        this.app = express();
        this.middleware();
        this.port = process.env.PORT || "8080";
        this.conectarBd();
        this.routes();
    }
    routes(){
        this.app.use('/api/usuario',usuario);
        this.app.use('/api/favorito',favorito);
    }
    async conectarBd () {
        await dbConnection();
    }
    middleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    escuchar(){
        this.app.listen(this.port , () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }
}

export default Server


