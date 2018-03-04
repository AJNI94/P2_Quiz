
const fs = require("fs");
const DB_FILENAME = "quizzes.json";

let quizzes = [
     {
		question: "Capital de Italia",
		answer: "Roma"
	},
    {
		question: "Capital de Espa�a",
		answer: "Madrid"
	},
    {
		question: "Capital de Portugal",
		answer: "Lisboa"
	},
    {
		question: "Capital de Francia",
		answer: "Paris"
	}
];

// LEER FICHERO
const load = () => {
	
	fs.readFile(DB_FILENAME, (err, data) => {
		if (err){
			//La primera vez no existe el fichero
		    if (err.code === 'ENOENT') {
		        save();
		        return;
		      }
		      throw err;
		    }

		    let json = JSON.parse(data);
		    
		    if (json){
		    	quizzes = json;
		    }
		});
};

//GUARDADO

const save = () => {
	
	fs.writeFile(DB_FILENAME, 
			JSON.stringify(quizzes), 
		err => {
			if (err) throw err;
		});
};

//FUNCIONES			
exports.count = () => quizzes.length;

exports.add = (question, answer) => {
	
	quizzes.push({
		question: (question || "").trim(),
		answer: (answer || "").trim()
	});
	save();
};

exports.update = (id, question, answer) => {
	
	const quiz = quizzes[id];
	if (typeof quiz == "undefined") {
		throw new Error(`El valor del parametro id no es v�lido.`);
	}
	quizzes.splice(id, 1, {
		question:( question || "").trim(),
		answer: ( answer || "").trim()
	});
	save();
};

exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

exports.getByIndex = id => {
	const quiz = quizzes[id];
	if (typeof quiz == "undefined"){
		throw new Error(`El valor del parametro id no es valido.`);
	}
	return JSON.parse(JSON.stringify(quiz));
}

exports.deleteByIndex = id => {
	
		const quiz = quizzes[id];
	if (typeof quiz == "undefined"){
		throw new Error(`El valor del parametro id no es valido.`);
	}
	quizzes.splice(id,1);
	save();
}

//Carga los quizzes almacenados
load();