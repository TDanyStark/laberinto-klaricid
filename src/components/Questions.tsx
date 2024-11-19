import { URL_BASE } from "../variables";
import { preguntas as data } from "../data/questions.ts";
import { useState } from "react";

const Questions = () => {
  const [preguntas, setPreguntas] = useState(data);
  const [countClick, setCountClick] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountClick(countClick + 1);
    const { name, value } = e.target;
    const index = parseInt(name.split("-")[1]);

    // Verificar si la pregunta anterior ya está respondida
    if (index > 0) {
      const preguntaAnterior = preguntas[index - 1];
      if (!preguntaAnterior.selectedOption) {
        alert("Debes responder la pregunta anterior");
        return;
      }
    }

    const newPreguntas = preguntas.map((pregunta, i) => {
      if (i === index) {
        return {
          ...pregunta,
          selectedOption: value as "a" | "b" | "c" | undefined,
        };
      }
      return pregunta;
    });

    setPreguntas(newPreguntas);

    // Verificar si la respuesta es correcta
    const preguntaActual = newPreguntas[index];
    const opcionSeleccionada = preguntaActual.opciones.find(
      (opcion) => opcion.letra === value
    );

    if (opcionSeleccionada?.isCorrect) {
      console.log("¡Respuesta correcta!");
    } else {
      console.log("Respuesta incorrecta");
    }
  };

  const pasosCorrectos = preguntas.reduce((acc, pregunta) => {
    const opcionCorrecta = pregunta.opciones.find((opcion) => opcion.isCorrect);
    return opcionCorrecta?.letra === pregunta.selectedOption ? acc + 1 : acc;
  }, 0);

  const imgStep = `step${pasosCorrectos}`;

  console.log("countClick", countClick);

  return (
    <div className="flex flex-col md:flex-row mt-8 gap-8 font-brandon">
      <div className="labyrinth basis-2/5">
        <div className="sticky top-10">
          <img
            src={`${URL_BASE}/images/steps_labyrinth/${imgStep}.webp`}
            alt={`Labyrinth ${imgStep}`}
            className="w-full max-w-lg mx-auto select-none"
            draggable="false"
          />
          <div className="absolute inset-0 z-10 flex justify-center items-center">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <p className="text-7xl font-bold relative">HOLAAAA</p>
          </div>
        </div>
      </div>
      <div className="questions basis-3/5">
        <ol className="space-y-4">
          {preguntas.map((pregunta, index) => {
            const isDisabled =
              index > 0 && !preguntas[index - 1].selectedOption;
            return (
              <li key={index}>
                <h2 className="text-2xl font-bold">{pregunta.pregunta}</h2>
                <ul className="mt-2 space-y-2">
                  {pregunta.opciones.map((opcion) => {
                    const isSelected = pregunta.selectedOption === opcion.letra;
                    const isCorrect = opcion.isCorrect && isSelected;
                    return (
                      <li key={opcion.letra} className="text-xl">
                        <label
                          className={`py-1 px-4 border border-transparent hover:border-amarillo_abbott inline-block rounded-full cursor-pointer ${
                            isSelected
                              ? "bg-amarillo_abbott text-azul_claro"
                              : ""
                          }  ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <input
                            className="hidden"
                            type="radio"
                            name={`pregunta-${index}`}
                            value={opcion.letra}
                            onChange={handleChange}
                            checked={isSelected}
                            disabled={isDisabled}
                          />
                          {`${opcion.letra}. ${opcion.texto}`}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Questions;
