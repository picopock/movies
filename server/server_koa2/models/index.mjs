import { Classify } from './Classify.mjs';
import { Link } from "./Link.mjs";
import { Movie } from './Movie.mjs';
import { User } from './User.mjs';

Movie.Links = Movie.hasMany(Link, { sourceKey: "id", foreignKey: "movieId", as: "links", onDelete: 'cascade' });
Link.Movie = Link.belongsTo(Movie);

export {
  Classify,
  Link,
  Movie,
  User,
}
