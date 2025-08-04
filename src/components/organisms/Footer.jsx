import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/products" },
        { name: "Electronics", href: "/products/electronics" },
        { name: "Clothing", href: "/products/clothing" },
        { name: "Home & Garden", href: "/products/home-garden" },
        { name: "Sports", href: "/products/sports" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "Shipping Info", href: "#" },
        { name: "Returns", href: "#" },
        { name: "Size Guide", href: "#" },
        { name: "Track Order", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Affiliate Program", href: "#" },
      ],
    },
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <ApperIcon name="ShoppingBag" className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                Gigamart
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Your one-stop destination for quality products at unbeatable prices. 
              Shop with confidence and enjoy fast, secure delivery.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {["Facebook", "Twitter", "Instagram", "Youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                >
                  <ApperIcon name={social} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400">Secure payments:</span>
              <div className="flex items-center space-x-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center"
                    title={method.name}
                  >
                    <ApperIcon name={method.icon} className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <ApperIcon name="Shield" className="h-4 w-4 text-emerald-400" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <ApperIcon name="Truck" className="h-4 w-4 text-amber-400" />
                <span>Free Shipping</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-slate-400">
              © 2024 Gigamart. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;