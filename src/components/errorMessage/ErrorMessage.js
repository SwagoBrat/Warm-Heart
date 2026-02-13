import "./errorMessage.scss";

const ErrorMessage = () => {

    const refreshSite =() =>{
        window.location.reload()
    }
  return (
    <div className="errorMessage">
      <div className="errorMessage__content">
        <h2 className="errorMessage__title">Oops!</h2>

        <p className="errorMessage__descr">
          Failed to load products. Please refresh the page.
        </p>

          <button className="btn_retry" onClick={refreshSite}>
            Try again
          </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
