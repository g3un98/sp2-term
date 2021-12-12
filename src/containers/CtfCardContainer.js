import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as modules from "../modules";
import CtfCard from "../components/CtfCard";

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(modules, dispatch),
});

export default connect(null, mapDispatchToProps)(CtfCard);
