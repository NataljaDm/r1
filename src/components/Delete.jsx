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
          <h5 className="modal-title"></h5>
            <button type="button" className="dark around" onClick={_ => setDeleteData(null)}>X</button>
          </div>
          <div className="modal-body">
            <p>Delete Account?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="nice green small no"
              onClick={(_) => setDeleteData(null)}
            >
              No
            </button>
            <button
              type="button"
              className="nice red small no"
              onClick={doDestroy}
            >
              Yes-Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}