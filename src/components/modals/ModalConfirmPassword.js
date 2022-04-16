import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState } from "react";
import NotiModal from "./NotiModal";
import { withRouter } from "react-router-dom";
import axios from "../../configs/axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ModalConfirmPassword = (props) => {
    const { code } = useParams();
    const history = useHistory();

    const [okMsg, setOkMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [inputPassword, setInputPassword] = useState("");

    const handleSubmitPassword = async () => {
        if (
            !inputPassword ||
            inputPassword.length < 4 ||
            inputPassword.length > 20
        ) {
            setOkMsg(null);
            setErrMsg("Mật khẩu không hợp lệ!");
            clearNotiModal();
            return;
        }

        try {
            let res = await axios.post("/api/note/check-password", {
                code,
                password: inputPassword,
            });

            console.log("handleSubmitPassword check: ", res);
            // fail
            if (!res.data.result) {
                setOkMsg(null);
                setErrMsg("Mật khẩu không đúng!");
                return;
            }

            // succeed
            props.confirmSucceed(res.data.data);
        } catch (err) {
            console.log("handleSubmitPassword check: ", err);
        }
    };

    const handleKeyDownInputPassword = (e) => {
        if (e.key === "Enter") {
            handleSubmitPassword();
        }
    };

    const clearNotiModal = () => {
        setTimeout(() => {
            setOkMsg(null);
            setErrMsg(null);
        }, 4000);
    };

    const handleCancelConfirm = () => {
        history.push("/");
    };

    return (
        <Modal isOpen={true} centered={true} autoFocus={false}>
            <ModalHeader>Ghi chú được bảo mật</ModalHeader>
            <ModalBody className="px-4">
                <div className="form-group">
                    <label>Vui lòng nhập mật khẩu</label>
                    <input
                        type={"text"}
                        value={inputPassword}
                        placeholder={"mật khẩu từ 4 - 20 ký tự"}
                        maxLength={20}
                        className="form-control"
                        onKeyDown={(e) => handleKeyDownInputPassword(e)}
                        autoFocus
                        onChange={(e) => setInputPassword(e.target.value)}
                    />
                </div>

                {errMsg && <NotiModal isError={true} message={errMsg} />}
                {okMsg && <NotiModal isError={false} message={okMsg} />}
            </ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-primary btn-sm px-4"
                    color="primary"
                    onClick={() => handleSubmitPassword()}
                >
                    Xác nhận
                </button>

                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleCancelConfirm()}
                >
                    Huỷ
                </button>
            </ModalFooter>
        </Modal>
    );
};

export default withRouter(ModalConfirmPassword);
