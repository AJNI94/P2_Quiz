const model = require('./model');
const {log, biglog, errorlog, colorize} = require('./out');

exports.helpCmd = rl => {
    log('Commandos:');
    log(' h|help - Muestra esta ayuda.');
    log(' list - Listar los quizzes existentes.');
    log(' show <id> - Muestra la pregunta y la respuesta el quiz indicado.');
    log(' add - Añadir un nuevo quiz interactivamente.');
    log(' delete <id> - Borrar el quiz indicado.');
    log(' test <id> - Probar el quiz indicado.');
    log(' h|help - Muestra esta ayuda.');
    log(' p|play - Jugar a preguntar aleatoriamente todos los quizzes.');
    log(' q|quit - Salir del programa.');
    rl.prompt();
};

exports.creditsCmd = rl => {
    log('Autor de la practica.');
    log('Alvaro Nieto');	
    rl.prompt();
};

exports.addCmd = rl => {

	rl.question(colorize(' Introduzca una pregunta: ', 'red'), question => {
		
		rl.question(colorize(' Introduzca una respuesta: ', 'red'), answer => {
			
			model.add(question,answer);
			log(`${colorize('Se ha añadido', 'magenta')}: ${question} ${colorize('=>','green')} ${answer}`);
			rl.prompt();
		});
	});
};

exports.listCmd = rl => {
	
    model.getAll().forEach((quiz, id) => {

    	log(`[${colorize(id,'magenta')}]: ${quiz.question} `);
    });
    rl.prompt();
};

exports.showCmd = (rl, id) => {
	if (typeof id == undefined) {
		errorlog(`Falta el parámetro id.`);
	} else{
		try {
			const quiz = model.getByIndex(id);
			log(`[${colorize(id, 'magenta')}]: ${quiz.question} ${colorize('=>','green')} ${quiz.answer}`);
		} catch(error) {
		errorlog(error.message); }
	}
	  rl.prompt();
};

exports.deleteCmd = (rl, id) => {
	if (typeof id == undefined) {
		errorlog(`Falta el parámetro id.`);
	} else{
		try {
			
			const quiz = model.getByIndex(id);
			log(` ${colorize('BORRADO','red')} [${colorize(id, 'magenta')}]: ${quiz.question} ${colorize('=>','green')} ${quiz.answer} ${colorize('BORRADO','red')}`);
			const quizDelete = model.deleteByIndex(id);

		} catch(error) {
		errorlog(error.message); }
	}
	  rl.prompt();
};

exports.testCmd = (rl, id) => {
	if (typeof id == undefined) {
		errorlog(`Falta el parámetro id.`);
		rl.prompt();
	} else{
		try {
			
			const quiz = model.getByIndex(id);
			rl.question(`${colorize(quiz.question, 'red')}?  `, (answer) => { 
					
				if (answer == quiz.answer) {
					log(`Su respuesta es correcta.`);
					biglog('Correcta','green');
				}else {
					log(`Su respuesta es incorrecta.`);
					biglog('Incorrecta','red');
				}
			rl.prompt();
				});
		} catch(error) {
		errorlog(error.message); }
		  rl.prompt();
	};
};

exports.playCmd = rl => {

const playOne = () => { 
		
		if(toBeResolved.length == 0){
			log('Fin');
			log('Fin del juego. Aciertos: ${score}');
			log(`Puntuación:`);
			biglog(score,'green');
			rl.prompt();
		} else {
			
			let id = Math.floor(Math.random() * toBeResolved.length);
		
			const quiz = toBeResolved[id];
				
			rl.question(`${colorize(quiz.question, 'red')}?  `, (answer) => { 
				
				if (answer == quiz.answer) {
					biglog('Correcto','green');
					score += 1;
					log(`CORRECTO - LLeva ${score} aciertos.`);
					toBeResolved.splice(id,1);
					playOne();
				}else {
					log('Fin');
					biglog('Incorrecto','red');
					log(`INCORRECTO.`);
					biglog(score,'green');
				    rl.prompt();
				};	
			});
		};			
	}

	let score = 0;	
	let toBeResolved = [];
	
    model.getAll().forEach((quiz, id) => {	
		toBeResolved.push(quiz);
    });
	
	playOne();

};

exports.editCmd = (rl, id) => {
	if (typeof id == undefined) {
		errorlog(`Falta el parámetro id.`);
		rl.prompt();
	} else{
		try {
			
			rl.question(colorize(' Introduzca una pregunta: ', 'red'), question => {
				rl.question(colorize(' Introduzca la respuesta: ', 'red'), answer => {
					model.update(id, question, answer);
					log(` Se ha cambiado el quiz ${colorize(id,'magenta')} por: ${question} ${colorize('=>','green')} ${answer}`);
					rl.prompt();
				});
			});
	
		} catch(error) {
		errorlog(error.message);
		  rl.prompt();
		}
	};
};

exports.quitCmd = rl => {
    rl.close();
};