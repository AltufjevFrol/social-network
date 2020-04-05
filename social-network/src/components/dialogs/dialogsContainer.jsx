import {connect} from "react-redux";
import {addMessageCreateAction, addNewSymbolMessageCreateAction} from '../../redux/dialogsReducer';
import Dialogs from "./dialogs";
import withRedirectToLogin from "../hoc/withAuthRedirect";
import Dialog from "./dialog/dialog";
import {compose} from "redux";

const mapStateToProps = (state) => {

    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addMessage() {
            dispatch(addMessageCreateAction());
        },
        addNewSymbolMessage(newText) {
            dispatch(addNewSymbolMessageCreateAction(newText));
        }
    }
};

export default compose(withRedirectToLogin, connect(mapStateToProps, mapDispatchToProps))(Dialogs)
