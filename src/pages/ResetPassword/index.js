const ResetPassword = () => {
    return (
        <div className="container bg-white rounded">
            <div className="d-flex align-items-center justify-content-center" style={{ height: "60rem" }}>
                <table className="table table-borderless w-50">
                    <thead>
                        <th colSpan={2} className="text-center fs-1 fw-bold">Reset password</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-end">New password</td>
                            <td>
                                <input type="password" className="form form-control form-control-lg" />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-end">Confirm password</td>
                            <td>
                                <input type="password" className="form form-control form-control-lg" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ResetPassword;
