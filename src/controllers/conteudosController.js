import conteudos from "../models/dados";

export const getAll = (req, res) => {
    res.status(200).json({
        total: conteudos.length,
        conteudos
    });
};