import type { Page } from '../../../interfaces';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';
import { useCommissionContext } from '../../../context/CommissionContext';
import CommissionHeaderText from '../../../components/CommissionHeaderText/CommissionHeaderText';
import RadioButtons from '../../../components/RadioButtons/RadioButtons';
import CustomAnimatePresence from '../../../components/CustomAnimatePresence/CustomAnimatePresence';
import scrollToTop from '../../../helpers/smoothScroll';
import selectStyles from '../selectType/SelectType.module.css';
import styles from './SelectBackground.module.css';

const CommissionSelectBackgound: Page = () => {
  const {
    spacesOpen,
    totalPrice,
    backgroundTypes,
    backgroundType: selectedBackgroundType,
    backgroundDescription,
    dispatchUserState,
  } = useCommissionContext();

  const descriptionInput = useRef<HTMLTextAreaElement>(null);
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
      <CommissionHeaderText title='Select Background' priceTotal={totalPrice} />
      <div className={styles.containerSelectBackground}>
        <div className={selectStyles.containerOptionsAndImage}>
          <div className={selectStyles.containerOptions}>
            <RadioButtons
              groupName='backgroundTypes'
              options={
                backgroundTypes.map(backgroundType => ({
                  display: `${backgroundType.display} ($${backgroundType.price})`,
                  value: backgroundType.id,
                }))
              }
              selected={selectedBackgroundType?.id}
              onValueSelected={value => {
                const newBackgroundType = backgroundTypes.find(bgType => bgType.id === value);
                if (!newBackgroundType) {
                  return;
                }

                dispatchUserState({type: 'BACKGROUND-TYPE', payload: newBackgroundType});
              }}
            />
          </div>
          <CustomAnimatePresence exitBeforeEnter>
            <motion.div
              className={selectStyles.containerExample}
              key={selectedBackgroundType?.id}
              initial={{opacity: 0}}
              animate={exampleImgAnimation}
              exit={{opacity: 0}}
            >
              {selectedBackgroundType?.exampleImage &&
                <img
                  src={selectedBackgroundType.exampleImage}
                  alt={`Example background for ${selectedBackgroundType.display}`}
                  onLoad={() => {
                    exampleImgAnimation.start({
                      opacity: 1,
                      transition: {
                        duration: 0.8,
                        type: 'tween',
                      },
                    });
                  }}
                />
              }
            </motion.div>
          </CustomAnimatePresence>
        </div>
        <div className={styles.containerDescription}>
          <div className={styles.containerText}>
            <CustomAnimatePresence exitBeforeEnter>
              <motion.label
                htmlFor='background-description'
                key={selectedBackgroundType?.id === -1 ? 'Colour-Label' : 'Desc-Label'}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
              >
                {selectedBackgroundType?.id === -1
                  ? 'Please Type The Color You Would Like:'
                  : 'Describe Background:'
                }
              </motion.label>
            </CustomAnimatePresence>
            <textarea
              ref={descriptionInput}
              name='background-description'
              value={backgroundDescription}
              placeholder={
                selectedBackgroundType?.id !== -1
                  ? 'Feel free to link some references here!'
                  : ''
              }
              style={{
                minHeight: selectedBackgroundType?.id !== -1
                  ? '8rem'
                  : '2.5rem',
                height: selectedBackgroundType?.id !== -1
                  ? '8rem'
                  : '2.5rem'
              }}
              onChange={e => dispatchUserState({
                type: 'BACKGROUND-DESC',
                payload: e.target.value,
              })}
            />
          </div>
        </div>
        <div className='commissionsContainerButton'>
          <button
            onClick={() => {
              scrollToTop().then(() => router.push('/commission/selectType'));
            }}
            className='commission-btn'
          >
            Back
          </button>
          <button
            onClick={() => {
              if (!descriptionInput.current) return;

              descriptionInput.current.classList.remove('warning');
              void descriptionInput.current.offsetWidth;

              if (!backgroundDescription) {
                descriptionInput.current.placeholder = 'You must enter something here';
                descriptionInput.current.classList.add('warning');
                return;
              }

              scrollToTop().then(() => router.push('/commission/describeCharacters'));
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

CommissionSelectBackgound.title = 'Select Commission Background';
CommissionSelectBackgound.dontStick = true;

export default CommissionSelectBackgound;
