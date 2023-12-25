import { Carousel, Image } from 'react-bootstrap';
import styles from './Slide.module.scss';
import slides from '../../services/slides.json';
import clsx from 'clsx';

const Slide = () => {
    return (
        <Carousel>
            {slides.map((item, index) => (
                <Carousel.Item key={index} interval={1500} className={clsx(styles.SlideItem)}>
                    <Image src={item.image} className='h-100 w-100 rounded-inherit object-fit-cover' alt={`slide ${index}`} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Slide;
