
type ConfirmModalProps = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmModal({ message, onConfirm, onCancel } : ConfirmModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}