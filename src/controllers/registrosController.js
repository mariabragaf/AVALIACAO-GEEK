import registros from "../models/dados.js";

export const getAll = (req, res) => {
    res.status(200).json({
        total: registros.length,
        registros
    });
    
};

export const getById = (req, res) => {
    const id = parseInt(req.params.id);

    const registro = registros.find(r => r.id === id);

    if(!registro) {
        return res.status(404).json({
            message: "Registro Geek não encontrado!"
        })
    }

    res.status(200).json(registro);
};

export const create = (req, res) => {
        const { titulo, categoria, reviewer, nota, plataforma, vizualizacoes, comentarios} = req.body;

        if(!titulo || !categoria || !reviewer || !nota || !plataforma || !vizualizacoes || !comentarios) {
            return res.status(404).json({
                message: "Preencha todos os campos!"
            });
        }
        
        // Regras de negócio aqui:
        if (nota < 0 || nota > 10) {
            return res.status(400).json({ message: "A nota deve estar entre 0 e 10." });
        }

        if (reviewer > 5) {
            return res.status(400).json({ message: "O titulo do reviewer deve ter pelo menos 5 caracteres" });
        }

        const novoRegistro = {
            id: registros.length +1,
            titulo,
            categoria,
            reviewer,
            nota,
            plataforma,
            vizualizacoes,
            comentarios
        };

        registros.push(novoRegistro);

        res.status(201).json({
            message: "Novo registro Geek adicionado com sucesso",
            registro: novoRegistro
        });
};

export const update = (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, categoria, reviewer, nota, plataforma, vizualizacoes, comentarios } = req.body; 
    
    const idParaEditar = id;

     if(isNaN(idParaEditar)){
      return res.status(400).json({
          success: false,
          message: "O id deve ser um número válido."
      })
  }

   const registroExiste = registros.find(registro => registro.id === idParaEditar);
  if(!registroExiste){
      return res.status(404).json({
          success: false,
          message: `O registro com o id: ${idParaEditar} não existe.`
      })
  }

   const registrosAtualizados = registros.map(registro => registro.id === idParaEditar ? {
      ...registro,
      ...(titulo && { titulo }),
      ...(categoria && { categoria }),
      ...(reviewer && { reviewer }),
      ...(nota && { nota }),
      ...(plataforma && { plataforma }),
      ...(vizualizacoes && { vizualizacoes }),
      ...(comentarios && { comentarios })
}
: registro
);

registros.splice(0, registros.length, ...registrosAtualizados);

const registroEditado = registros.find(registro => registro.id === idParaEditar);
  res.status(200).json({
      success: true,
      message: "Dados atualizados com sucesso do registro. ✅",
      registro: registroExiste
  });

};

export const remove = (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const registroParaRemover = registros.find(p => p.id === idParaApagar);
    console.log(registroParaRemover)

    if (!registroParaRemover) {
        return res.status(404).json({
            success: false,
            message: "Registro id não existe"
        });
    }

    const registroFiltrado = registros.filter(p => p.id !== idParaApagar);
    console.log(registroFiltrado)

    registros.splice(0, registros.length, ...registroFiltrado);

    return res.status(200).json({
        success: true,
        message: "O registro foi removido com sucesso! 🗑️"
    });
};