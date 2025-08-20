import React, { useEffect } from 'react';
import '../css/shippingpolicy.css';

const Shippingpolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="shipping-container">
            <h1 className="shipping-title">Shipping Policy – Finike Lithium</h1>

            <div className="shipping-section">
                <h2 className="section-title">Shipping Locations</h2>
                <p className="section-content">
                   Finike Lithium operates and delivers across most major cities and towns throughout India.
                </p>
            </div>

            <div className="shipping-section">
                <h2 className="section-title">Shipping Charges</h2>
                <p className="section-content">
                   We offer free shipping on most products. However, in some cases, a minimal shipping charge may be applicable, depending on your location or the nature of the product. Any applicable charges will be clearly displayed at checkout—no hidden costs or additional fees. All prices listed on our website are inclusive of all taxes
                </p>
            </div>

            <div className="shipping-section">
                <h2 className="section-title">Delivery Time</h2>
                <p className="section-content">
                    We typically deliver products within 4–7 business days after your order is placed. In rare situations such as peak festive seasons, strikes, or extreme weather conditions, delivery may take slightly longer
                </p>
                <p className="section-content">
                    Our standard delivery timeline may extend to 4–7 business days during high-demand periods. We appreciate your patience and assure you that we're continuously working to speed up deliveries.
                </p>
            </div>

            <div className="shipping-section">
                <h2 className="section-title">Order Tracking</h2>
                <p className="section-content">
                   After successfully placing your order, you will receive a confirmation via SMS and email with your order details. Once the order is dispatched, you’ll receive a shipment update with tracking information.
                </p>
                <p className="section-content">
                    If you checked out as a guest, you can reach out to our Sales Support Team at 📞 +91 97780-44000 , +91 97787-44000 or ✉ customercare@spinoff.in,utsav.gupta@spinoff.in  with your order ID
                </p>
            </div>

            <div className="shipping-section">
                <h2 className="section-title">Shipping Method</h2>
                <p className="section-content">
                    We ship orders via trusted courier partners and our local dealer/distributor network, ensuring safe and prompt delivery. For large or heavy items like inverters and batteries, we often use our aligned partners to make the delivery process smoother and more secure.
                </p>
                <p className="section-content">
                   If your order is shipped through a courier, you will receive details such as the courier company name and the Airway Bill (AWB) number to help you track the package.
                </p>
                <p className="section-content">
                   If you receive a product in damaged condition, please do not accept the delivery. If you do accept it, make sure to note the issue in the POD (Proof of Delivery) form. For more assistance, please refer to our Returns & Refund Policy
                </p>
            </div>

            <div className="shipping-section">
                <h2 className="section-title">International Shipping</h2>
                <p className="section-content">
                   At this time, Finike Lithium does not offer international shipping. However, you can shop from anywhere in the world for delivery within India only. If you're looking to access our products outside India Please contact us at our Mail and Helpline address.
                </p>
            </div>
        </div>
    );
};

export default Shippingpolicy;