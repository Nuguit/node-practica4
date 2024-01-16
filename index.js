const express = require('express');

const app = express();

app.use(express.json());


let personas = [
  { nombre: 'Paco', apellido: 'Perez', edad: 35 },
  { nombre: 'Pepe', apellido: 'Ortiz', edad: 30 },
  { nombre: 'Pilar', apellido: 'Lopez', edad: 20 },
  { nombre: 'Leia', apellido: 'Skywalker', edad: 32 },

];


app.get('/personas', (req, res) => {
  res.send(personas);
});


app.post('/personas', (req, res) => {
  const nuevaPersona = req.body;
  personas.push(nuevaPersona);
  res.send({ message: 'Persona agregada correctamente', persona: nuevaPersona });
});


app.put('/personas/:nombre', (req, res) => {
  const nombrePersona = req.params.nombre;
  const datosModificados = req.body;

  personas = personas.map(persona => {
    if (persona.nombre === nombrePersona) {
      return { ...persona, ...datosModificados };
    }
    return persona;
  });

  res.send({ message: 'Persona modificada correctamente', persona: personas.find(p => p.nombre === nombrePersona) });
});


app.delete('/personas/:nombre', (req, res) => {
  const nombrePersona = req.params.nombre;

  personas = personas.filter(persona => persona.nombre !== nombrePersona);

  res.send({ message: 'Persona eliminada correctamente' });
});





app.listen(process.env.PORT || 3000)