let timeoutHandler = null;

const clearError = () => {
  const errorDiv = document.getElementById("errorDiv");

  errorDiv.classList.remove("visible");
  errorDiv.textContent = "";
};

export const ErrorMessage = errorMessage => {
  const header = document.querySelector("header");

  const errorDiv = document.createElement("div");
  errorDiv.id = "errorDiv";
  errorDiv.classList.add("alert-danger");

  errorDiv.textContent = errorMessage;
  errorDiv.classList.add("visible");

  header.append(errorDiv);

  clearTimeout(timeoutHandler);
  timeoutHandler = setTimeout(clearError, 1000);
};
