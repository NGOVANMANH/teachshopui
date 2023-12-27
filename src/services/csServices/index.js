export const endpoints = {
    cart: {
        getCart: '/api/cart/read',
        addCart: '/api/cart/add',
        updateQuantity: '/api/cart/update_quantity',
        deleteProduct: '/api/cart/delete',
        deleteCart: '/api/cart/deleteAll'
    },
    comment: {
        getComments: '/api/review/read',
        addComment: '/api/review/add'
    },
    discount: {
        getDiscount: '/api/discount/validate'
    },
    order: {
        getOrders: '/api/orders/read',
        addOrder: '/api/orders/order'
    },
    product: {
        getAllProduct: '/api/product/read',
        getProductByCategory: '/api/product/show_by_category_brand',
        getProductById: '',
        getSearchedProduct: '/api/product/search',
        getProductParameters: '/api/product/get_param',
        getProductColors: '/api/product/show_color',
        getColorsAndImages: '/api/imageDetail/show_by_productid_ver2'
    },
    shipping: {
        getShippingFee: '/api/orders/shipping_fee',
    },
    user: {
        login: '/api/customer/login',
        signup: '/api/customer/signup',
        checkToken: '/api/customer/read',
        updateInfor: '/api/customer/update',
        updatePassword: '/api/customer/update',
        checkEmail: '/api/customer/validate_email/send_validate_email',
        checkKeyEmail: '/api/customer/validate_email/check_validate_email',
        resetPassword: '/api/customer/reset_password/send_password_reset'
    }
}