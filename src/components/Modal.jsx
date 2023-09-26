import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, open, setOpen }) {
  if (!open) {
    return null;
  }
  if (open) {
    return (
      <div>
        <div className="backdrop" onClick={() => setOpen(!open)}></div>
        <div className="modal">
          <div className="modal__header">
            <h2 className="title">{title}</h2>
            <button onClick={() => setOpen(!open)}>
              <XCircleIcon className="icon  close" />
            </button>
          </div>
          <div className="modal__content">
            <div className="modal-content-container">
              {children.length < 3 ? (
                children
              ) : (
                <div className="scrollable-container">{children}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
