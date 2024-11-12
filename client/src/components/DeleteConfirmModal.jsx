import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDeleteHomestayMutation } from "../slices/homestaysApiSlice";
import {
  useLogoutMutation,
  useUpdateUserRoleMutation,
  useDeleteHostMutation,
} from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

function ConfirmationModal(props) {
  const { userInfo } = useSelector((state) => state.auth);

  const [deleteHomestay, { isLoading: loadingDelete }] =
    useDeleteHomestayMutation();
  const [logoutUser] = useLogoutMutation();
  const [updateUserRole, { isLoading: loadingUpdate }] =
    useUpdateUserRoleMutation();
  const [deleteHost, { isLoading }] = useDeleteHostMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    try {
      await deleteHomestay(props.homestayId).unwrap();
      await deleteHost(userInfo._id);
      await updateUserRole({ isHost: false, userId: userInfo._id });
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure you want to delete your service details?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          The deletion of your service details will permanently remove your
          service from the platform and you will only have normal user
          previliges on the platform.
        </p>
        <p className="text-danger">REMEMBER THERE IS NO TURNING BACK.</p>
      </Modal.Body>
      <Modal.Footer>
        {isLoading || loadingDelete || loadingUpdate ? (
          <Button onClick={deleteHandler} variant="danger" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </Button>
        ) : (
          <Button onClick={deleteHandler} variant="danger">
            Proceed to deletion
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
