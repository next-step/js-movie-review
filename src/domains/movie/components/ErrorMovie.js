const ErrorMovie = (props) => {
  const { message } = props;

  return `
    <main id="error-container">
      <section style="min-height: 480px; display:flex; justify-content: center;' align-items: center;">
         <h4 style="font-size: 1.4rem; font-weight: 600;">${message}</h4>
      </section>
    </main>
  `;
};

export default ErrorMovie;
