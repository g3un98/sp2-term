import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as modules from "../modules";
import MarkList from "../components/MarkList";

const mapStateToProps = (state) => ({
  ctfs: state.ctfs,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(modules, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkList);
