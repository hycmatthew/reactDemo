import React from "react";
import Button from "@material-ui/core/Button";

class About extends React.Component {
  onSubmit = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="about-block">
        <h1>Test Title</h1>
        <form>
          <input placeholder="name" type="name" />
          <input placeholder="email" type="email" />
          <Button variant="contained" color="primary" onClick={this.onSubmit}>Submit</Button>
        </form>
      </div>
    );
  }
}

export default About;
