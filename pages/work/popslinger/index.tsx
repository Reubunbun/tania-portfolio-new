import type { Page } from '../../../interfaces/index';
import { useRouter } from 'next/router';
import { useState } from 'react';
import StaticContainer from '../../../components/Popslinger/StaticContainer/StaticContainer';
import ParallaxContainer from '../../../components/Popslinger/ParallaxContainer/ParallaxContainer';
import Summary from '../../../components/Popslinger/Summary/Summary';
import BackgroundDesign from '../../../components/Popslinger/BackgroundDesign/BackgroundDesign';
import Placeholder from '../../../components/Popslinger/Placeholder/Placeholder';
import styles from './Popslinger.module.css';

const Popslinger: Page = () => {
  const router = useRouter();
  const [logoLoaded, setLogoLoaded] = useState<boolean>(false);

  return (
    <>
      <button
        className={styles.goBackBtn}
        onClick={() => router.push('/work')}
      >
        Go Back
      </button>
      <ParallaxContainer imgSrc='/popslinger/main-title.jpg' imgAlt='fill this later'>
        <div
          className={styles.containerLogo}
        >
          {!logoLoaded &&
            <h1 className={styles.sectionTitle} style={{marginBottom: '4rem'}}>
              POPSLINGER
            </h1>
          }
          <img
            src='/popslinger/Popslinger_Logo_T3.png'
            alt='Logo for popslinger'
            onLoad={() => setLogoLoaded(true)}
            style={{display: logoLoaded ? undefined : 'none'}}
          />
        </div>
      </ParallaxContainer>
      <StaticContainer>
        <Summary />
      </StaticContainer>
      <ParallaxContainer imgSrc='/popslinger/backgrounds-title.jpg' imgAlt='fill this later'>
        <h1 className={styles.sectionTitle}>Background Design</h1>
      </ParallaxContainer>
      <StaticContainer>
        <BackgroundDesign />
      </StaticContainer>
      <ParallaxContainer imgSrc='/popslinger/concept-art/test.png' imgAlt='fill this later'>
        <h1 className={styles.sectionTitle}>Placeholder Text</h1>
      </ParallaxContainer>
      <StaticContainer>
        <Placeholder />
      </StaticContainer>
    </>
  );
};

Popslinger.title = 'Popslinger';
Popslinger.background = 'backgrounds/popslinger-bg.gif';
Popslinger.noNav = true;
Popslinger.removeBg = true;
Popslinger.removeMargin = true;
Popslinger.removePadding = true;

export default Popslinger;
