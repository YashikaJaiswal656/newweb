import React, { useEffect } from 'react';
import '../css/privacypolicy.css';

const Privacypolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="privacy-container">
            <h1 className="privacy-title">Privacy Policy – Finike Lithium</h1>
            <p className="section-content">
                At Finike Lithium, accessible from www.finikelithium.com/, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit or make a purchase from our website.
            </p>

            <div className="privacy-section">
                <h2 className="section-title">1. Information We Collect</h2>
                <p className="section-content">
                   We collect both personal and non-personal information to improve your shopping experience:
                </p>
                <ul className="section-content">
                    <li><strong>Personal Information:</strong> : Name, email address, phone number, shipping address, and payment details.</li>
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, referring URLs, and cookies to optimize site performance.</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h2 className="section-title">2. How We Use Your Information</h2>
                <p className="section-content">
                   Your data helps us provide better service and a seamless online experience. We use the information to:
                </p>
                <ul className="section-content">
                    <li>Process orders and payments</li>
                    <li>Deliver products and manage shipping</li>
                    <li>Send order confirmations and updates</li>
                    <li>Improve our website, products, and services</li>
                    <li>Send promotional offers (only with your consent)</li>
                </ul>
            </div>

            <div className="privacy-section">
                <h2 className="section-title">3. Sharing Your Information</h2>
                <p className="section-content">
                    We do not sell or rent your personal information to third parties. However, we may share your data with:
                </p>
                <ul className="section-content">
                    <li>Trusted logistics and courier partners</li>
                    <li>Payment gateway providers</li>
                    <li>Government or legal authorities when required by law</li>
                </ul>
                <p className="section-content">
                    All third parties are required to maintain the confidentiality and security of your data.
                </p>
            </div>

            <div className="privacy-section">
                <h2 className="section-title">4. Cookies and Tracking Technologies</h2>
                <p className="section-content">
                    We use cookies and similar tracking technologies to:
                </p>
                <ul className="section-content">
                    <li>Remember your preferences</li>
                    <li>Analyze site traffic and user behavior</li>
                    <li>Customize content and advertising</li>
                </ul>
                <p className="section-content">
                    You can disable cookies in your browser settings, but this may affect certain site functionalities.
                </p>
            </div>

            <div className="privacy-section">
                <h2 className="section-title">5. Data Security</h2>
                <p className="section-content">
                    We take strong measures to protect your information using secure servers, encryption, and regular malware scanning.
                </p>
            </div>

            <div className="privacy-section">
                <h2 className="section-title">6. Your Rights</h2>
                <p className="section-content">
                    As a user, you have the right to:
                </p>
                <ul className="section-content">
                    <li>Access, update, or delete your personal data</li>
                    <li>Withdraw consent for marketing communications at any time</li>
                    <li>Request information about how your data is used</li>
                </ul>
                <p className="section-content">
                    To exercise your rights, contact us at{' '}
                    <a href="mailto:customercare@spinoff.in" className="contact-link">
                       ✉ customercare@spinoff.in,utsav.gupta@spinoff.in
                    </a>{' '}
                    or{' '}
                    <a href="tel:+919778044000" className="contact-link">
                        📞 +91 97780-44000,+91 97787-44000
                    </a>.
                </p>
            </div>

            <div className="privacy-section">
                <h2 className="section-title">7. Third-Party Links</h2>
                <p className="section-content">
                    Our website may contain links to third-party sites. We are not responsible for the privacy practices of those websites. Please review their policies separately.
                </p>
            </div>

            <div className="privacy-section">
                <h2 className="section-title">8. Changes to This Privacy Policy</h2>
                <p className="section-content">
                    We may update this policy periodically. Any changes will be posted on this page with the updated date. We recommend reviewing it occasionally to stay informed.
                </p>
            </div>

            <div className="privacy-section">
                <h2 className="section-title">9. Contact Us</h2>
                <p className="section-content">
                    If you have any questions about this Privacy Policy or the way your information is handled, please reach out to:
                </p>
                <ul className="section-content">
                    <li>
                        <a href="mailto:customercare@spinoff.in" className="contact-link">
                            ✉  utsav.gupta@spinoff.in , 
                            customercare@spinoff.in
                        </a>
                    </li>
                    <li>
                        <a href="tel:+919778044000" className="contact-link">
                            📞 +91 97780-44000 , +91 97787-44000
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

export default Privacypolicy;