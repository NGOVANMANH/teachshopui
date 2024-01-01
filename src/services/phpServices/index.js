export const endpoints = {
    cart: {
        getCart: '/api/cart/read.php',
        addCart: '/api/cart/add.php',
        updateQuantity: '/api/cart/update_quantity.php',
        deleteProduct: '/api/cart/delete.php',
        deleteCart: '/api/cart/deleteAll.php'
    },
    comment: {
        getComments: '/api/review/read.php',
        addComment: '/api/review/add.php'
    },
    discount: {
        getDiscount: '/api/discount/validate.php'
    },
    order: {
        getOrders: '/api/order/read.php',
        addOrder: '/api/order/order.php',
        cancelOrder: '/api/order/cancel.php',
        getOrdersGuest: '/api/order/read_guest.php',
        addOrderGuest: '/api/order/order_guest.php',
        cancelOrderGuest: '/api/order/cancel_guest.php',
    },
    product: {
        getAllProduct: '/api/product/read.php',
        getProductByCategory: '/api/product/show_by_category_brand.php',
        getProductById: '',
        getSearchedProduct: '/api/product/search.php',
        getProductParameters: '/api/product/get_param.php',
        getProductColors: '/api/product/show_color.php',
        getColorsAndImages: '/api/imageDetail/show_by_productid_ver2.php'
    },
    shipping: {
        getShippingFee: '/api/order/shipping_fee.php',
    },
    user: {
        login: '/api/customer/login.php',
        signup: '/api/customer/signup.php',
        checkToken: '/api/customer/read.php',
        updateInfor: '/api/customer/update.php',
        updatePassword: '/api/customer/update.php',
        checkEmail: '/api/customer/validate_email/send_validate_email.php',
        checkKeyEmail: '/api/customer/validate_email/check_validate_email.php',
        resetPassword: '/api/customer/reset_password/send_password_reset.php',
        resetPasswordToken: '/api/customer/reset_password/reset_password.php',
    }
}