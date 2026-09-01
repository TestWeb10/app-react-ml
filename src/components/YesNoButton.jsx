import { useState } from "react";
import YesNoModal from "./modals/YesNoModal";

function YesNoButton({ callback, buttonMessage, modalTitle, modalMessage, className }) {
    const [showYesNoModal, setShowYesNoModal] = useState(false)

    const yesNoCallback = function (band) {
        setShowYesNoModal(false)
        if (band) {
            callback()
        }
    }

    return (
        <>
            <button
                type="button"
                className={className}
                onClick={() => setShowYesNoModal(true)}>
                {buttonMessage}
            </button>
            {
                showYesNoModal &&
                <YesNoModal callback={yesNoCallback} title={modalTitle} message={modalMessage} />
            }
        </>
    )
}

export default YesNoButton