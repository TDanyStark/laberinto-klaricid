import { URL_BASE } from "../variables";
import { preguntas as data, type Opcion } from "../data/questions.ts";
import { useState, useEffect, useRef, useMemo } from "react";
import confetti from "canvas-confetti";

const Questions = () => {
  const [preguntas, setPreguntas] = useState(data);
  const [countClick, setCountClick] = useState(0);
  const [showNotice, setShowNotice] = useState(false);
  const labImageRef = useRef<HTMLDivElement>(null);
  const [successAudio, setSuccessAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [errorAudio, setErrorAudio] = useState<HTMLAudioElement | null>(null);
  const [confettiAudio, setConfettiAudio] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSuccessAudio(new Audio(`${URL_BASE}/sounds/success.mp3`));
      setErrorAudio(new Audio(`${URL_BASE}/sounds/error.mp3`));
      setConfettiAudio(new Audio(`${URL_BASE}/sounds/confetti.mp3`));
    }
  }, []);

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
          selectedOption: value as Opcion["letra"],
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
      if (successAudio) {
        successAudio.volume = 0.5;
        successAudio.currentTime = 0;
        successAudio.play();
      }
      console.log("¡Respuesta correcta!");
    } else {
      if (errorAudio) {
        errorAudio.volume = 0.5;
        errorAudio.currentTime = 0;
        errorAudio.play();
      }
      console.log("Respuesta incorrecta");
    }
  };

  const pasosCorrectos = preguntas.reduce((acc, pregunta) => {
    const opcionCorrecta = pregunta.opciones.find((opcion) => opcion.isCorrect);
    return opcionCorrecta?.letra === pregunta.selectedOption ? acc + 1 : acc;
  }, 0);

  const imgStep = `step${pasosCorrectos}`;

  useEffect(() => {
    if (countClick === 0) {
      return; // Salir del efecto en el primer renderizado
    }
    // Realizar scroll hacia la imagen del laberinto
    if (labImageRef.current) {
      labImageRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Mostrar el confetti si se han respondido todas las preguntas correctamente en la menor cantidad de intentos
    if (
      countClick === preguntas.length &&
      pasosCorrectos === preguntas.length
    ) {
      if (confettiAudio) {
        confettiAudio.volume = 1;
        confettiAudio.currentTime = 0;
        confettiAudio.play();
      }
      confetti({
        particleCount: 200,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.9 },
      });
      confetti({
        particleCount: 200,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.9 },
      });
    }

    // Mostrar el notice cada vez que 'pasosCorrectos' cambia
    setShowNotice(true);
    let time: number = 5000;
    // si el laberinto ya esta terminado dar mas tiempo para que se vea el confetti
    if (pasosCorrectos === preguntas.length) {
      time = 10000;
    }

    // Establecer un temporizador para ocultar el notice después de 1 segundo
    const timer = setTimeout(() => {
      setShowNotice(false);
    }, time);

    // Limpiar el temporizador cuando el componente se desmonte o antes de ejecutar el efecto nuevamente
    return () => clearTimeout(timer);
  }, [countClick]); // Dependencias: se ejecuta cada vez que 'pasosCorrectos' cambia

  return (
    <div className="flex flex-col md:flex-row mt-8 gap-8 font-brandon">
      <div className="labyrinth basis-2/5 py-5 md:py-10">
        <div className="sticky top-5" ref={labImageRef}>
          <div className="relative">
            <img
              src={`${URL_BASE}/images/steps_labyrinth/${imgStep}.webp`}
              alt={`Labyrinth ${imgStep}`}
              className="w-full max-w-lg mx-auto select-none"
              draggable="false"
            />
            {showNotice && (
              <div
                id="notice"
                className="absolute inset-0 z-10 flex justify-center items-center"
              >
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="relative text-4xl p-4 text-center">
                  <h2 className="text-white font-bold">
                    ✅{pasosCorrectos} correctas de {preguntas.length}
                  </h2>
                  <p className="text-white text-2xl text-pretty">
                    {pasosCorrectos === preguntas.length
                      ? "¡Felicidades! Has completado el laberinto"
                      : "Responde todas las preguntas para salir del laberinto"}
                  </p>
                  {pasosCorrectos === preguntas.length && (
                    <>
                      <p className="text-2xl text-amarillo_abbott">
                        lo haz logrado en {countClick} intentos
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {pasosCorrectos === preguntas.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => window.location.reload()}
                className="mt-4 py-2 px-4 bg-amarillo_abbott text-azul_claro text-3xl font-bold rounded-full"
              >
                Volver a intentar
              </button>
            </div>
          )}
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
                          htmlFor={`option-${index}-${opcion.letra}`}
                        >
                          <input
                            id={`option-${index}-${opcion.letra}`}
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
