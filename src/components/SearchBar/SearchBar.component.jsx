import React, { Component } from "react";
import "./SearchBar.styles.scss";

export default class SearchBar extends Component {
    state = { query: "" };

    onFormSubmit = (e) => {
        e.preventDefault();

        this.props.handleFormSubmit(this.state.query);
        this.setState({ query: "" });
    };

    onInputChange = (e) => {
        this.setState({ query: e.target.value });
    };

    render() {
        return (
            <div className="form-container">
                <form className="form" onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            id="image-search"
                            placeholder="Image Search"
                            value={this.state.query}
                            onChange={this.onInputChange}
                        />
                        <label htmlFor="image-search" className="form-label">
                            Image Search
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}
