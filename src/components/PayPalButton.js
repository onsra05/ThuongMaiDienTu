// import React, { useEffect } from 'react';

// const PayPalButton = ({ amount, onSuccess, onError }) => {
//   useEffect(() => {
//     if (window.paypal) {
//       window.paypal.Buttons({
//         createOrder(data, actions) {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   value: amount, // Số tiền cần thanh toán
//                 },
//               },
//             ],
//           });
//         },
//         onApprove(data, actions) {
//           return actions.order.capture().then((details) => {
//             // Thực hiện hành động sau khi thanh toán thành công
//             onSuccess(details);
//           });
//         },
//         onError(error) {
//           // Xử lý khi có lỗi xảy ra trong quá trình thanh toán
//           onError(error);
//         },
//       }).render("#paypal-button-container");
//     }
//   }, [amount, onSuccess, onError]);

//   return <div id="paypal-button-container"></div>;
// };

// export default PayPalButton;
