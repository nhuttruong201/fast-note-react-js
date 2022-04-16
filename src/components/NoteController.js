import { useState } from "react";
import ModalSecurity from "./modals/ModalSecurity";
import ModalShare from "./modals/ModalShare";

const NoteController = () => {
    const [showModalShare, setShowModalShare] = useState(false);
    const [showModalBackup, setShowModalBackup] = useState(false);
    const [showModalSecurity, setShowModalSecurity] = useState(false);

    const handleCloseModal = (modalName) => {
        switch (modalName) {
            case "SHARE":
                setShowModalShare(false);
                return;
            case "SECURITY":
                setShowModalSecurity(false);
                return;
            case "BACKUP":
                setShowModalBackup(false);
                return;
            default:
                return;
        }
    };

    return (
        <>
            <div className="">
                <button
                    className="btn btn-sm btn-primary m-1"
                    onClick={() => setShowModalShare(true)}
                >
                    <i className="fas fa-link"></i>
                </button>
                <button
                    className="btn btn-sm btn-primary m-1"
                    onClick={() => setShowModalShare(true)}
                >
                    <i className="fas fa-share"></i>
                </button>
                <button
                    className="btn btn-sm btn-primary m-1"
                    onClick={() => setShowModalBackup(true)}
                >
                    <i className="fas fa-upload"></i>
                </button>
                <button
                    className="btn btn-sm btn-primary m-1"
                    onClick={() => setShowModalSecurity(true)}
                >
                    <i className="fas fa-lock"></i>
                </button>
            </div>

            {showModalShare && <ModalShare isClose={handleCloseModal} />}
            {showModalSecurity && <ModalSecurity isClose={handleCloseModal} />}
        </>
    );
};

export default NoteController;
