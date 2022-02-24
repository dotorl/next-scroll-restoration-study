import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
// import { useHistory, useRouteMatch } from 'react-router';

const useScrollMove = ({ page, path, dom }) => {
  // const history = useHistory();
  const router = useRouter();
  const [scrollInfos, setScrollInfos] = useState('0');
  // const match = useRouteMatch(path);
  const scrollSave = useCallback(() => {
    // const scrollPos = dom ? dom.scrollTop : window.scrollY;

    const scrollPos = window.scrollY + '';
    console.log('scrollPos', scrollPos);
    setScrollInfos(scrollPos);
    return localStorage.setItem(`${page}_scroll_pos`, scrollPos);
  }, [dom]);

  const scrollRemove = useCallback(() => {
    // setScrollInfos('0');
    localStorage.removeItem(`${page}_scroll_pos`);
  }, []);

  useEffect(() => {
    console.log(`baseballNews :: useEffect! `);
    console.log('router : ', router);

    // init
    setScrollInfos(() => localStorage.getItem(`${page}_scroll_pos`));

    // TODO. 1. 바뀐 path 알아내기
    // TODO. 2. path 바뀌기전에 ScrollY값 가져오기.씨발 Next 왜안되냐아아....
    // TODO. 3. LocalStorage 말고 Session Storage를 쓰는게 맞지 않을까?

    return () => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ :: useEffect remove!');
      console.log(window.scrollY);
      console.log('router.asPath : ', router.asPath);
      console.log(router);
      console.log('path', path);
      // if (router.asPath !== path) {
      //   console.log('################ SAVE ##############');
      scrollSave();
      // }
    };

    // return history.listen((location) => {
    //   console.log('history.listen : ', location);
    //   console.log('match.isExact : ', match.isExact);
    //   console.log('location.pathname : ', location.pathname);
    //   if (location.pathname !== path) {
    //     scrollSave();
    //   }
    // });
  }, [router, scrollSave]);

  return { scrollInfos, scrollRemove };
};

export default useScrollMove;
