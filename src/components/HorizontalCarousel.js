import React, { Component } from 'react'

import Card from './Card.js';

class HorizontalCarousel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current_card: 1,
            current_img_width_as_percentage: 0
        }
    }

    componentWillMount() {
        const img_width_as_percentage = window.innerWidth < styles.media.min_width ? 100 : (styles.media.max_img_size / window.screen.availWidth) * 100;

        this.setState({ current_img_width_as_percentage: img_width_as_percentage });
    }

    componentDidMount() {
        this.view_port.style.width = `${this.state.current_img_width_as_percentage}vw`;
        const img_width_in_pixels = this.card_container.children[0].getBoundingClientRect().width;

        let first_card_clone = this.card_container.children[0].cloneNode(true);
        let last_card_clone = this.card_container.children[this.card_container.children.length - 1].cloneNode(true);

        this.card_container.insertBefore(last_card_clone, this.card_container.children[0]);
        this.card_container.append(first_card_clone);

        this.card_container.style.transitionDuration = "0.0s";
        this.card_container.style.transform = `translate(-${img_width_in_pixels}px)`;

        window.addEventListener('resize', () => {
            const img_width_as_percentage = window.innerWidth < styles.media.min_width ? 100 : (styles.media.max_img_size / window.screen.availWidth) * 100;

            for (let i = 0; i < this.card_container.children.length; i++) {
                this.card_container.children[i].style.width = `${img_width_as_percentage}vw`;
            }

            this.view_port.style.width = `${img_width_as_percentage}vw`;

            const img_width_in_pixels = this.card_container.children[0].getBoundingClientRect().width;
            
            this.card_container.style.transitionDuration = "0.0s";
            this.card_container.style.transform = `translate(-${this.state.current_card * img_width_in_pixels}px)`;
        });
    }

    handle_next = () => {
        if (this.state.current_card < this.card_container.children.length - 1) {
            let new_current_card = this.state.current_card + 1;
            const img_width_in_pixels = this.card_container.children[0].getBoundingClientRect().width;

            this.setState({ current_card: new_current_card }, () => {
                this.card_container.style.transitionDuration = "0.5s";
                this.card_container.style.transform = `translate(-${img_width_in_pixels * this.state.current_card}px)`;

                if (this.state.current_card === this.card_container.children.length - 1) {
                    setTimeout(() => {
                        this.card_container.style.transitionDuration = "0.0s";
                        this.card_container.style.transform = `translate(-${img_width_in_pixels}px)`;

                        this.setState({ current_card: 1 });
                    }, 502);
                }
            });
        } else {
            return;
        }
    }

    handle_previous = () => {
        if (this.state.current_card > 0) {
            let new_current_card = this.state.current_card - 1;
            const img_width_in_pixels = this.card_container.children[0].getBoundingClientRect().width;

            this.setState({ current_card: new_current_card }, () => {
                this.card_container.style.transitionDuration = "0.5s";
                this.card_container.style.transform = `translate(-${img_width_in_pixels * this.state.current_card}px)`;

                if (this.state.current_card === 0) {
                    setTimeout(() => {
                        this.card_container.style.transitionDuration = "0.0s";
                        this.card_container.style.transform = `translate(-${img_width_in_pixels * (this.card_container.children.length - 2)}px)`;

                        this.setState({ current_card: this.card_container.children.length - 2 });
                    }, 502);
                }
            });
        } else {
            return;
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handle_previous}>Previous</button>
                <button onClick={this.handle_next}>Next</button>
                <div ref={ref_id => this.view_port = ref_id} className="view-port" style={styles.view_port}>
                    <div ref={ref_id => this.card_container = ref_id} className="card-container" style={styles.card_container}>
                        <Card card_number="http://picsum.photos/800/300" resize_width={this.state.current_img_width_as_percentage} />
                        <Card card_number="http://picsum.photos/600/301" resize_width={this.state.current_img_width_as_percentage} />
                        <Card card_number="http://picsum.photos/700/300" resize_width={this.state.current_img_width_as_percentage} />
                        <Card card_number="http://picsum.photos/650/200" resize_width={this.state.current_img_width_as_percentage} />
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    view_port: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 'auto',
        overflow: 'hidden',
        zIndex: '-50',
        marginTop: '50px'
    },
    card_container: {
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content'
    },
    media: {
        max_img_size: 700,
        min_width: 768
    }
}

export default HorizontalCarousel;
