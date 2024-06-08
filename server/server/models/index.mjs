import { Classify } from './Classify.mjs';
import { Link } from "./Link.mjs";
import { Movie } from './Movie.mjs';
import { Session } from './Session.mjs';
import { User } from './User.mjs';

Movie.Links = Movie.hasMany(Link, { onDelete: 'cascade' });

export {
  Classify,
  Link,
  Movie,
  Session,
  User,
}
