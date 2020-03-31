import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

export class Alerts extends Component {
  componentDidUpdate(prevProps) {
    const { errorsReducer, alert, messagesReducer } = this.props;
    if (errorsReducer !== prevProps.errorsReducer) {
      if (errorsReducer.msg.content) {
        alert.error(`Content: ${errorsReducer.msg.content.join()}`);
      }
      if (errorsReducer.msg.non_field_errors) {
        alert.error(`Login: ${errorsReducer.msg.non_field_errors.join()}`);
      }
      if (errorsReducer.msg.username) {
        alert.error(`Username: ${errorsReducer.msg.username.join()}`);
      }

      if (errorsReducer.msg.bio) {
        alert.error(`About me: ${errorsReducer.msg.bio.join()}`);
      }
      if (errorsReducer.msg.picture) {
        alert.error(`Picture: ${errorsReducer.msg.picture.join()}`);
      }
    }

    if (messagesReducer != prevProps.messagesReducer) {
      if (messagesReducer.sorryDeleted) {
        alert.success(messagesReducer.sorryDeleted);
      }
      if (messagesReducer.sorryAdded) {
        alert.success(messagesReducer.sorryAdded);
      }

      if (messagesReducer.passwordsNotMatch) {
        alert.error(messagesReducer.passwordsNotMatch);
      }
    }
  }
  render() {
    return (
      <div>
        <Fragment />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errorsReducer: state.errorsReducer,
  messagesReducer: state.messagesReducer
});

export default connect(mapStateToProps)(withAlert()(Alerts));
