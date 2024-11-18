type Opcion = {
  letra: "a" | "b" | "c";
  texto: string;
  isCorrect: boolean;
  selected: boolean;
};

type Pregunta = {
  pregunta: string;
  opciones: Opcion[];
};

export const preguntas: Pregunta[] = [
  {
    pregunta: "¿Cuál es una posible consecuencia del uso indebido de azitromicina?",
    opciones: [
      {
        letra: "a",
        texto: "Desarrollo de resistencia bacteriana",
        isCorrect: true,
        selected: false
      },
      {
        letra: "b",
        texto: "Aumento de la eficacia de otros antibióticos",
        isCorrect: false,
        selected: false
      },
      {
        letra: "c",
        texto: "Aumento de los costos de producción",
        isCorrect: false,
        selected: false
      }
    ]
  },
  {
    pregunta: "¿Cuál de las siguientes situaciones representa un uso indebido de azitromicina?",
    opciones: [
      {
        letra: "a",
        texto: "Completar el tratamiento recomendado por el médico, aunque hayan desaparecido los síntomas",
        isCorrect: false,
        selected: false
      },
      {
        letra: "b",
        texto: "Tomar la dosis prescrita por el médico en el horario recomendado",
        isCorrect: false,
        selected: false
      },
      {
        letra: "c",
        texto: "Iniciar un tratamiento cada vez que aparezcan síntomas respiratorios para evitar una enfermedad grave",
        isCorrect: true,
        selected: false
      }
    ]
  },
  {
    pregunta: "¿Cómo puede contribuir el uso indebido de azitromicina al problema de la resistencia bacteriana?",
    opciones: [
      {
        letra: "a",
        texto: "Al permitir que las bacterias se adapten y desarrollen resistencia",
        isCorrect: true,
        selected: false
      },
      {
        letra: "b",
        texto: "Al eliminar todas las bacterias, incluidas las beneficiosas",
        isCorrect: false,
        selected: false
      },
      {
        letra: "c",
        texto: "Al disminuir la cantidad de bacterias en el cuerpo",
        isCorrect: false,
        selected: false
      }
    ]
  },
  {
    pregunta: "¿Qué debe hacerse antes de iniciar un tratamiento con azitromicina?",
    opciones: [
      {
        letra: "a",
        texto: "Verificar la disponibilidad del medicamento en la farmacia",
        isCorrect: false,
        selected: false
      },
      {
        letra: "b",
        texto: "Consultar con el médico y seguir sus recomendaciones",
        isCorrect: true,
        selected: false
      },
      {
        letra: "c",
        texto: "Iniciar el tratamiento con base en la experiencia personal",
        isCorrect: false,
        selected: false
      }
    ]
  },
  {
    pregunta: "¿Cómo puede el farmacéutico evitar el aumento de la resistencia bacteriana a la azitromicina?",
    opciones: [
      {
        letra: "a",
        texto: "Suministrando el medicamento solo cuando haya síntomas que sugieran una infección",
        isCorrect: false,
        selected: false
      },
      {
        letra: "b",
        texto: "Recomendando su uso solo en los niños",
        isCorrect: false,
        selected: false
      },
      {
        letra: "c",
        texto: "Suministrando el medicamento solo cuando exista una prescripción médica, sin cambiar las pautas recomendadas",
        isCorrect: true,
        selected: false
      }
    ]
  }
];