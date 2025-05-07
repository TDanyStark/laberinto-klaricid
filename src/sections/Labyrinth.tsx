import Questions from "../components/Questions";

const Labyrinth = () => {
  return (
    <main className="text-white">
      <section className="max-w-[1400px] mx-auto px-2 py-8">
        <p className="text-3xl leading-normal text-pretty">
          Para encontrar la salida del laberinto, deberás elegir la opción
          correcta en cada parte del camino.{" "}
          <span className="font-bold">
            Si eliges la opción incorrecta, te perderás en el laberinto.
          </span>
        </p>
        <Questions />
        <div className="mt-8 text-base leading-normal text-pretty">
          <p>
            En comparación con otros macrólidos, como la azitromicina, la
            claritromicina tiene tasas considerablemente más bajas de
            resistencia bacteriana.1
          </p>
          <p>
            <span className="font-bold">Referencia:</span> Davidson RJ. In vitro
            activity and pharmacodynamic/pharmacokinetic parameters of
            clarithromycin and azithromycin: why they matter in the treatment of
            respiratory tract infections. Infect Drug Resist. 2019;12:585-596.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Labyrinth;
