import Swal from "sweetalert2";

const showSwal = (title, icon, confirmButtonText) => {
  Swal.fire({ title, icon, confirmButtonText });
};
export {showSwal}