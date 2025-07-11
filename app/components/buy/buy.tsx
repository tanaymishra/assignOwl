'use client';

import { useState } from 'react';
import styles from './buy.module.scss';
import PackageCard from './sections/package';

interface BuyComponentProps {
  isOpen: number;
  onClose?: () => void;
}

const BuyComponent: React.FC<BuyComponentProps> = ({ isOpen, onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 assignments per month',
        'Basic templates',
        'Email support',
        'Standard quality outputs',
        'Basic customization'
      ],
      buttonText: 'Get Started',
      isPopular: false,
      isActive: true
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      period: 'month',
      description: 'Great for regular users',
      features: [
        '50 assignments per month',
        'Premium templates',
        'Priority email support',
        'High quality outputs',
        'Advanced customization',
        'Export to multiple formats',
        'Plagiarism checker'
      ],
      buttonText: 'Upgrade to Basic',
      isPopular: false,
      isActive: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      period: 'month',
      description: 'Best for power users',
      features: [
        'Unlimited assignments',
        'All premium templates',
        '24/7 priority support',
        'Highest quality outputs',
        'Full customization suite',
        'Export to all formats',
        'Advanced plagiarism checker',
        'AI writing assistant',
        'Team collaboration',
        'API access'
      ],
      buttonText: 'Upgrade to Pro',
      isPopular: true,
      isActive: false
    }
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    // Handle package selection logic here
    console.log('Selected package:', packageId);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Choose Your Plan</h1>
            <p className={styles.subtitle}>
              Select the perfect plan for your academic needs. Upgrade or downgrade at any time.
            </p>
          </div>
          {onClose && (
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        <div className={styles.packagesGrid}>
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              isSelected={selectedPackage === pkg.id}
              onSelect={handlePackageSelect}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
          <div className={styles.securityBadges}>
            <span className={styles.badge}>🔒 SSL Secured</span>
            <span className={styles.badge}>💳 Secure Payment</span>
            <span className={styles.badge}>✨ Cancel Anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyComponent;