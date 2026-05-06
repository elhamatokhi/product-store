import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <p>The product shelf you were looking for is not here.</p>
      <Link to="/">Return home</Link>
    </section>
  );
}

export default NotFound;
