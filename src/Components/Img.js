import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors, returnErrors } from "../actions/errorAction";
import { getEmployeeImg } from "../actions/employeesAction";
class Img extends Component {
  componentDidMount() {
    this.props.getEmployeeImg({ phone: this.props.phone });
  }
  static propTypes = {
    getEmployeeImg: PropTypes.func.isRequired,
    img: PropTypes.array,
    error: PropTypes.object.isRequired,

    clearErrors: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired
  };

  render() {
    const img = this.props.img[this.props.imgIndex];

    if (img === null || img === undefined) return <div></div>;

    return (
      <div>
        <img src={img} className="rounded-circle image-profile border bg-white" width='32' height='32' />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: state.error,

  img: state.employees.employeeImg
});

// export default compose(withRouter, connect(mapStateToProps, { login, returnErrors, clearErrors })(
//   LoginPage));
export default connect(mapStateToProps, {
  returnErrors,
  clearErrors,
  getEmployeeImg
})(Img);
