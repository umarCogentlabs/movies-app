import Movie from "./movie/Movie";

interface Props {
  genereData: { id: number; name: string; movies: any[] };
  username: string;
}

export default function MovieRow({ genereData }: Props) {
  return (
    <div className="movie-row-container">
      <div className="generation">
        <p>{genereData.movies.length !== 0 && genereData.name}</p>
      </div>

      <div className="movie-row">
        {genereData.movies.length !== 0 &&
          genereData.movies.map((movie, i) => {
            return <Movie key={i} movie={movie} />;
          })}
      </div>
    </div>
  );
}
