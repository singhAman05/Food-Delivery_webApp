import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const handleErrors = (error) => {
  if (error.response && error.response.data && error.response.data.errors) {
    const errors = error.response.data.errors;
    errors.forEach((error) => {
      MySwal.fire({
        icon: "error",
        title: "Validation Error!",
        text: error.msg,
      });
    });
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    MySwal.fire({
      icon: "error",
      title: "Error!",
      text: error.response.data.message,
    });
  } else {
    MySwal.fire({
      icon: "error",
      title: "Error!",
      text: "An unexpected error occurred",
    });
  }
};

export const handleSuccess = (response) => {
  MySwal.fire({
    icon: "success",
    title: "Success!",
    text: response.data.message,
  });
};
