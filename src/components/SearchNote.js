import { useState } from "react";

const SearchNote = () => {
    const [errMsg, setErrMsg] = useState(null);
    const [code, setCode] = useState("");

    const handleSubmitCode = (event, type) => {
        // type: edit, archives
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className="bg-white rounded border px-4 py-5 mt-5">
                        <h5 className="text-primary text-uppercase">
                            fastnote
                        </h5>
                        <form>
                            <div className="form-group mt-4">
                                {errMsg && (
                                    <p className="text-danger">{errMsg}</p>
                                )}
                                <input
                                    type={"text"}
                                    value={code}
                                    placeholder="nhập mã ghí chú..."
                                    autoFocus
                                    className="form-control text-center"
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3 text-center">
                                <button
                                    className="btn btn-primary btn-sm m-1"
                                    onClick={(e) => handleSubmitCode(e, "edit")}
                                >
                                    <i className="fas fa-edit mr-2"></i>Sửa ghi
                                    chú
                                </button>
                                <button
                                    className="btn btn-primary btn-sm m-1"
                                    onClick={(e) =>
                                        handleSubmitCode(e, "archives")
                                    }
                                >
                                    <i className="fas fa-cloud-upload-alt mr-2"></i>
                                    Kho lưu trữ
                                </button>
                            </div>
                        </form>
                        <p
                            className="text-center p-4 text-black-50"
                            style={{ fontSize: "14px" }}
                        >
                            <span>
                                Mỗi mã ghi chú sẽ chứa một nội dung ghi chú
                                riêng.
                            </span>
                            <br></br>
                            <span>
                                Đừng quên sao lưu những ghi chú quan trọng.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchNote;
