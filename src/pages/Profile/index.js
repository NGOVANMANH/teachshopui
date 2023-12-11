import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

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
        <div className={clsx(styles.profile, "d-block container bg-white mt-3 mb-3 rounded")}>
            <div className="row">
                <div className={clsx(styles.account_left, "col-md-3")}>
                    <div className={clsx(styles.account_left_title)}>
                        Đơn hàng đặt mua
                    </div>

                    <Button
                        className={clsx('d-block w-100', styles.account_button)}
                        variant='secondary'
                        size='lg'
                    >
                        Danh sách đặt hàng
                    </Button>
                    <div className={clsx(styles.account_left_title)}>
                        Thông tin tài khoản
                    </div>

                    <Button
                        className={clsx('d-block w-100', styles.account_button)}
                        variant='secondary'
                        size='lg'
                    >
                        Thông tin cá nhân
                    </Button>

                    <Button
                        className={clsx('d-block w-100', styles.account_button)}
                        variant='secondary'
                        size='lg'
                    >
                        Thay đổi mật khẩu
                    </Button>

                    <Button className={clsx(styles.account_button)} variant='danger' size='lg'>Log out</Button>

                </div>
                <div className={clsx(styles.account_right, "col")}>
                    Bạn đang ở trang tài khoản. Vui lòng chọn các mục bên trái để xem thông tin.
                </div>
            </div>
        </div>
    );
}

export default Profile;
