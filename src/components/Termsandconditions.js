import React, { useEffect } from 'react';
import '../css/termsandconditions.css';

const Termsandconditions = () => {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return (
        <div className="terms-container">
            <h1 className="terms-title">Terms and Conditions – Finike Lithium</h1>
            <p className="section-content">
               Welcome to www.finikelithium.com, By accessing or using this website, you agree to be bound by the following Terms and Conditions. Please read them carefully. If you do not agree, please do not use our website or services.
            </p>

            <div className="terms-section">
                <h2 className="section-title">1. General</h2>
                <p className="section-content">
                    This website is owned and operated by Finike Lithium.
                </p>
                <p className="section-content">
                    By using our site or purchasing from us, you agree to these Terms and our Privacy Policy.
                </p>
                <p className="section-content">
                    We may update these Terms at any time. Continued use of the site after changes means you accept the revised Terms.
                </p>
            </div>

            <div className="terms-section">
                <h2 className="section-title">2. Product Information</h2>
                <p className="section-content">
                    We strive to display accurate product information, prices, and specifications.
                </p>
                <p className="section-content">
                    Finike Lithium reserves the right to change product details, pricing, and availability at any time without prior notice.
                </p>
                <p className="section-content">
                   Product images are for representation purposes and may slightly vary from the actual product.
                </p>
            </div>

            <div className="terms-section">
                <h2 className="section-title">3. Orders and Payments</h2>
                <p className="section-content">
                   Placing an order means you are offering to purchase the product(s) under these Terms.
                </p>
                <p className="section-content">
                    We reserve the right to cancel or refuse any order for any reason, including but not limited to stock unavailability, errors in pricing, or suspected fraud.
                </p>
                <p className="section-content">
                    All payments must be made through our approved payment gateways. We do not store your payment details.
                </p>
            </div>

            <div className="terms-section">
                <h2 className="section-title">4. Shipping & Delivery</h2>
                <p className="section-content">
                   We ship across most locations in India. Shipping times may vary depending on your location. The dispatch is usually done within 48 Hours, The Shipped Item usually reaches to all major cities within 4-7 Days, and 7-10 Days for remote Area
                </p>
                <p className="section-content">
                   Delivery timelines mentioned are estimated
                </p>
                <p className="section-content">
                  Please refer to our Shipping Policy for more information.
                </p>
            </div>

            <div className="terms-section">
                <h2 className="section-title">5. Returns & Cancellations</h2>
                <p className="section-content">
                   Returns, replacements, or cancellations are subject to our Returns & Refund Policy
                </p>
                <p className="section-content">
                   We only accept returns for products that are damaged, defective, or incorrect at the time of delivery.
                </p>
            </div>

            <div className="terms-section">
                <h2 className="section-title">6. Limitation of Liability</h2>
                <p className="section-content">
                    Finike Lithium is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website, products, or services.
                </p>
            </div>

            <div className="terms-section">
                <h2 className="section-title">7. Intellectual Property</h2>
                <p className="section-content">
                  All content on this site—logos, images, text, videos, and graphics—are the property of Finike Lithium and protected by Indian copyright and trademark laws.
                </p>
                <p className="section-content">
                  Unauthorized use or reproduction is strictly prohibited.
                </p>
            </div>

            <div className="terms-section">
                <h2 className="section-title">8. User Responsibilities</h2>
                <p className="section-content">
                  You agree not to misuse the website or submit false information during registration or checkout.
                </p>
                <p className="section-content">
                    You must not use this site for any illegal or unauthorized purpose.
                </p>
            </div>

            <div className="terms-section">
                <h2 className="section-title">9. Governing Law</h2>
                <p className="section-content">
                   These Terms shall be governed by and interpreted under the laws of India.
                </p>
                <p className="section-content">
                   Any disputes arising out of these Terms shall be subject to the jurisdiction of the courts in Punjab, India.
                </p>
            </div>

            <div className="terms-section">
                <h2 className="section-title">10. Contact Information</h2>
                <p className="section-content">
                   For any questions or concerns regarding these Terms, please contact us at:
                </p>
                <ul className="section-content">
                    <li>
                        <a href="mailto:customercare@spinoff.in" className="contact-link">
                             ✉ customercare@spinoff.in,utsav.gupta@spinoff.in
                        </a>
                    </li>
                    <li>
                        <a href="tel:+919778044000" className="contact-link">
                            📞 +91 97780-44000,+91 97787-44000
                        </a>
                    </li>
                    <li>
                        <a href="www.finikelithium.com" className="contact-link">
                            🌐 www.finikelithium.com
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Termsandconditions;