import { useRouter } from 'next/router';
import type { Page } from 'interfaces';
import { motion } from 'framer-motion';
import { useShopContext } from 'context/ShopContext';
import AnimatePresence from 'components/CustomAnimatePresence/CustomAnimatePresence';
import BasketItem from 'components/BasketItem/BasketItem';
import styles from './basket.module.css';
import sharedStyles from 'styles/shop-shared.module.css';

const Basket: Page = () => {
  const router = useRouter();
  const { basket } = useShopContext();

  if (!basket.products.length) {
    return (
      <p style={{
        width: '100%',
        marginTop: '1rem',
        textAlign: 'center',
        fontSize: '1.5em'
      }}>
        Theres&apos;s nothing in your basket, head to <span className='link' onClick={() => router.push('/secret-shop')}>products</span> to start shopping!
      </p>
    );
  }

  return (
    <>
      <p className={styles.productInfoText}>
        You have {basket.products.length} {basket.products.length === 1 ? 'product' : 'products'} in your basket:
      </p>
      <div className={styles.productsOuterContainer}>
        <div className={styles.productsInnerContainer}>
          <AnimatePresence>
            {basket.products.map((basketItem, i) =>
              <motion.div
                key={basketItem.productId}
                initial={false}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <BasketItem
                  {...basketItem}
                  isFirst={i === 0}
                  isLast={i === basket.products.length - 1}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={`${styles.checkoutContainer} ${sharedStyles.infoBg}`}>
          <p>Subtotal - {basket.totalPrice}$</p>
          <button
            className={sharedStyles.checkoutButton}
            onClick={() => router.push('/secret-shop/basket/checkout')}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

Basket.title = 'Basket';
Basket.description = 'Your Basket';

export default Basket;
