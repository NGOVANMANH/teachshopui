import clsx from 'clsx';
import styles from './HorizontalLine.module.scss';

const HorizontalLine = ({ className }) => {
    return (<div className={clsx(styles.HorizontalLine, className)}></div>);
}

export default HorizontalLine;
