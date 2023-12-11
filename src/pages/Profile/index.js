import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './Profile.module.scss';
import clsx from 'clsx';
import { useContextData } from '../../hooks';

const Profile = () => {

    const { user } = useContextData();

    useEffect(() => {
        document.title = `${!user.userInfor.name ? "Customer Profile" : user.userInfor.name} - TechShop`;
    }, [user]);

    const params = useParams();

    console.log(params);

    return (
        <div className={clsx(styles.profile)}>
            Profile
        </div>
    );
}

export default Profile;
