const notFound = (req, res, next) => {
    // Respond in HTML or JSON depending on the client's Accept header
    if (req.accepts('html')) {
      return res.status(404).send('<h1>404 – Page Not Found</h1>');
    }
    res.status(404).json({ error: '404 Not Found' });
  };
  
  export default notFound;
  