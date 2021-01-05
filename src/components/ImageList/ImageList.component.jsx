import React from "react";
import "./ImageList.styles.scss";

import ImageCard from "../ImageCard/ImageCard.component";

const ImageList = ({ images }) => {
    return (
        <div className="image-container">
            {images.map((img) => (
                <ImageCard key={img.id} images={img} />
            ))}
        </div>
    );
};

export default ImageList;
