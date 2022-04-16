import moment from "moment";
import { Alert } from "reactstrap";

const NotiModal = (props) => {
    let { isError, message } = props;
    let color = isError ? "danger" : "success";

    return (
        <Alert color={color} className="font-weight-bold text-center">
            {message}
            {/* {moment(new Date()).format("- hh:mm:ss A")} */}
        </Alert>
    );
};

export default NotiModal;
