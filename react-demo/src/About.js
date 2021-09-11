import React from "react";

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
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default About;
