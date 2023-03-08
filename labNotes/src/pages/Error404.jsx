import React from "react";
import { useRouteError, Link } from 'react-router-dom'; 

export default function Error404() {
  const error = useRouteError();
    return (
      <div>
      <h1>404</h1>
      <p>Page not found</p>
      <p>{error.statusText || error.message}</p>
      <Link to="/">Return to Home</Link>
    </div>
    )
}
