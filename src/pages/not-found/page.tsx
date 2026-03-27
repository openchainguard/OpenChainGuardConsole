import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <Link to="/" className="text-primary underline hover:text-primary/90">
            Marketing site
          </Link>
          <span className="hidden text-muted-foreground sm:inline">·</span>
          <Link to="/console" className="text-primary underline hover:text-primary/90">
            Open console
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
