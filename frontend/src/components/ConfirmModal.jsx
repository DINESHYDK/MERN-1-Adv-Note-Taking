/**
 * ConfirmModal — A reusable DaisyUI centered modal for confirmation dialogs.
 *
 * Instead of using the ugly browser `window.confirm()`, this renders a
 * beautiful-centered modal using DaisyUI's built-in "modal" component.
 *
 * HOW IT WORKS:
 *   - The parent component controls visibility with a boolean state (e.g. showModal).
 *   - When showModal is true  → modal appears (centered, with a dark backdrop).
 *   - When showModal is false → modal is hidden (not rendered at all).
 *   - The "Confirm" button calls onConfirm (e.g. the actual delete API call).
 *   - The "Cancel" button calls onCancel (which just sets showModal to false).
 *
 * PROPS:
 *   @param {boolean}  isOpen   — Controls whether the modal is visible or not.
 *                                 true = show modal, false = hide modal.
 *
 *   @param {string}   title    — The heading text shown at the top of the modal.
 *                                 Example: "Delete Note"
 *
 *   @param {string}   message  — The description/body text asking the user to confirm.
 *                                 Example: "Are you sure? This cannot be undone."
 *
 *   @param {function} onConfirm — The function called when user clicks "Confirm" button.
 *                                  This is where you put your delete/update logic.
 *
 *   @param {function} onCancel  — The function called when user clicks "Cancel" button
 *                                  OR clicks the dark backdrop behind the modal.
 *                                  Usually just sets the showModal state to false.
 *
 * DaisyUI CLASSES USED:
 *   "modal"        — DaisyUI's modal wrapper. It handles centering + backdrop.
 *   "modal-open"   — When added, the modal becomes visible (toggles display).
 *   "modal-box"    — The white card/box in the center that holds the content.
 *   "modal-backdrop" — The dark semi-transparent overlay behind the modal.
 *                      Clicking it triggers onCancel to close the modal.
 */

const ConfirmModal = ({isOpen, title, message, onConfirm, onCancel}) => {

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>

                <div className="modal-action">
                    <button className="btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-error" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>

            </div>
            <div className="modal-backdrop" onClick={onCancel}/>

        </div>
    );
};

export default ConfirmModal;

