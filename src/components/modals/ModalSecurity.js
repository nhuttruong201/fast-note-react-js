import axios from "../../configs/axios";
import { useState } from "react";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { updateNoteInfo } from "../../redux/actions/noteAction";
import NotiModal from "./NotiModal";

const ModalSecurity = (props) => {
    const { code } = useParams();

    const [okMsg, setOkMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [isOnPassword, setIsOnPassword] = useState(
        props.noteInfo.password === "" ? false : true
    );
    const [inputPassword, setInputPassword] = useState(props.noteInfo.password);

    const handleChangeStatePass = (e) => {
        const checked = e.target.checked;
        setIsOnPassword(checked);
        if (!checked) {
            setInputPassword("");
        }
    };

    const handleKeyDownInputPassword = (e) => {
        if (e.key === "Enter") {
            handleUpdatePassword();
        }
    };

    const handleUpdatePassword = async () => {
        // alert("update");
        if (
            isOnPassword &&
            (!inputPassword ||
                inputPassword.length < 4 ||
                inputPassword.length > 20)
        ) {
            setOkMsg(null);
            setErrMsg("Mật khẩu không hợp lệ!");
            clearNotiModal();
            return;
        }

        try {
            let res = await axios.put("/api/note/update-password", {
                code: code,
                password: inputPassword,
            });

            console.log("handleUpdatePassword: ", res);
            if (res.data.status === 200) {
                let msg =
                    "Đã " + (isOnPassword ? "cập nhật" : "tắt") + " mật khẩu!";
                setErrMsg(null);
                setOkMsg(msg);
                clearNotiModal();
                // todo redux
                props.updateNoteInfo({
                    ...props.noteInfo,
                    password: inputPassword,
                });
            }
        } catch (err) {
            console.log("handleUpdatePassword: ", err);
        }
    };

    const clearNotiModal = () => {
        setTimeout(() => {
            setOkMsg(null);
            setErrMsg(null);
        }, 4000);
    };

    return (
        <Modal isOpen={true} centered={true}>
            <ModalHeader>Bảo mật ghi chú</ModalHeader>
            <ModalBody className="px-4">
                <div className="mb-4">
                    <div className="body-content-modal">
                        <p className="text-justify text-center">
                            Khi đặt mật khẩu, bạn cần xác thực trước khi đi đến
                            ghi chú. Thay đổi có hiệu lực từ lần truy cập tiếp
                            theo.
                        </p>
                    </div>
                    <div className="mid">
                        <div className="custom-control custom-switch">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                defaultChecked={isOnPassword}
                                onClick={(e) => handleChangeStatePass(e)}
                                id="s1"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="s1"
                            >
                                Mật khẩu
                            </label>
                        </div>
                    </div>

                    {isOnPassword && (
                        <div className="form-group mt-4">
                            <input
                                type={"text"}
                                value={inputPassword}
                                placeholder={"mật khẩu từ 4 - 20 ký tự"}
                                maxLength={20}
                                className="form-control"
                                onKeyDown={(e) =>
                                    this.handleKeyDownInputPassword(e)
                                }
                                autoFocus
                                onChange={(e) =>
                                    setInputPassword(e.target.value)
                                }
                            />
                        </div>
                    )}
                </div>

                {errMsg && <NotiModal isError={true} message={errMsg} />}
                {okMsg && <NotiModal isError={false} message={okMsg} />}
            </ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-primary btn-sm px-4"
                    color="primary"
                    onClick={() => handleUpdatePassword()}
                >
                    Cập nhật
                </button>
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => props.isClose("SECURITY")}
                >
                    Đóng
                </button>
            </ModalFooter>
        </Modal>
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
)(withRouter(ModalSecurity));
