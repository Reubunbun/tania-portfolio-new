import type { FC } from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import styles from './ConceptArt.module.css';

interface Props {};

const c_delay = 0.5;

const ConcepArt: FC<Props> = () => {
  const textAnimation = useAnimation();
  const img1Animation = useAnimation();
  const img2Animation = useAnimation();
  const img3Animation = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      textAnimation.start({
        x: '10%',
        opacity: 1,
        transition: {
          duration: 1.5,
          delay: c_delay,
          type: 'tween',
        },
      });

      img1Animation.start({
        y: '0%',
        x: '25%',
        opacity: 1,
        transition: {
          duration: 1,
          delay: c_delay * 2,
          type: 'tween',
        },
      });
      img2Animation.start({
        y: '0%',
        x: '50%',
        opacity: 1,
        transition: {
          duration: 1,
          delay: c_delay * 3,
          type: 'tween',
        },
      });
      img3Animation.start({
        y: '0%',
        x: '25%',
        opacity: 1,
        transition: {
          duration: 1,
          delay: c_delay * 4,
          type: 'tween',
        },
      });
    }
  }, [inView]);

  return (
    <div
      className={styles.containerConceptArt}
      ref={ref}
    >
      <div className={styles.containerText}>
        <motion.p
          initial={{opacity: 0, x: '100%'}}
          animate={textAnimation}
        >
          Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text Concept art text
        </motion.p>
      </div>
      <div className={styles.containerImages}>
        <motion.img
          src='/2.png'
          initial={{
            opacity: 0,
            y: '100%',
            x: '0%',
          }}
          animate={img1Animation}
        />
        <motion.img
          src='/3.jpg'
          initial={{
            opacity: 0,
            y: '0%',
            x: '0%',
          }}
          animate={img2Animation}
        />
        <motion.img
          src='/4.jpg'
          initial={{
            opacity: 0,
            y: '-100%',
            x: '0%',
          }}
          animate={img3Animation}
        />
      </div>
    </div>
  );
};

export default ConcepArt;
