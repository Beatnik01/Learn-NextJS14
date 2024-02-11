import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
import MovieCredits from "../../../../components/movie-credits";
import MovieProviders from "../../../../components/movie-providers";

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}

export default async function MovieDetail({ params: { id } }: IParams) {
  return (
    <div>
      <Suspense fallback={<h1>Loading Movie Info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          margin: "0 auto",
          marginTop: "40px",
          width: "77.5%",
          gap: "20px",
        }}
      >
        <Suspense fallback={<h1>Loading Movie Credits</h1>}>
          <MovieCredits id={id} />
        </Suspense>
        <Suspense>
          <MovieProviders id={id} />
        </Suspense>
      </div>
    </div>
  );
}
