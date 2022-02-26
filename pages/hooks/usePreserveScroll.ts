import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export const usePreserveScroll = () => {
  const router = useRouter();

  const scrollPositions = useRef<{ [url: string]: number }>({});
  const isBack = useRef(false);

  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true;
      return true;
    });

    const onRouteChangeStart = () => {
      const url = router.pathname;
      scrollPositions.current[url] = window.scrollY;

      console.group('onRouteChangeStart');
      console.log('onRouteChangeStart : ', url, window.scrollY);
      console.log(scrollPositions.current);
      console.log(isBack.current);
      console.groupEnd();
    };

    const onRouteChangeComplete = (url: any) => {
      console.group('onRouteChangeComplete');
      console.log(isBack);
      if (isBack.current && scrollPositions.current[url]) {
        setTimeout(() => {
          window.scroll({
            top: scrollPositions.current[url],
            behavior: 'auto',
          });
        }, 0);
      }

      isBack.current = false;
      console.log('onRouteChangeComplete : ', url, window.scrollY);
      console.log(scrollPositions.current);
      console.log(isBack.current);
      console.groupEnd();
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);

  const changeIsBack = (flag: boolean) => {
    isBack.current = flag;
  };

  return { changeIsBack };
};
