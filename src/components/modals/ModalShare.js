import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withRouter, useParams } from "react-router-dom";
import { useState } from "react";
import NotiModal from "./NotiModal";
import { connect } from "react-redux";
import axios from "../../configs/axios";
import { updateNoteInfo } from "../../redux/actions/noteAction";

const ModalShare = (props) => {
    const [okMsg, setOkMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [isShared, setIsShared] = useState(props.noteInfo.isShared);

    const { code } = useParams();
    const urlSharing = window.location.origin + "/share/" + code;
    // console.log("URL sharing: ", urlSharing);

    console.log(">> modal share check noteInfo: ", props.noteInfo);

    const handleShowNotiModal = (isErr, msg) => {
        if (isErr) {
            setErrMsg(msg);
            return;
        }

        setOkMsg(msg);
        clearNotiModal();
    };

    const handleChangeStateShare = async (e) => {
        const checked = e.target.checked;
        // console.log(checked);
        try {
            let res = await axios.put("/api/note/update-share-state", {
                code: code,
                password: props.noteInfo.password,
                isShared: checked,
            });

            if (res.data.status === 200) {
                setIsShared(checked);
                let msg =
                    "Đã " + (checked ? "bật" : "tắt") + " chế độ chia sẻ!";
                setOkMsg(msg);
                clearNotiModal();
                // todo redux
                props.updateNoteInfo({ ...props.noteInfo, isShared: checked });
            }
        } catch (err) {
            console.log("handleChangeStateShare: ", err);
        }
    };

    const clearNotiModal = () => {
        setTimeout(() => {
            setOkMsg(null);
            setErrMsg(null);
        }, 4000);
    };

    return (
        <div>
            <Modal isOpen={true} centered={true} autoFocus={false}>
                <ModalHeader>Chia sẻ ghi chú</ModalHeader>
                <ModalBody className="px-4">
                    <div className="mb-4">
                        <div className="body-content-modal">
                            <p className="text-justify text-center text-black-80">
                                Chế độ chia sẻ cho phép
                                <strong> bất kỳ ai </strong>
                                có kết nối internet và truy cập vào{" "}
                                <strong>liên kết chia sẻ </strong>
                                đều có thể xem nội dung.
                            </p>
                        </div>

                        <div className="mid">
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    defaultChecked={isShared}
                                    onClick={(e) => handleChangeStateShare(e)}
                                    id="s1"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="s1"
                                >
                                    Chế độ chia sẻ
                                </label>
                            </div>
                        </div>
                    </div>

                    {errMsg && <NotiModal isError={true} message={errMsg} />}
                    {okMsg && <NotiModal isError={false} message={okMsg} />}
                </ModalBody>
                <ModalFooter>
                    <CopyToClipboard text={urlSharing}>
                        <button
                            className="btn btn-primary btn-sm px-4"
                            onClick={() =>
                                handleShowNotiModal(
                                    false,
                                    "Đã sao chép liên kết chia sẻ!"
                                )
                            }
                        >
                            Nhận liên kết chia sẻ
                        </button>
                    </CopyToClipboard>

                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => props.isClose("SHARE")}
                    >
                        Đóng
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        noteInfo: state.noteInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateNoteInfo: (noteInfo) => dispatch(updateNoteInfo(noteInfo)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ModalShare));
