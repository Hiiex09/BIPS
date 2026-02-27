import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-80">
      <h1 className="text-8xl font-bold">Not Found</h1>
      <Link to="/" className="btn btn-outline btn-primary mt-4">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
