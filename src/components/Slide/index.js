import { Carousel } from 'react-bootstrap';
import styles from './Slide.module.scss';
import slides from '../../services/slides.json';
import clsx from 'clsx';


const Slide = () => {
    return (
        <Carousel>
            {slides.map(item => (
                <Carousel.Item key={item.title} interval={1000} className={clsx(styles.SlideItem)}>
                    <img src={item.image} className='h-100 w-100 rounded-inherit object-fit-cover' alt="slide 1" />
                    <Carousel.Caption>
                        <h3>{item.title}</h3>
                        <p>{item.subTitle}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
            {/* <Carousel.Item interval={500}>
                <img src="" alt="slide 2" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="" alt="slide 3" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item> */}
        </Carousel>
    );
}

export default Slide;
