import React, { Component } from "react";
import "./App.scss";

import { pexelsAPI } from "./API/pexels.api";
import { unsplashAPI } from "./API/unsplash.api";

import SearchBar from "./components/SearchBar/SearchBar.component";
import ImageList from "./components/ImageList/ImageList.component";

import ReactLogo from "./assets/spinner.svg";

export default class App extends Component {
    state = {
        query: "daily new",
        images: [],
        page: 1,
        per_page: 5,
        prevY: 0,
        loading: false,
    };

    handleFormSubmit = async (query) => {
        if (this.state.query !== query) {
            this.setState({ query, images: [], page: 1, prevY: 0 });
        }
        this.setState({ loading: true });
        const page_num = this.state.page;

        try {
            const unsplash = await unsplashAPI.get("/search/photos", {
                params: {
                    query: this.state.query,
                    page: this.state.page,
                    per_page: this.state.per_page,
                },
            });
            unsplash.data.results.map((img) =>
                this.setState({
                    images: [
                        ...this.state.images,
                        {
                            id: `${img.id + page_num}`,
                            src: img.urls.regular,
                            alt: img.alt_description,
                            link: img.links.html,
                        },
                    ],
                })
            );
        } catch (e) {
            console.warn("Unsplash Might Be Down", e);
        }

        try {
            const pexels = await pexelsAPI.get("/search", {
                params: {
                    query,
                    page: this.state.page,
                    per_page: this.state.per_page,
                },
            });
            pexels.data.photos.map((img) =>
                this.setState({
                    images: [
                        ...this.state.images,
                        {
                            id: `${img.id + "a" + page_num}`,
                            src: img.src.large2x,
                            alt: `photographer ${img.photographer}`,
                            link: img.url,
                        },
                    ],
                })
            );
        } catch (e) {
            console.warn("Pexels Might Be Down", e);
        }
        if (this.state.per_page === 5) {
            this.setState({ per_page: 10 });
        }
        this.setState({ loading: false });
    };

    componentDidMount() {
        this.handleFormSubmit(this.state.query);

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
        };

        this.observer = new IntersectionObserver(
            this.handleIntersection,
            options
        );

        this.observer.observe(this.loadingRef);
    }

    handleIntersection = (entities, observer) => {
        const y = entities[0].boundingClientRect.y;

        if (this.state.prevY > y) {
            const page = this.state.page + 1;
            this.setState({ page });
            this.handleFormSubmit(this.state.query);
        }

        this.setState({ prevY: y });
    };

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <div className="scroll">
                        <img className="loader" src={ReactLogo} alt="spinner" />
                    </div>
                ) : null}
                <SearchBar handleFormSubmit={this.handleFormSubmit} />
                <ImageList images={this.state.images} />
                <div
                    ref={(loadingRef) => (this.loadingRef = loadingRef)}
                    className="load"
                ></div>
            </div>
        );
    }
}
