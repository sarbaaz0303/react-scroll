import React, { Component, createRef } from "react";
import "./ImageCard.styles.scss";

export default class ImageCard extends Component {
    state = { spans: 0 };
    imageRef = createRef();

    componentDidMount() {
        this.imageRef.current.addEventListener("load", this.setSpans);
    }

    setSpans = () => {
        const height = this.imageRef.current.clientHeight;
        const spans = Math.ceil(height / 15) + 1;
        this.setState({ spans });
    };

    render() {
        const img = this.props.images;
        return (
            <div
                style={{ gridRowEnd: `span ${this.state.spans}` }}
                className="image-card"
            >
                <a
                    href={img.link}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                >
                    <img
                        ref={this.imageRef}
                        src={img.src}
                        alt={img.alt}
                        title={img.alt}
                        className="image"
                    />
                </a>
            </div>
        );
    }
}
