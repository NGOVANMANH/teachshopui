import { useEffect, useState } from "react";
import { getProductParameters } from "../../services/productServices";
import { NOT_FOUND, SUCCESS_RESPONSE } from "../../services/constants";
import { Spinner } from "react-bootstrap";
import clsx from "clsx";

const ProductParameterTable = ({ productID, striped, borderless }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [params, setParams] = useState({});

    useEffect(() => {
        if (productID) {
            const fetchApi = async () => {
                setIsLoading(true);
                const response = await getProductParameters(productID);
                if (response !== NOT_FOUND) {
                    if (response.status === SUCCESS_RESPONSE) {
                        const _params = response.data[0];
                        delete _params.product_id;
                        setParams(_params);
                        setIsSuccess(true);
                    }
                    setIsLoading(false);
                }
                else setIsSuccess(false);
            }

            fetchApi();
        }
        else setIsSuccess(false);
    }, [productID])

    return (
        isSuccess
            ?
            !isLoading
                ?
                <table className={clsx("table", {
                    "table-striped": striped,
                    "table-borderless": borderless,
                })}>
                    <tbody>
                        {
                            Object.keys(params).map((key, index) =>
                                <tr key={index}>
                                    <th className="text-capitalize w-50">{key.replace(/_/g, ' ')}</th>
                                    <td>{params[key]}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                :
                <Spinner size="lg" />
            :
            <div className="text-danger fs-1">NOT_FOUND</div>
    );
}

export default ProductParameterTable;
