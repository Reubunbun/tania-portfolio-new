import type { FC } from 'react';
import { memo, useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import CustomAnimatePresence from '../CustomAnimatePresence/CustomAnimatePresence';
import ImageModal from '../ImageModal/ImageModal';
import styles from './Carousel.module.css';

const c_transitionDuration: number = 1;
const c_transitionInterval: number = 5500 + (c_transitionDuration * 1000);
const c_imageAnimationOptions = {
  opacity: 1,
  transition: {
    duration: c_transitionDuration,
    type: 'tween',
  },
};

interface Props {
  images: string[];
  randomOrder: boolean;
};

const Carousel: FC<Props> = ({images, randomOrder}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const loadedImages = useRef<{[url: string]: boolean}>({[images[0]]: true});
  const imgTransitionAnimation = useAnimation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (modalOpen) {
        return;
      }

      if (randomOrder) {
        const allowedIndexes = images
          .map((_, i) => i)
          .filter(i => i !== imageIndex);

        setImageIndex(
          allowedIndexes[Math.floor(Math.random() * allowedIndexes.length)],
        );
        return;
      }

      setImageIndex(
        prev => prev === images.length - 1
          ? 0
          : prev + 1,
      );

    }, c_transitionInterval);

    return () => clearInterval(intervalId);
  }, [modalOpen]);

  return (
    <>
      <CustomAnimatePresence exitBeforeEnter>
        <motion.div
          className={styles.containerCarouselImg}
          onClick={() => setModalOpen(true)}
          key={imageIndex}
          initial={{
            opacity: 0,
          }}
          animate={
            loadedImages.current[images[imageIndex]]
              ? {
                  ...c_imageAnimationOptions,
                  transition: {
                    ...c_imageAnimationOptions.transition,
                    duration: modalOpen ? 0 : c_transitionDuration,
                  }
                }
              : imgTransitionAnimation
          }
          exit={{
            opacity: 0,
            transition: {
              duration: modalOpen ? 0 : c_transitionDuration,
            }
          }}
        >
          <img
            src={images[imageIndex]}
            alt={images[imageIndex]}
            onLoad={() => {
              imgTransitionAnimation.start(c_imageAnimationOptions);
              loadedImages.current[images[imageIndex]] = true;
            }}
          />
        </motion.div>
      </CustomAnimatePresence>
      <CustomAnimatePresence
        initial={false}
        exitBeforeEnter={true}
      >
        {modalOpen &&
          <ImageModal
            image={{
              id: imageIndex,
              url: images[imageIndex],
              title: '',
              description: '',
              tags: [],
              priority: 0,
              width: 0,
              height: 0,
            }}
            close={() => setModalOpen(false)}
            getNextImage={() => setImageIndex(
              prev => prev === images.length - 1
                ? 0
                : prev + 1,
            )}
            hideDescriptions={true}
          />
        }
      </CustomAnimatePresence>
    </>
  );
};

export default memo(Carousel);
