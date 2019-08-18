/////

const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    //let data = JSON.parse(data1);
    //console.log(data);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}


const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    //console.log(listadoPorHacer);
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();

        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let data = listadoPorHacer.find(tarea => tarea.descripcion === descripcion);

    if (data.completado === false) {

        let nuevoListado = listadoPorHacer.filter(tarea => {
            return tarea.descripcion !== descripcion;
        });

        if (data.length = data.length) {
            return false;
        } else {
            listadoPorHacer = nuevoListado;
            guardarDB();
            return true;
        }

    } else {
        return 'La tarea esta completada';
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}