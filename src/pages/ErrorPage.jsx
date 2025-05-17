import { useRouteError } from "react-router-dom";

function ErrorPage() {
  let title = "Error";
  let message = "Something went wrong...";
  const error = useRouteError();
  if (error.status === 404) {
    title = "Cannot found 404";
    message = "Page is not exist!";
  }
  if (error.status === 500) {
    title = "Cannot fetch";
    message = error.data.message;
  }
  if (error.status === 401) {
    title = "Unauthenticated!";
    message = "Please back to login page and sign in!";
  }
  return (
    <div className="grid grid-flow-row justify-center mt-[30px]">
      <h1 className="font-semibold text-2xl justify-self-center text-neutral-600 mb-[10px]">
        {title}
      </h1>
      <span className="italic">{message}</span>
    </div>
  );
}
export default ErrorPage;
