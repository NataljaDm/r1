import { KEY } from "../App";
import { destroy } from "../Functions/localStorage";

export default function Delete({ setDeleteData, deleteData, setLastUpdate }) {
  const doDestroy = (_) => {
    if (deleteData.balance === 0) {
      destroy(KEY, deleteData.id);
      setDeleteData(null);
      setLastUpdate(Date.now());
    } else {
      alert("There is money in this account. You can't delete it.");
    }
  };

  return (
    <div className="modal show">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Account</h5>
            <button
              type="button"
              className="btn-close"
              onClick={(_) => setDeleteData(null)}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this BANK ACCOUNT?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="nice green small no"
              onClick={(_) => setDeleteData(null)}
            >
              No way
            </button>
            <button
              type="button"
              className="nice red small no"
              onClick={doDestroy}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}