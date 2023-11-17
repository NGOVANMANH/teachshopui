import styles from './PopperWrapper.module.scss';
import clsx from 'clsx';

const PopperWrapper = ({ children }) => {
    return (
        <div className={clsx(styles.PopperWrapper)}>
            {children}
        </div>
    );
}

export default PopperWrapper;
