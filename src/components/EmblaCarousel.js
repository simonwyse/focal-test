import React, { useState, useCallback, useEffect } from 'react'
import EmblaCarouselReact from 'embla-carousel-react'
import PreviewCompatibleImage from './PreviewCompatibleImage';
import ArrowRightIcon from '../img/icons/icon-angle-right.inline.svg'
import ArrowLeftIcon from '../img/icons/icon-angle-left.inline.svg'


const Carousel = ({carousel}) => {
    const [embla, setEmbla] = useState(null);
    const [slide, setSlide] = useState(0);
    const options = {
        align: 'center',
        containerSelector: '*',
        slidesToScroll: 1,
        containScroll: false,
        draggable: true,
        dragFree: false,
        loop: true,
        speed: 10,
        startIndex: 0,
        selectedClass: 'is-selected',
        draggableClass: 'is-draggable',
        draggingClass: 'is-dragging'
    };

    useEffect(() => {
        if (embla) {
            embla.on('select', () => setSlide(embla.selectedScrollSnap()));
        }
    }, [embla]);

    const renderCounter = useCallback(() => {
        if (embla) {
            return (
                <div className="embla__counter">{slide + 1} / {carousel.length}</div>
            )
        }
    }, [embla, slide, carousel])

    return (
        <section className="has-bg-bright-blue-004">
            <div className="embla">
                <EmblaCarouselReact
                    htmlTagName="div"
                    emblaRef={setEmbla}
                    options={options}
                >
                    <div className="embla__container">
                        {carousel.map((item, i) => (
                            <div className="embla__slide" key={i}>
                                <PreviewCompatibleImage
                                    imageInfo={{
                                        image: item.image,
                                        alt: item.caption
                                    }}
                                />
                                <div className="embla__caption has-bg-dark-turquoise">{item.caption}</div>
                            </div>
                        ))}
                    </div>
                </EmblaCarouselReact>

                {renderCounter()}

                <button onClick={() => embla.scrollPrev()} className="btn btn--clear embla__button embla__button-prev"><span className="sr-only">Prev</span><ArrowLeftIcon className="icon icon-carousel-arrow-left is-dark-blue" /></button>
                <button onClick={() => embla.scrollNext()} className="btn btn--clear embla__button embla__button-next"><span className="sr-only">Next</span><ArrowRightIcon className="icon icon-carousel-arrow-right is-dark-blue" /></button>
            </div>
        </section>
    )
}

export default Carousel