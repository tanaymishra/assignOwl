'use client';

import { CheckIcon } from 'lucide-react';
import styles from './package.module.scss';

interface PackageProps {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
  isActive: boolean;
}

interface PackageCardProps {
  package: PackageProps;
  isSelected: boolean;
  onSelect: (packageId: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, isSelected, onSelect }) => {
  const handleSelect = () => {
    if (pkg.isActive) return; // Don't allow selecting current plan
    onSelect(pkg.id);
  };

  return (
    <div 
      className={`
        ${styles.card} 
        ${pkg.isPopular ? styles.popular : ''} 
        ${pkg.isActive ? styles.active : ''} 
        ${isSelected ? styles.selected : ''}
      `}
    >
      {pkg.isPopular && (
        <div className={styles.popularBadge}>
          <span>Most Popular</span>
        </div>
      )}
      
      {pkg.isActive && (
        <div className={styles.activeBadge}>
          <span>Current Plan</span>
        </div>
      )}

      <div className={styles.cardHeader}>
        <h3 className={styles.packageName}>{pkg.name}</h3>
        <p className={styles.packageDescription}>{pkg.description}</p>
        
        <div className={styles.priceContainer}>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>{pkg.price}</span>
            {pkg.period !== 'forever' && (
              <span className={styles.period}>/{pkg.period}</span>
            )}
          </div>
          {pkg.period === 'forever' && (
            <span className={styles.freeLabel}>Forever Free</span>
          )}
        </div>
      </div>

      <div className={styles.cardBody}>
        <ul className={styles.featuresList}>
          {pkg.features.map((feature, index) => (
            <li key={index} className={styles.feature}>
              <CheckIcon className={styles.checkIcon} size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cardFooter}>
        <button
          className={`
            ${styles.selectButton} 
            ${pkg.isActive ? styles.currentButton : ''} 
            ${pkg.isPopular ? styles.popularButton : ''}
          `}
          onClick={handleSelect}
          disabled={pkg.isActive}
        >
          {pkg.isActive ? 'Current Plan' : pkg.buttonText}
        </button>
        
        {!pkg.isActive && (
          <p className={styles.trialText}>
            {pkg.id === 'free' ? 'No credit card required' : '14-day free trial'}
          </p>
        )}
      </div>
    </div>
  );
};

export default PackageCard;