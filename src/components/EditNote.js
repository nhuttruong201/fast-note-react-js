import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import NoteController from "./NoteController";
import axios from "../configs/axios";
import { connect } from "react-redux";
import { updateNoteInfo } from "../redux/actions/noteAction";
import ModalConfirmPassword from "./modals/ModalConfirmPassword";

const EditNote = (props) => {
    const { code } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [inputCode, setInputCode] = useState(code);
    const [content, setContent] = useState("");
    const [isConfirmedPassword, setIsConfirmedPassword] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const [noteInfo, setNoteInfo] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleChangeContent = (e) => {};
    const onFocus = () => {};
    const onBlur = () => {};

    useEffect(() => {
        fetchData(code);
    }, [code]);

    const fetchData = async (code) => {
        try {
            let res = await axios.get(`/api/note/${code}`);
            console.log(">>> res from fetchData: ", res);

            if (res.data.isPrivate) {
                setIsLoading(false);
                setIsConfirmedPassword(false);
                return;
            }

            let note = res.data.data;
            setNoteInfo({
                ...note,
                updatedAt: moment(note.updatedAt).format(
                    "DD/MM/YYYY hh:mm:ss A"
                ),
            });

            setIsConfirmedPassword(true);
            setIsLoading(false);

            // todo redux
            props.updateNoteInfo(note);

            // * real time
            // this.handleRealTime(code);
        } catch (err) {
            console.log("Err from fetchData FastNote: ", err);
        }
    };

    const handleConfirmedPasswordSucceed = (data) => {
        // alert("handleConfirmedPasswordSucceed");
        setIsConfirmedPassword(true);
        setNoteInfo(data);
        // todo redux
        props.updateNoteInfo(data);
    };

    return (
        <>
            {isLoading ? (
                <div className="center">
                    <h5 className="text-center text-primary">
                        Đang tải dữ liệu...
                    </h5>
                </div>
            ) : (
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10 h-100 mt-3">
                            <div className="editor">
                                {!isConfirmedPassword && (
                                    <>
                                        <ModalConfirmPassword
                                            confirmSucceed={
                                                handleConfirmedPasswordSucceed
                                            }
                                        />
                                    </>
                                )}

                                {isConfirmedPassword && (
                                    <>
                                        <div className="">
                                            <h6>
                                                <span className="mr-3">
                                                    <i className="fas fa-pen mr-1"></i>
                                                    {code}
                                                </span>
                                                <span>
                                                    <i className="fas fa-clock mr-1"></i>
                                                    07:00 PM
                                                </span>
                                            </h6>
                                        </div>

                                        <ReactQuill
                                            theme="snow"
                                            modules={modules}
                                            placeholder="ghi chú..."
                                            value={noteInfo.content}
                                            onChange={handleChangeContent}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            // ref={this.bodyInput}
                                        ></ReactQuill>

                                        <div className="row mt-5 justify-content-center">
                                            <div className="col-lg-4 col-md-6 col-sm-8 col-10 text-center">
                                                <div className="input-group">
                                                    <input
                                                        type={"text"}
                                                        value={inputCode}
                                                        placeholder="nhập mã ghi chú..."
                                                        className="form-control text-center"
                                                        onChange={(e) =>
                                                            setInputCode(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary">
                                                            <i className="fas fa-search"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <NoteController

                                                // password={password}
                                                // code={code}
                                                // isShared={isShared}
                                                // updateShareState={
                                                //     this.handleUpdateShareState
                                                // }
                                                // submitCode={this.handleSubmitCode}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const { innerWidth: width, innerHeight: height } = window;
const toolbarOption =
    width < 576
        ? [
              "bold",
              "italic",
              "underline",
              "blockquote",
              "code-block",
              "image",
              "video",
              { list: "ordered" },
              { list: "bullet" },
              { color: [] },
              { background: [] },
              "clean",
          ]
        : [
              [
                  "bold",
                  "italic",
                  "underline",
                  "link",
                  "blockquote",
                  "code-block",
              ],
              ["image"],
              [{ header: 1 }, { header: 2 }],
              [
                  {
                      list: "ordered",
                  },
                  {
                      list: "bullet",
                  },
              ],
              [
                  {
                      color: [],
                  },
                  {
                      background: [],
                  },
                  {
                      align: [],
                  },
              ],

              ["clean"],
          ];

const modules = {
    syntax: true,
    toolbar: {
        container: toolbarOption,
        // handlers: {
        //     insertImage: this.imageHandler,
        //     insertVideo: this.videoHandler,
        //     insertFile: this.fileHandler,
        // },
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
