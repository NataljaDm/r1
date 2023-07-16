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
          <h5 className="modal-title">Uždaryti</h5>
            <button type="button" className="dark around" onClick={_ => setDeleteData(null)}>X</button>
          </div>
          <div className="modal-body">
            <p>Ar tikrai ištrinti?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="nice green small no"
              onClick={(_) => setDeleteData(null)}
            >
              Ne-palikti
            </button>
            <button
              type="button"
              className="nice red small no"
              onClick={doDestroy}
            >
              Taip-ištrinti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}