import { Carousel } from 'react-bootstrap';
import styles from './Slide.module.scss';
import slides from '../../services/slides.json';
import clsx from 'clsx';

const Slide = () => {
    return (
        <Carousel>
            {slides.map((item, index) => (
                <Carousel.Item key={item.title} interval={1000} className={clsx(styles.SlideItem)}>
                    <img src={item.image} className='h-100 w-100 rounded-inherit object-fit-cover' alt={`slide ${index}`} />
                    {/* <Carousel.Caption>
                        <h3>{item.title}</h3>
                        <p>{item.subTitle}</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Slide;
