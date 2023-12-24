import { Link } from 'react-router-dom';
import './Page404.scss';

const Page404 = () => {
    return (
        <div>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
            <div className="page-404">
                <div className="outer">
                    <div className="middle">
                        <div className="inner">
                            <div className="inner-circle"><i className="fa fa-home"></i><span>404</span></div>
                            <span className="inner-status">Oops! You're lost</span>
                            <span className="inner-detail">
                                We can not find the page you're looking for.
                                <br />
                                <Link to="/" className="btn btn-success mtl" style={{ fontSize: "1.6rem" }}><i className="fa fa-home"></i>&nbsp;
                                    Return home
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page404;
