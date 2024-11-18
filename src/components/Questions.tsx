import { URL_BASE } from "../variables";
import { preguntas as data } from "../data/questions.ts";
import { useState } from "react";

const Questions = () => {
  const [preguntas, setPreguntas] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const index = parseInt(name.split("-")[1]); // Obtén el índice de la pregunta
    const letraSeleccionada = value; // Opción seleccionada por el usuario

    const newPreguntas = preguntas.map((pregunta, i) => {
      if (i === index) {
        return {
          ...pregunta,
          opciones: pregunta.opciones.map((opcion) => ({
            ...opcion,
            selected: opcion.letra === letraSeleccionada // Marca como seleccionada la opción elegida
          }))
        };
      }
      return pregunta;
    });

    setPreguntas(newPreguntas);

    // Verificar si la respuesta es correcta
    const pregunta = preguntas[index];
    const respuestaCorrecta = pregunta.opciones.find((opcion) => opcion.isCorrect);

    if (respuestaCorrecta?.letra === letraSeleccionada) {
      console.log("¡Respuesta correcta!");
    } else {
      console.log("Respuesta incorrecta");
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-8 gap-8 font-brandon">
      <div className="labyrinth basis-2/5">
        <div className="sticky top-10">
          <img
            src={`${URL_BASE}/images/steps_labyrinth/step0.webp`}
            alt="Paso 0"
            className="w-full max-w-lg mx-auto"
          />
        </div>
      </div>
      <div className="questions basis-3/5">
        <ol className="space-y-4">
          {preguntas.map((pregunta, index) => (
            <li key={index}>
              <h2 className="text-2xl font-bold">{pregunta.pregunta}</h2>
              <ul className="mt-2 space-y-2">
                {pregunta.opciones.map((opcion) => (
                  <li key={opcion.letra} className="text-xl">
                    <label className={`py-1 px-4 border border-transparent hover:border-amarillo_abbott inline-block rounded-full cursor-pointer ${opcion.isCorrect && opcion.selected ? 'bg-amarillo_abbott text-azul_claro': ''}`}>
                      <input
                        className="w-4 h-4 hidden"
                        type="radio"
                        name={`pregunta-${index}`}
                        value={opcion.letra}
                        onChange={(e) => handleChange(e)}
                        checked={opcion.selected} // Muestra la opción seleccionada
                      />
                      {`${opcion.letra}. ${opcion.texto}`}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Questions;
