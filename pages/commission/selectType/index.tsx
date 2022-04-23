import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';
import { Page } from '../../../interfaces/index';
import { useCommissionContext } from '../../../context/CommissionContext';
import scrollToTop from '../../../helpers/smoothScroll';
import RadioButtons from '../../../components/RadioButtons/RadioButtons';
import CustomAnimatePresence from '../../../components/CustomAnimatePresence/CustomAnimatePresence';
import CommissionHeaderText from '../../../components/CommissionHeaderText/CommissionHeaderText';
import styles from './SelectType.module.css';
import { useEffect } from 'react';

const CommissionSelectType: Page = () => {
  const {
    spacesOpen,
    totalPrice,
    baseTypes,
    baseType: selectedBaseType,
    dispatchUserState,
  } = useCommissionContext();

  const exampleImgAnimation = useAnimation();
  const router = useRouter();

  useEffect(() => {
    if (spacesOpen === null) {
      router.push('/commission');
    }

    dispatchUserState({type: 'PAGE', payload: router.pathname});
  }, []);

  return (
    <>
      <CommissionHeaderText title='Select type' priceTotal={totalPrice}/>
      <div className={styles.containerSelectType}>
        <div className={styles.containerOptionsAndImage}>
          <div className={styles.containerOptions}>
            <RadioButtons
              groupName='baseTypes'
              options={
                baseTypes.map(commType => ({
                  display: `${commType.display} ($${commType.price})`,
                  value: commType.id,
                }))
              }
              selected={selectedBaseType?.id}
              onValueSelected={value => {
                const newBaseType = baseTypes.find(commType => commType.id === value);
                if (!newBaseType) {
                  return;
                }

                dispatchUserState({type: 'BASE', payload: newBaseType});
              }}
            />
          </div>
          <CustomAnimatePresence exitBeforeEnter>
            <motion.div
              key={selectedBaseType?.id}
              initial={{opacity: 0}}
              animate={exampleImgAnimation}
              exit={{opacity: 0}}
              className={styles.containerExample}
            >
              {selectedBaseType?.exampleImage &&
                <img
                  src={selectedBaseType.exampleImage}
                  alt={`Example image for ${selectedBaseType.display}`}
                  onLoad={() => {
                    exampleImgAnimation.start({
                      opacity: 1,
                      transition: {
                        duration: 0.8,
                        type: 'tween',
                      }
                    });
                  }}
                />
              }
            </motion.div>
          </CustomAnimatePresence>
        </div>
        <div className='commissionsContainerButton'>
          <button
            onClick={() => {
              scrollToTop().then(() => router.push('/commission'));
            }}
            className='commission-btn'
          >
            Back
          </button>
          <button
            onClick={() => {
              scrollToTop().then(() => router.push('/commission/selectBackground'));
            }}
            className='commission-btn'
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

CommissionSelectType.title = 'Select Commission Type';
CommissionSelectType.dontStick = true;

export default CommissionSelectType;
